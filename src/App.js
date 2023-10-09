import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/Budget/AddBudgetModal";
import AddExpenseModal from "./components/Budget/AddExpenseModal";
import ViewExpensesModal from "./components/Budget/ViewExpensesModal";
import BudgetCard from "./components/Budget/BudgetCard";
import UncategorizedBudgetCard from "./components/Budget/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/Budget/TotalBudgetCard";
import { useState, useEffect } from "react";
import TransactionHistory from "./components/Transactions/transactionHistory";
import RegisterForm from "./components/RegisterForm/RegisterForm";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
 
  useEffect(() => {
    // Fetch budgets data from the Spring Boot backend.
    fetch("http://localhost:8082/api/budget/all")
      .then((response) => response.json())
      .then((data) => {
        console.log("budgetData",data);
        setBudgets(data);
      })
      .catch((error) => {
        console.error("Error fetching budgets data:", error);
      });
      fetch("http://localhost:8082/api/expense/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setExpenses(data);
      })
      .catch((error) => {
        console.error("Error fetching budgets data:", error);
      });
  }, []);


  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }


  return (
    <><>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            // You can access budget properties like budget.id, budget.name, etc.
            // Calculate 'amount' based on your requirements.
            let amount = 0;
            expenses.forEach((expense) => {
              if (expense.budgetId === budget.id) {
                amount += expense.amount;
              }
            }); // Calculate the amount here.


            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.maximumExpense}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)} />
            );
          })}
          {/* <UncategorizedBudgetCard */}
          {/* //onAddExpenseClick={openAddExpenseModal}
    //onViewExpensesClick={() => */}
          {/* //setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID) */}
          {/* //}
  /> */}
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)} />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()} />
      <TransactionHistory />
    </><RegisterForm></RegisterForm></>
  );
}


export default App;
