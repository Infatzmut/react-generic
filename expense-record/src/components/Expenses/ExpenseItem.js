import ExpenseDate from './ExpenseDate'
import './ExpenseItem.css'
import Card from '../UI/Card'
export default function ExpenseItem(props){
    const date = new Date(props.date)
    return (
        <li>
            <Card className='expense-item'>
                <ExpenseDate date={date}/>
                <div className='expense-item__description'>
                    <h2>{props.title}</h2>
                    <div className='expense-item__price'>{props.ammount}</div>
                </div>
            </Card>
        </li>
    )
}