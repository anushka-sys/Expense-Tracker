import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpensesTable from './ExpensesTable'; // Import ExpensesTable
import ExpenseDetals from './ExpenseDetals';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            };
            const response = await fetch(url, headers);
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    };

    const addExpenses = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
            };
            const response = await fetch(url, headers);
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <div>
            <div>
                <h1>Welcome {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            < ExpenseDetals />
            <ExpenseTrackerForm addExpenses={addExpenses} />
            <ExpensesTable expenses={expenses} />
            <ToastContainer />
        </div>
    );
}

export default Home;
