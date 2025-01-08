import React, { useState, useEffect } from 'react';
import ExpenseForm from './expenseForm';
import ExpenseList from './expenseList';
import Summary from './summary';
import ChartSection from './chartSection';

const BudgetSection = ({ budget, deleteBudget }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch(`/budgets/${budget.id}/expenses`)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error('Error fetching expenses:', err));
  }, [budget.id]);

  const addExpense = (expense) => {
    fetch(`/budgets/${budget.id}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    })
      .then((res) => res.json())
      .then((newExpense) => setExpenses([...expenses, newExpense]))
      .catch((err) => console.error('Error adding expense:', err));
  };

  const deleteExpense = (expenseId) => {
    fetch(`/budgets/${budget.id}/expenses/${expenseId}`, { method: 'DELETE' })
      .then(() =>
        setExpenses(expenses.filter((expense) => expense.id !== expenseId))
      )
      .catch((err) => console.error('Error deleting expense:', err));
  };

  return (
    <div style={{ margin: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h3>Budget</h3>
      <Summary income={budget.income} expenses={expenses} />
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
      <ChartSection expenses={expenses} />
      <button onClick={() => deleteBudget(budget.id)}>Delete Budget</button>
    </div>
  );
};

export default BudgetSection;
