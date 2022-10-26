import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import "./Expenses.css";
import ExpenseItem from "./ExpeseItem";
import { useState } from "react";

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      {props.items
        .filter((expense) => {
          return filteredYear === expense.date.getFullYear().toString();
        })
        .map((expense) => (
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
