const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const users = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const calculate = require('./routes/calculatorRoutes');
const {join} = require("path");
require('dotenv').config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/users', users);
app.use('/calculate', calculate);
app.use('/admin', adminRoutes);


// Обработка корневого маршрута
app.get('/', (req, res) => {
    res.send('Добро пожаловать в калькулятор!');
});
app.get('/favicon.ico', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'favicon.ico'));
});
const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB connected');


        app.listen(port, () => {
            console.log(`Сервер запущен на порту ${port}!`);
        });
    } catch (error) {
        console.error('Ошибка при инициализации:', error);
        process.exit(1); // Завершить процесс с кодом ошибки
    }
};
run().then();

module.exports = app;
