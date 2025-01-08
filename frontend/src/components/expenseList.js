import React from "react";

function ExpenseList({ expenses, deleteExpense }) {
  return (
    <div style={{ margin: "20px" }}>
      <h3>Expense List</h3>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>
                <button onClick={() => deleteExpense(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
