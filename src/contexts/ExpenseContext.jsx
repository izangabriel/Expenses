import { useContext, createContext } from "react";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useEffect } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchExpenses = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('expenses')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            setError(error.message);
        } else {
            setExpenses(data);
            setError("");
        }

        setLoading(false);
    };

    useEffect(() => {
        if (currentUser) {
            fetchExpenses();
        } else {
            setError("No hay un usuario autenticado");
        }
    }, [currentUser]);

    const addExpense = async (amount, category, date, note) => {
        const { error, data } = await supabase.from('expenses').insert([
            { amount, category, date, note, user_id: currentUser.id }
        ]).select();

        if (!error) {
            setExpenses(prev => [...prev, data[0]])
            return true;
        } else {
            return false;
        }
    }

    const deleteExpense = async (expenseId) => {
        const { error, data } = await supabase.from('expenses').delete().eq('id', expenseId);

        if (!error) {
            setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
            return true
        } else {
            return false;
        }
    };


    const updateExpense = async (expenseId, updatedFields) => {
        const { error } = await supabase.from('expenses').update(updatedFields).eq('id', expenseId);

        if (!error) {
            setExpenses(prev => prev.map(expense => expense.id === expenseId ? { ...expense, ...updatedFields } : expense));
            return true;
        } else {
            return false
        }
    };


    return (
        <ExpenseContext.Provider value={{ expenses, loading, error, addExpense, deleteExpense, updateExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export const useExpense = () => useContext(ExpenseContext);