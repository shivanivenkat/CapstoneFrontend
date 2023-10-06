import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../../contexts/BudgetsContext"
import axios from 'axios';
import { useEffect, useState } from "react"
export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  const [budgets, setBudgets] = useState([]);
  
  useEffect(() => {
    // Fetch budgets data from the Spring Boot backend.
    fetch("http://localhost:8082/api/budget/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBudgets(data);
      })
      .catch((error) => {
        console.error("Error fetching budgets data:", error);
      });
  }, []);
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  const { addExpense } = useBudgets()

  async function handleSubmit(e) {
    e.preventDefault();
//console.log("sd",budgetIdRef.current.value);
    const expenseData = {
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    };

    try {
      const response = await axios.post('http://localhost:8082/api/expense/create', expenseData);

      if (response.status === 200) {
        // Expense created successfully, you can handle the success here
        console.log('Expense created successfully');
        addExpense(response.data); // Assuming the response contains the created expense data
      } else {
        // Handle other response statuses (e.g., validation errors)
        console.error('Failed to create expense');
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error:', error);
    }

    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map(budget => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}
