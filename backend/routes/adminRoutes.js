const express = require('express');
const { Parser } = require('json2csv');
const Calculation = require('../models/Calculation');
const router = express.Router();

router.get('/calculators', async (req, res) => {
    try {
        const calculations = await Calculation.find();
        res.status(200).json({
            message: 'Calculations retrieved successfully',
            data: calculations
        });
        console.log(calculations)
    } catch (error) {
        console.error('Error while retrieving calculations:', error);
        res.status(500).send('Ошибка при получении расчетов');
    }
});
router.get('/export', async (req, res) => {
    try {
        const calculations = await Calculation.find();

        const fields = [
            'type',
            'cost',
            'initialPayment',
            'term',
            'interestRate',
            'monthlyPayment',
            'totalPayment',
            'requiredIncome'
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(calculations);

        res.header('Content-Type', 'text/csv');
        res.attachment('calculations.csv');
        return res.send(csv);
    } catch (error) {
        console.error('Error while exporting calculations:', error);
        res.status(500).send('Ошибка при экспорте данных');
    }
});
router.post('/create', async (req, res) => {
    const { type, cost, initialPayment, term, interestRate, monthlyPayment, totalPayment, requiredIncome } = req.body;

    if (!type || !cost || !initialPayment || !term || !interestRate) {
        return res.status(400).json({ error: 'Все поля обязательны' });
    }

    try {
        const calculation = new Calculation({
            type,
            cost,
            initialPayment,
            term,
            interestRate,
            monthlyPayment: Math.round(monthlyPayment),
            totalPayment: Math.round(totalPayment),
            requiredIncome: Math.round(requiredIncome),
        });

        await calculation.save();

        res.status(201).json({
            message: 'Calculation created successfully',
            data: calculation
        });
    } catch (error) {
        console.error('Error while creating calculation:', error);
        res.status(500).send('Ошибка при создании записи');
    }
});

// Маршрут для редактирования существующей записи
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const calculation = await Calculation.findByIdAndUpdate(id, updates, { new: true });

        if (!calculation) {
            return res.status(404).send('Запись не найдена');
        }

        res.status(200).json({
            message: 'Calculation updated successfully',
            data: calculation
        });
    } catch (error) {
        console.error('Error while updating calculation:', error);
        res.status(500).send('Ошибка при обновлении записи');
    }
});

// Маршрут для удаления записи
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const calculation = await Calculation.findByIdAndDelete(id);

        if (!calculation) {
            return res.status(404).send('Запись не найдена');
        }

        res.status(200).json({
            message: 'Calculation deleted successfully'
        });
    } catch (error) {
        console.error('Error while deleting calculation:', error);
        res.status(500).send('Ошибка при удалении записи');
    }
});

module.exports = router;
