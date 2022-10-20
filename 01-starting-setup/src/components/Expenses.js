import Card from "./Card";
import "./Expenses.css";
import ExpenseItem from "./ExpeseItem";

function Expenses(props) {
  return (
    <Card className="expenses">
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amout={expense.amount}
          date={expense.date}
        />
      ))}
    </Card>
  );
}

export default Expenses;
