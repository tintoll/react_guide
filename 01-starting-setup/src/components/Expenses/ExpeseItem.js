import React, { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const [title, setTitle] = useState(props.title);

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date} />
        <div className="expense-item__description">
          <h1>{title}</h1>
          <div className="expense-item__price">${props.amout}</div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
