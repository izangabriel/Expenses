import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const axisTick = { fill: 'rgba(255,255,255,0.5)', fontSize: 12 };

const tooltipStyle = {
    backgroundColor: '#0d111c',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: '#fff',
    fontSize: 12,
};

const ExpenseChart = ({ expenses }) => {

    const totalsByCategory = expenses.reduce((acc, expense) => {
        const { category, amount } = expense;

        if (!acc[category]) {
            acc[category] = 0;
        };

        acc[category] += Number(amount);
        return acc;
    }, {});

    const totalsByMonth = expenses.reduce((acc, expense) => {
        const { date, amount } = expense;
        const month = date.slice(0, 7);

        if (!acc[month]) {
            acc[month] = 0;
        };

        acc[month] += Number(amount);
        return acc;
    }, {})

    const chartData = Object.entries(totalsByCategory).map(([category, total]) => ({ category, total }));

    const monthlyData = Object.entries(totalsByMonth).map(([month, total]) => ({ month, total })).sort((a, b) => a.month.localeCompare(b.month));

    return (
        <div className="grid gap-4 lg:grid-cols-2">
            <section className="rounded-2xl border border-white/10 bg-black/50 p-5">
                <h2 className="mb-4 text-lg font-semibold">Gastos por categoría</h2>

                {chartData.length === 0 ? (
                    <p className="text-sm text-white/50">Sin datos para mostrar.</p>
                ) : (
                    <div className="h-64 w-full">
                        <ResponsiveContainer>
                            <BarChart data={chartData}>
                                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                                <XAxis dataKey="category" tick={axisTick} axisLine={false} tickLine={false} />
                                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={tooltipStyle}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    formatter={(value) => `$${Number(value).toFixed(2)}`}
                                />
                                <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </section>

            <section className="rounded-2xl border border-white/10 bg-black/50 p-5">
                <h2 className="mb-4 text-lg font-semibold">Gastos por mes</h2>

                {monthlyData.length === 0 ? (
                    <p className="text-sm text-white/50">Sin datos para mostrar.</p>
                ) : (
                    <div className="h-64 w-full">
                        <ResponsiveContainer>
                            <LineChart data={monthlyData}>
                                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                                <XAxis dataKey="month" tick={axisTick} axisLine={false} tickLine={false} />
                                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={tooltipStyle}
                                    formatter={(value) => `$${Number(value).toFixed(2)}`}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ r: 3, fill: '#3b82f6' }}
                                    activeDot={{ r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </section>
        </div>
    )
}

export default ExpenseChart