import React from 'react';
import ExpenseItem from './ExpeseItem';

import './ExpensesList.css'

const ExpensesList = props => {
    if (props.items.length === 0) {
        return <h2 className='expenses-list__fallback'>No Expense</h2>
    }

    return (
        <ul className='expenses-list'>
            {
                props.items.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        title={expense.title}
                        amout={expense.amount}
                        date={expense.date}
                    />
                ))
            }
        </ul>
    )

}

export default ExpensesList;