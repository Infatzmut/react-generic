import './ExpensesList.css'
import ExpenseItem from './ExpenseItem';
const ExpensesList = ({expenses}) => {
    let expensesContent = <p>No Expenses found</p>;
    if (expenses.length > 0) {
        expensesContent = expenses.map(item => 
            <ExpenseItem 
                key={item.id} 
                title={item.title} 
                ammount={item.amount} 
                date={item.date}/>)
    }

    if (expenses.length === 0) {
        return (
            <h2 className='expenses-list__fallback'> Found no expenses</h2>
        )
    }

    return (
        <ul className='expenses-list'>
            {expensesContent}
        </ul>
    )
}

export default ExpensesList;