const express = require('express');
const { calculateLoan } = require('../controllers/calculatorController');
const router = express.Router();

router.post('/calculate', (req, res) => {
    const { loanAmount, interestRate, term } = req.body;

    const monthlyRate = interestRate / 12 / 100;
    const totalRate = Math.pow(1 + monthlyRate, term * 12);
    const monthlyPayment = (loanAmount * monthlyRate * totalRate) / (totalRate - 1);
    const totalPayment = monthlyPayment * term * 12;
    const requiredIncome = monthlyPayment * 2.5;

    res.json({
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        requiredIncome: requiredIncome.toFixed(2)
    });
});
module.exports = router;
