import React, { useState } from "react";

function ExpenseForm({ addExpense }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ id: Date.now(), amount: Number(amount), category, description });
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <label>Amount: </label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <label>Category: </label>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select</option>
        <option value="Rent">Rent</option>
        <option value="Groceries">Groceries</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>
      <label>Description: </label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
