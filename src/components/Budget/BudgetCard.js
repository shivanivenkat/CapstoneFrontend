import { Button, Card, ProgressBar, Stack } from "react-bootstrap"
import { currencyFormatter } from "./utils"

export default function BudgetCard({
  key,
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}) {
  console.log(max);
  const classNames = []
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }
  const handleDeleteBudget = (id) => {
    console.log("deleteBudget",id);
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

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
          <Button
                onClick={() => {
                  handleDeleteBudget(key)
                  
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            {/* <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button> */}
            <Button onClick={onViewExpensesClick} variant="outline-secondary">
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max
  if (ratio < 0.5) return "primary"
  if (ratio < 0.75) return "warning"
  return "danger"
}
