const express = require('express');
const Calculation = require('./../models/Calculation');
const {createTransport} = require("nodemailer");
const router = express.Router();



router.post('/', async (req, res) => {
    const { type, cost, initialPayment, term, interestRate } = req.body;


    // Проверка наличия обязательных полей
    if (!type || !cost || !initialPayment || !term || !interestRate) {
        return res.status(400).json({ error: 'Все поля обязательны' });
    }

    // Рассчитываем сумму кредита
    const loanAmount = cost - initialPayment;

    // Проверка на корректность суммы кредита
    if (isNaN(loanAmount) || loanAmount <= 0) {
        return res.status(400).json({ error: 'Некорректная сумма кредита' });
    }

    // Рассчитываем ежемесячную процентную ставку
    const monthlyRate = interestRate / 12 / 100;

    // Рассчитываем общую ставку
    const totalRate = Math.pow(1 + monthlyRate, term * 12);

    // Рассчитываем ежемесячный платеж
    const monthlyPayment = (loanAmount * monthlyRate * totalRate) / (totalRate - 1);

    // Проверка на корректность ежемесячного платежа
    if (isNaN(monthlyPayment) || monthlyPayment <= 0) {
        return res.status(400).json({ error: 'Некорректный ежемесячный платеж' });
    }

    // Рассчитываем общую сумму выплат
    const totalPayment = monthlyPayment * term * 12;

    // Рассчитываем необходимый доход для получения кредита
    const requiredIncome = monthlyPayment * 2.5;

    try {
        // Округляем все значения перед сохранением
        const calculationResult = new Calculation({
            type,
            cost,
            initialPayment,
            term,
            interestRate,
            loanAmount: Math.round(loanAmount),
            monthlyPayment: Math.round(monthlyPayment),
            totalPayment: Math.round(totalPayment),
            requiredIncome: Math.round(requiredIncome),
        });

        await calculationResult.save();

        res.status(201).json({
            message: 'Calculation saved successfully',
            data: {
                monthlyPayment: Math.round(monthlyPayment),
                totalPayment: Math.round(totalPayment),
                requiredIncome: Math.round(requiredIncome)
            }
        });
    } catch (error) {
        console.error('Error while saving the calculation:', error);
        res.status(500).send('Ошибка при сохранении результата расчета');
    }
});

router.post('/send', async (req, res) => {
    console.log('send')
    const { email, monthlyPayment, totalPayment, requiredIncome } = req.body;

    // Настройка транспорта для отправки почты
    let transporter = createTransport({
        service: 'gmail', // Например, используем Gmail, можно выбрать другой SMTP-сервис
        auth: {
            user: process.env.EMAIL_USER, // Ваша почта
            pass: process.env.EMAIL_PASS  // Ваш пароль или App Password
        }
    });

    // Определение содержимого письма
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Результаты расчета кредита',
        text: `
            Спасибо за использование нашего калькулятора.

            Ежемесячный платеж: ${monthlyPayment} ₽
            Общая сумма выплат: ${totalPayment} ₽
            Необходимый доход: ${requiredIncome} ₽
        `
    };

    try {
        // Отправка письма
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});
module.exports = router;
