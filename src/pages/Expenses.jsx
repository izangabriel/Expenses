import { useState } from 'react'
import ExpenseChart from '../components/ExpenseChart'
import ExpenseForm from '../components/ExpenseForm'
import ExpensesList from '../components/ExpensesList'
import { useExpense } from '../contexts/ExpenseContext'
import NavBar from '../components/NavBar'

const Expenses = () => {
    const { expenses } = useExpense();
    const [category, setCategory] = useState("all");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const filteredExpenses = expenses.filter(expense => {
        const matchesCategory = category === 'all' || expense.category === category;
        const matchesDateFrom = !dateFrom || expense.date >= dateFrom;
        const matchesDateTo = !dateTo || expense.date <= dateTo;
        return matchesCategory && matchesDateFrom && matchesDateTo;
    });

    const categories = [...new Set(expenses.map(expense => expense.category))];

    const totalExpenses = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);


    return (
        <div className="min-h-dvh bg-[#05070d] text-white">
            <NavBar />

            <main className="mx-auto flex w-full max-w-4xl flex-col gap-5 px-4 py-6">
                <p className="text-2xl font-semibold">Total: ${totalExpenses}</p>

                <div className="flex flex-wrap items-center gap-3">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-lg border border-white/10 bg-[#0d111c] px-3 py-2 text-sm text-white outline-none focus:border-blue-500/60">
                        <option value="all">Todo</option>
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="rounded-lg border border-white/10 bg-[#0d111c] px-3 py-2 text-sm text-white outline-none scheme:dark focus:border-blue-500/60" />
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="rounded-lg border border-white/10 bg-[#0d111c] px-3 py-2 text-sm text-white outline-none scheme:dark focus:border-blue-500/60" />
                </div>

                <ExpenseForm />
                <ExpensesList expenses={filteredExpenses} />
                <ExpenseChart expenses={filteredExpenses} />
            </main>
        </div>
    )
}

export default Expenses