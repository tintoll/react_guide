import React, { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const [title, setTitle] = useState(props.title);

  const clickHandler = () => {
    setTitle("Updated!");
    console.log(title); // 변경된 타이틀로 보이지 않는다.
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h1>{title}</h1>
        <div className="expense-item__price">${props.amout}</div>
      </div>
      <button onClick={clickHandler}>Click</button>
    </Card>
  );
};

export default ExpenseItem;
