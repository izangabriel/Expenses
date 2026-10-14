import { useState } from 'react'
import { useExpense } from '../contexts/ExpenseContext';

const ExpenseForm = () => {
    const { addExpense } = useExpense();
    const [dataForm, setDataForm] = useState({ amount: "", category: "", date: "", note: "" });

    const handleForm = (e) => {
        e.preventDefault();
        if (!dataForm.amount.trim() || !dataForm.category.trim()) return
        const amount = Number(dataForm.amount)
        if (amount <= 0) return

        addExpense(amount, dataForm.category, dataForm.date, dataForm.note);
        setDataForm({ amount: "", category: "", date: "", note: "" });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setDataForm(prev => ({ ...prev, [name]: value }))
    }

    const fieldClass =
        "rounded-lg border border-white/10 bg-[#0d111c] px-3 py-2 text-sm text-white " +
        "placeholder:text-white/40 outline-none transition-colors " +
        "focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20";

    return (
        <form onSubmit={handleForm} className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-black/50 p-3">
            <input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                name="amount"
                value={dataForm.amount}
                onChange={handleChange}
                placeholder="Monto"
                aria-label="Monto"
                autoComplete="off"
                required
                className={`${fieldClass} w-28`}
            />
            <input
                type="text"
                name="note"
                value={dataForm.note}
                onChange={handleChange}
                placeholder="Nota"
                aria-label="Nota"
                autoComplete="off"
                required
                className={`${fieldClass} min-w-40 flex-1`}
            />
            <input
                type="date"
                name="date"
                value={dataForm.date}
                onChange={handleChange}
                aria-label="Fecha"
                required
                className={`${fieldClass} scheme:dark`}
            />
            <select
                name="category"
                value={dataForm.category}
                onChange={handleChange}
                aria-label="Categoría"
                required
                className={fieldClass}
            >
                <option value="" disabled>Categoría</option>
                <option value="comida">Comida</option>
                <option value="transporte">Transporte</option>
                <option value="entretenimiento">Entretenimiento</option>
                <option value="servicios">Servicios</option>
                <option value="otros">Otros</option>
            </select>

            <button type="submit" className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400">
                Agregar
            </button>
        </form>
    )
}

export default ExpenseForm