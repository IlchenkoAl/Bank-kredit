const express = require('express');
const { sendCalculationEmail, exportCalculations} = require('../controllers/adminController');
const {protect} = require("../middleware/auth");
const router = express.Router();

// router.post('/send-email', sendCalculationEmail);
// router.get('/export', protect,  exportCalculations);

module.exports = router;
