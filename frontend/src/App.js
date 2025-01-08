import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/header";
import IncomeForm from "./components/incomeForm";
import ExpenseForm from "./components/expenseForm";
import ExpenseList from "./components/expenseList";
import Summary from "./components/summary";
import ChartSection from "./components/chartSection";

const App = () => {
  const [budgets, setBudgets] = useState([]);
  const [currentBudget, setCurrentBudget] = useState(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get("/api/budgets");
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    fetchBudgets();
  }, []);

  const handleAddBudget = async (income) => {
    try {
      const response = await axios.post("/api/budgets", { income, expenses: [] });
      setBudgets([...budgets, response.data]);
      setCurrentBudget(response.data);
    } catch (error) {
      console.error("Error creating budget:", error);
    }
  };

  const handleAddExpense = async (expense) => {
    if (!currentBudget) return;
    const updatedBudget = { ...currentBudget, expenses: [...currentBudget.expenses, expense] };
    try {
      const response = await axios.put(`/api/budgets/${currentBudget.id}`, updatedBudget);
      setBudgets(budgets.map(b => (b.id === currentBudget.id ? response.data : b)));
      setCurrentBudget(response.data);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    if (!currentBudget) return;
    const updatedBudget = {
      ...currentBudget,
      expenses: currentBudget.expenses.filter(exp => exp.id !== expenseId),
    };
    try {
      const response = await axios.put(`/api/budgets/${currentBudget.id}`, updatedBudget);
      setBudgets(budgets.map(b => (b.id === currentBudget.id ? response.data : b)));
      setCurrentBudget(response.data);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleDeleteBudget = async (budgetId) => {
    try {
      await axios.delete(`/api/budgets/${budgetId}`);
      setBudgets(budgets.filter(b => b.id !== budgetId));
      if (currentBudget?.id === budgetId) setCurrentBudget(null);
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <div className="container">
      <Header />
      <IncomeForm setIncome={handleAddBudget} />
      {currentBudget && (
        <>
          <ExpenseForm addExpense={handleAddExpense} />
          <ExpenseList expenses={currentBudget.expenses} deleteExpense={handleDeleteExpense} />
          <Summary income={currentBudget.income} expenses={currentBudget.expenses} />
          <ChartSection expenses={currentBudget.expenses} />
          <button onClick={() => handleDeleteBudget(currentBudget.id)}>Delete Current Budget</button>
        </>
      )}
      <h3>Saved Budgets</h3>
      <ul>
        {budgets.map(budget => (
          <li key={budget.id}>
            <button onClick={() => setCurrentBudget(budget)}>
              Budget #{budget.id}: ${budget.income}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
