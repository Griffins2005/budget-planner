const Budget = require('../models/budget');

// Get all budgets
exports.getBudgets = async (req, res, next) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    next(error);
  }
};

// Create a new budget
exports.createBudget = async (req, res, next) => {
  const { income, expenses } = req.body;
  try {
    const newBudget = await Budget.create({ income, expenses });
    res.status(201).json(newBudget);
  } catch (error) {
    next(error);
  }
};

// Update a budget
exports.updateBudget = async (req, res, next) => {
  const { id } = req.params;
  const { income, expenses } = req.body;
  try {
    const updatedBudget = await Budget.findByIdAndUpdate(id, { income, expenses }, { new: true });
    if (!updatedBudget) return res.status(404).json({ message: 'Budget not found' });
    res.status(200).json(updatedBudget);
  } catch (error) {
    next(error);
  }
};

// Delete a budget
exports.deleteBudget = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) return res.status(404).json({ message: 'Budget not found' });
    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    next(error);
  }
};
