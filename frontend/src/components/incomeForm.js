import React, { useState } from "react";

function IncomeForm({ setIncome }) {
  const [inputIncome, setInputIncome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIncome(Number(inputIncome));
    setInputIncome("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
      <label>Monthly Income: </label>
      <input
        type="number"
        value={inputIncome}
        onChange={(e) => setInputIncome(e.target.value)}
        required
      />
      <button type="submit">Create Budget</button>
    </form>
  );
}

export default IncomeForm;
