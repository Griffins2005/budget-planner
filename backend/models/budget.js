const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
});

const budgetSchema = new mongoose.Schema({
  income: { type: Number, required: true },
  expenses: [expenseSchema],
});

module.exports = mongoose.model('Budget', budgetSchema);
