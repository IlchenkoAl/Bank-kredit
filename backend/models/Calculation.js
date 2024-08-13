const mongoose = require('mongoose');


const calculationSchema = new mongoose.Schema({
    type: { type: String, required: true }, // Тип кредита (например, "ипотека", "автокредит")
    cost: { type: Number, required: true }, // Стоимость объекта (например, стоимость квартиры или автомобиля)
    initialPayment: { type: Number, required: true }, // Первоначальный взнос
    term: { type: Number, required: true }, // Срок кредита в годах
    interestRate: { type: Number, required: true }, // Процентная ставка
    loanAmount: { type: Number, required: true }, // Сумма кредита (стоимость - первоначальный взнос)
    monthlyPayment: { type: Number, required: true }, // Ежемесячный платеж
    totalPayment: { type: Number, required: true }, // Общая сумма выплат
    requiredIncome: { type: Number, required: true }, // Необходимый доход для получения кредита
    createdAt: { type: Date, default: Date.now }, // Дата создания записи
});

const Calculation = mongoose.model('Calculation', calculationSchema);

module.exports = Calculation;


module.exports = mongoose.model('Calculation', calculationSchema);
