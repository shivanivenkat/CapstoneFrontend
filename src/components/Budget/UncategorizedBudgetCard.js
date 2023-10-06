import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../../contexts/BudgetsContext"
import BudgetCard from "./BudgetCard"
import { useEffect, useState } from "react"

export default function UncategorizedBudgetCard(props) {
  const [uncategorizedBudgetData, setUncategorizedBudgetData] = useState({
    amount: 0,
  });

  useEffect(() => {
    // Define the API endpoint to fetch expenses related to the "Uncategorized" budget.
    const apiUrl = 'http://localhost:8082/api/expense/all';

    // Fetch expenses data for the "Uncategorized" budget from the Spring Boot backend.
    fetch(apiUrl)
      .then((response) => response.json())
      .then((expenses) => {
        // Calculate the total amount of expenses associated with the "Uncategorized" budget.
        const amount = expenses.reduce((total, expense) => total + expense.amount, 0);

        // Update the component's state with the calculated amount.
        setUncategorizedBudgetData({ amount });
      })
      .catch((error) => {
        console.error('Error fetching uncategorized expenses data:', error);
      });
  }, []);

  const { amount } = uncategorizedBudgetData;

  if (amount === 0) return null;

  return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />;
}