const nodemailer = require('nodemailer');

exports.sendCalculationEmail = async (req, res) => {
    const { email, calculation } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Ваш расчет по кредиту',
        text: `Ваш расчет по кредиту: Ежемесячный платеж - ${calculation.monthlyPayment}, Общая сумма - ${calculation.totalPayment}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error });
    }
};
const Calculation = require('../models/Calculation');
const { Parser } = require('json2csv');

exports.exportCalculations = async (req, res) => {
    try {
        const calculations = await Calculation.find();
        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(calculations);

        res.header('Content-Type', 'text/csv');
        res.attachment('calculations.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ message: 'Error exporting calculations', error });
    }
};
