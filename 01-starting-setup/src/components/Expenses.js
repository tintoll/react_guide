import './Expenses.css'
import ExpenseItem from './ExpeseItem';

function Expenses(props) {
    return (
        <div className="expenses">
            {props.items.map(expense =>
                <ExpenseItem
                    key={expense.id}
                    title={expense.title}
                    amout={expense.amount}
                    date={expense.date}
                />)}
        </div>
    )
}

export default Expenses;