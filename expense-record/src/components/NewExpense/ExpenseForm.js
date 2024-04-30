import { useState } from 'react'
import './ExpenseForm.css'

const ExpenseForm = ({onSaveExpenseData}) => {
    // Separated states
    // const [enteredTitle, setEnteredTitle ] = useState('');
    // const [enteredAmount, setEnteredAmount] = useState('');
    // const [enteredDate, setEnteredDate] = useState('');

    // const titleChangeHandler = (e) => {
    //     setEnteredTitle(e.target.value);
    // }
    // One state only
    const [userInput, setUserInput] = useState({
        title :'',
        amount: '',
        date: ''
    })

    const changeHandler = (e) => {
        // Wrong way
        // setUserInput({
        //     ...userInput,
        //     enteredTitle: e.target.value
        // })
        
        const {name, value} = e.target
        setUserInput((prevState) => {
            return {
                ...prevState, 
                [name]: value
            }
        })
    }
    
    // const changeHandler = (identifier, value) => {
    //     if (identifier === 'title') {
    //         setEnteredTitle(value)
    //     } else if (identifier === 'date') {
    //         setEnteredDate(value)
    //     } else {
    //         setEnteredAmount(value)
    //     }
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        onSaveExpenseData(userInput)
        setUserInput({
            title :'',
            amount: '',
            date: ''
        })
    }
    return (
        <form onSubmit={submitHandler}>
            <div className='new-expense__controls'>
                <div className='new-expense__control'>
                    <label>Title</label>
                    <input type='text' onChange={changeHandler} value={userInput.title} name='title'/>
                </div>
                <div className='new-expense__control'>
                    <label>Amount</label>
                    <input type='number' value={userInput.amount} min="0.01" step="0.01" name='amount' onChange={changeHandler}/>
                </div>
                <div className='new-expense__control'>
                    <label>Date</label>
                    <input type='date' value={userInput.date} onChange={changeHandler} name='date' min="2022-01-01" max="2024-12-31"/>
                </div>
            </div>
            <div className='new-expense__actions'>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    )
}

export default ExpenseForm;