const mongoose = require('mongoose');

const calculatorSchema = new mongoose.Schema({
  component: {
    type: String,
    required: true
  },
  props: {
    className: {
      type: String,
      required: true
    }
  },
  children: [
    {
      component: {
        type: String,
        required: true
      },
      children: {
        type: String,
        required: true
      }
    }
  ]
});

const Calculator = mongoose.model('Calculator', calculatorSchema);

module.exports = Calculator;

