import "./ExpenseItem.css";

function ExpenseItem() {
  const expenseDate = new Date(2022, 9, 20);
  const expenseTitle = "Car Insurance";
  const expenseAmout = 294.67;

  return (
    <div className="expense-item">
      <div>{expenseDate.toLocaleString()}</div>
      <div className="expense-item__description">
        <h1>{expenseTitle}</h1>
        <div className="expense-item__price">${expenseAmout}</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
