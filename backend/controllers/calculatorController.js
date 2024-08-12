const Calculation = require('../models/Calculation');

const calculateMortgage = (cost, initialPayment, term, rate) => {
    const loanAmount = cost - initialPayment;
    const monthlyRate = rate / 12 / 100;
    const totalRate = Math.pow(1 + monthlyRate, term * 12);
    const monthlyPayment = (loanAmount * monthlyRate * totalRate) / (totalRate - 1);
    return {
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(monthlyPayment * term * 12),
    };
};

exports.calculateLoan = async (req, res) => {
    const { type, cost, initialPayment, term } = req.body;

    let rate;
    switch (type) {
        case 'mortgage':
            rate = 9.6;
            break;
        case 'auto':
            rate = 3.5;
            break;
        case 'consumer':
            rate = 14.5;
            break;
        default:
            return res.status(400).json({ message: 'Invalid loan type' });
    }

    const { monthlyPayment, totalPayment } = calculateMortgage(cost, initialPayment, term, rate);

    const calculation = new Calculation({
        type,
        cost,
        initialPayment,
        term,
        monthlyPayment,
        totalPayment,
    });

    await calculation.save();

    res.status(201).json(calculation);
};
