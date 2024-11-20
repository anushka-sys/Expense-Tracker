import React, { useState } from 'react'

const ExpenseTrackerForm = ({addExpenses}) => {
    const [expenseInfo, setExpensesInfo] = useState({text: '', amount: ''});
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyExpenseInfo = { ...loginInfo };
        ccopyExpenseInfo[name] = value;
        setExpenseInfo(copyExpenseInfo);
    }

    const handleExpense = (e) =>{
        e.preventDefault();
        console.log(expenseInfo);
        const {text,amount} = expenseInfo;
        
        addExpenses(expenseInfo)
    }
    
  return (
    <div className='container'>

            <h1>Login</h1>
            <form onSubmit={handleExpense}>
                <div>
                    <label htmlFor='email'>Expense  description</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='text'
                        placeholder='Enter your expense description...'
                        value={expenseInfo.text}
                    />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        name='amount'
                        placeholder='Enter your amount...'
                        value={expenseInfo.password}
                    />
                </div>
                <button type='submit'>Add Expense</button>
                
                
            </form>
            
        </div>
  )
}

export default ExpenseTrackerForm