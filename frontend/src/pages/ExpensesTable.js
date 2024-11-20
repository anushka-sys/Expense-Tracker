import React from 'react';

const ExpensesTable = ({ expenses = [] }) => {
  console.log('ExpenseTable -->', expenses);

  return (
    <div className="expense-list">
      {expenses.length > 0 ? (
        expenses.map((expense, index) => (
          <div key={expense.id || index} className="expense-item">
            <button className="delete-button">X</button>
            <div className="expense-description">{expense.text || 'No description'}</div>
            <div
              className="expense-amount"
              style={{
                color: expense.amount > 0 ? '#27ae60' : '#e74c3c',
              }}
            >
              {expense.amount || 0}
            </div>
          </div>
        ))
      ) : (
        <div className="no-expenses">No expenses to show.</div>
      )}
    </div>
  );
};

export default ExpensesTable;
