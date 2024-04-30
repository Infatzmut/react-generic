import ExpensesFilter from "./ExpensesFilter"
import Card from "../UI/Card"
import { useState } from "react"
import ExpensesList from "./ExpensesList"
import ExpensesChart from "./ExpensesChart"
export default function Expenses({expenses}){
    const [filteredYear, setFilteredYear] = useState('2020')
    const filterChangeHandler = selectedYear => {
        setFilteredYear(selectedYear)
    }

    const filteredExpenses = expenses.filter(expense => {
        if (typeof expense.date === "string") {
            expense.date = new Date(expense.date)
        }
        return expense.date.getFullYear().toString() === filteredYear
    })
    
    return (
        <Card>
            <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
            <ExpensesChart expenses={filteredExpenses} />
            <ExpensesList expenses={filteredExpenses}/>
        </Card>
    )
}  