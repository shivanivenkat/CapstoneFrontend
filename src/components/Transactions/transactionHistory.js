import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';


function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState('expense');
  const [transactionAmount, setTransactionAmount] = useState('');

  useEffect(() => {
    console.log("Fetching transactions...");
    fetch('http://localhost:8081/api/transactions/all')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTransactions(data);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  }, [transactions]);

  const handleAddTransaction = () => {
    const newTransaction = {
      amount: parseFloat(transactionAmount),
      transactionType: transactionType,
    };

    fetch('http://localhost:8081/api/transactions/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Transaction added:', data);
        // Update the transactions state with the newly added transaction
        setTransactions([...transactions, data]);
        // Clear the input fields
        setTransactionAmount('');
      })
      .catch((error) => {
        console.error('Error adding transaction:', error);
      });
  };

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>
      <div className="transaction-input">
        <input
          type="text"
          placeholder="Amount"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
        />
        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>
      <div className="transaction-list">
        {transactions.map((transaction) => (
          <div key={transaction.transactionID} className="transaction-card">
            <div className="transaction-info">
              <span className={`transaction-amount ${transaction.transactionType === 'income' ? 'income' : 'expense'}`}>
                {transaction.transactionType === 'income' ? '+' : '-'} ₹{Math.abs(transaction.amount)}
              </span>
              <span className="transaction-type">{transaction.transactionType}</span>
            </div>
            <div className="transaction-details">
              <span className="transaction-date">{transaction.transactionDate}</span>
              {transaction.expenseCategory && <span className="transaction-category">{transaction.expenseCategory}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionHistory;
