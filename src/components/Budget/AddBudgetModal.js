import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../../contexts/BudgetsContext"
import axios from 'axios'; 

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();

  async function handleSubmit(e) {
    e.preventDefault();

    const budgetData = {
      name: nameRef.current.value,
      maximumExpense: parseFloat(maxRef.current.value),
    };

    try {
      // Send a POST request to your Spring Boot backend
      const response = await axios.post('http://localhost:8082/api/budget/create', budgetData);
console.log(response);
      if (response.status === 200) {
        // Budget created successfully, you can handle the success here
        console.log('Budget created successfully');
        addBudget(response.data); // Assuming the response contains the created budget data
      } else {
        // Handle other response statuses (e.g., validation errors)
        console.error('Failed to create budget');
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
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
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
