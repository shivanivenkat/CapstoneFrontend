import React, { useEffect, useState } from 'react';
import BudgetCard from './BudgetCard';


export default function TotalBudgetCard() {
  const [totalBudgetData, setTotalBudgetData] = useState({
    amount: 0,
    max: 0,
  });


  useEffect(() => {
    // Define the API endpoints to fetch expenses and budgets data.
    const expensesApiUrl = 'http://localhost:8082/api/expense/all';
    const budgetsApiUrl = 'http://localhost:8082/api/budget/all';


    // Fetch expenses data from the Spring Boot backend.
    fetch(expensesApiUrl)
      .then((response) => response.json())
      .then((expenses) => {
        // Fetch budgets data from the Spring Boot backend.
        fetch(budgetsApiUrl)
          .then((response) => response.json())
          .then((budgets) => {
            // Calculate the total amount of expenses and the total maximum budget.
            const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
            const max = budgets.reduce((total, budget) => total + budget.maximumExpense, 0);


            // Update the component's state with the calculated values.
            setTotalBudgetData({ amount, max });
          })
          .catch((error) => {
            console.error('Error fetching budgets data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching expenses data:', error);
      });
  }, [totalBudgetData]);


  const { amount, max } = totalBudgetData;


  if (max === 0) {
    return null;
  }


  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />;
}


