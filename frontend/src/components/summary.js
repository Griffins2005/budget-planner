import React from "react";

function Summary({ income, expenses }) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = income - totalExpenses;

  return (
    <div style={{ margin: "20px" }}>
      <h3>Summary</h3>
      <p>Total Income: ${income}</p>
      <p>Total Expenses: ${totalExpenses}</p>
      <p>Remaining Budget: ${remainingBudget}</p>
    </div>
  );
}

export default Summary;
