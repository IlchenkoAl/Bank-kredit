const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
    type: { type: String, required: true },
    cost: { type: Number, required: true },
    initialPayment: { type: Number, required: true },
    term: { type: Number, required: true },
    monthlyPayment: { type: Number, required: true },
    totalPayment: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Calculation', calculationSchema);
