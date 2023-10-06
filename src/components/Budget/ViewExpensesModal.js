import { Modal, Button, Stack } from "react-bootstrap"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../../contexts/BudgetsContext"
import { currencyFormatter } from "./utils"
import { useEffect, useState } from "react"


export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets();
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(null);


  useEffect(() => {
    if (budgetId !== null) {
      console.log("sd1", budgetId);
      // Fetch expenses data for the specified budget or "Uncategorized" budget.
      const apiUrl = `http://localhost:8082/api/expense/all`;
      setExpenses([]);
     
     
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          data.map(expense => {
            if(expense.budgetId==budgetId)
            {
              setExpenses(expenses => [...expenses, expense]);
            }
            expense.amount = Number(expense.amount)
            console.log("sd",expense.amount);
          });
         
         
          if (Array.isArray(data.expenses)) {
            setExpenses(data.expenses);
          } else {
            // Handle the case where data.expenses is not an array.
            console.error('Expenses data is not an array:', data.expenses);
          }
          setBudget(data.budget);
        })
        .catch((error) => {
          console.error('Error fetching expenses data:', error);
        });
    }
  }, [budgetId]);
 


  const handleDeleteBudget = (budget) => {
    console.log("deleteBudget",budget);
    // if (budget) {
    //   // Send a DELETE request to delete the budget.
    //   const apiUrl = `http://localhost:8082/api/budget/delete/${budget.budgetId}`;


    //   fetch(apiUrl, {
    //     method: 'DELETE',
    //   })
    //     .then((response) => {
    //       if (response.ok) {
    //         deleteBudget(budget);
    //         handleClose();
    //       } else {
    //         console.error('Failed to delete budget');
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('Error deleting budget:', error);
    //     });
    // }
  };


  const handleDeleteExpense = (expense) => {
    // Send a DELETE request to delete the expense.
    const apiUrl = `http://localhost:8082/api/expense/delete/${budgetId}`;


    fetch(apiUrl, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          deleteExpense(expense);
        } else {
          console.error('Failed to delete expense');
        }
      })
      .catch((error) => {
        console.error('Error deleting expense:', error);
      });
  };


  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                onClick={() => {
                  handleDeleteBudget(budget)
                 
                  handleClose()
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.length === 0 ? <p>No expenses found.</p> :expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
