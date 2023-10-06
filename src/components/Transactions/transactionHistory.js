// src/components/TransactionHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    // Fetch transactions from your API
    console.log("Fetching transactions...");
    fetch('http://localhost:8081/api/transactions/all')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
        console.log(data);
      setTransactions(data);
    })
    .catch((error) => {
      console.error('Error fetching transactions:', error);
    });


  }, []);
  console.log(transactions);


  return (
    <div>
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.transactionID}>
              <td>{transaction.transactionID}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.userID}</td>
              <td>{transaction.transactionDate}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.expenseCategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default TransactionHistory;
