import { useExpense } from '../contexts/ExpenseContext';

const ExpensesList = ({ expenses }) => {
    const { loading, error, deleteExpense } = useExpense();

    return (
        <section className="rounded-2xl border border-white/10 bg-black/50 p-5">
            <h2 className="mb-4 text-lg font-semibold">Gastos</h2>

            {loading ? (<p className="text-sm text-white/50">Cargando...</p>) : error ? (
                <p role="alert" className="text-sm text-red-400">{error}</p>
            ) : expenses.length === 0 ? (
                <p className="text-sm text-white/50">No hay gastos que mostrar.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {expenses.map((expense) => (
                        <li key={expense.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5">
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">{expense.note}</p>
                                <p className="text-xs text-white/50">{expense.date}</p>
                            </div>

                            <div className="flex shrink-0 items-center gap-3">
                                <span className="rounded-full bg-blue-500/15 px-2.5 py-0.5 text-xs text-blue-300">{expense.category}</span>
                                <span className="text-sm font-semibold">${Number(expense.amount).toFixed(2)}</span>
                                <button
                                    type="button"
                                    onClick={() => deleteExpense(expense.id)}
                                    aria-label={`Eliminar gasto: ${expense.note}`}
                                    className="cursor-pointer rounded-md px-2 py-1 text-sm text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
                                >
                                    ✕
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default ExpensesList