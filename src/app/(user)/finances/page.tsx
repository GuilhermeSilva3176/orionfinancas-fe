
"use client";

import Link from 'next/link';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import styles from './Finances.module.css';

export default function FinancesPage() {
    // Valores mockados só para visualização da dashboard
    const totalIncome = 3500.0;
    const totalExpenses = 450.0;
    const goalsAmount = 750.0;
    const balance = 1250.0;

    const pieData = [
        { name: 'Ganhos', value: totalIncome, color: '#e2e8f0' },
        { name: 'Gastos', value: totalExpenses, color: '#cbd5e1' },
        { name: 'Metas', value: goalsAmount, color: '#94a3b8' },
    ];

    const historyData = [
        { month: 'Set', ganhos: 3200, gastos: 2100 },
        { month: 'Out', ganhos: 3500, gastos: 1800 },
        { month: 'Nov', ganhos: 3100, gastos: 2400 },
        { month: 'Dez', ganhos: 4200, gastos: 2900 },
        { month: 'Jan', ganhos: 3800, gastos: 1500 },
        { month: 'Fev', ganhos: 3500, gastos: 450 },
    ];

    const recentTransactions = [
        { id: 1, type: 'gasto', title: 'Assinatura Spotify', amount: 21.90, date: '04/03/2026', category: 'Lazer' },
        { id: 2, type: 'ganho', title: 'Freelance Design', amount: 1500.00, date: '02/03/2026', category: 'Trabalho' },
        { id: 3, type: 'gasto', title: 'Mercado Central', amount: 156.40, date: '01/03/2026', category: 'Alimentação' },
        { id: 4, type: 'gasto', title: 'Uber - Ida', amount: 15.00, date: '28/02/2026', category: 'Transporte' },
    ];

    return (
        <div className={styles.financesContainer}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
                <div>
                    <h1 className={styles.pageTitle}>Dashboard Financeira</h1>
                    <p className={styles.balanceText}>Seu saldo está em dia: <span style={{ color: 'var(--primary-color)', fontWeight: 800 }}>R$ {balance.toFixed(2).replace('.', ',')}</span></p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link href="/finances/records?add=true" className={styles.detailsBtn} style={{ margin: 0, padding: '0.6rem 1.2rem', background: 'var(--primary-color)', color: 'var(--dark-bg)', fontSize: '0.9rem' }}>
                        + Adicionar Registro
                    </Link>
                </div>
            </div>

            <div className={styles.dashboardGrid}>
                {/* Coluna 1: Gráfico de Rosca */}
                <div className={styles.chartContainer} style={{ background: 'var(--dark-surface)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={95}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '12px',
                                    padding: '12px'
                                }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value: any) => `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className={styles.chartCenterInfo}>
                        <span className={styles.centerLabel}>Resumo</span>
                        <span className={styles.centerValue} style={{ fontSize: '1.1rem' }}>Geral</span>
                    </div>
                </div>

                {/* Coluna 2: Histórico Mensal */}
                <div className={styles.historySection}>
                    <h2 className={styles.sectionTitle}>Ganhos vs Gastos</h2>
                    <div className={styles.barChartContainer}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={historyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
                                    dy={5}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '12px'
                                    }}
                                    formatter={(value: any) => `R$ ${value}`}
                                />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }} />
                                <Bar name="Ganhos" dataKey="ganhos" fill="#2dd4bf" radius={[3, 3, 0, 0]} barSize={15} />
                                <Bar name="Gastos" dataKey="gastos" fill="#ef4444" radius={[3, 3, 0, 0]} barSize={15} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Coluna 3: Cards de Resumo */}
                <section className={styles.overviewSummary} style={{ gap: '0.75rem' }}>
                    <div className={styles.overviewCard} style={{ padding: '0.8rem 1rem' }}>
                        <span className={styles.overviewLabel} style={{ fontSize: '0.8rem' }}>Ganhos no mês</span>
                        <span className={styles.overviewValue} style={{ color: '#2dd4bf', fontSize: '0.95rem' }}>+ R$ 3.500,00</span>
                    </div>
                    <div className={styles.overviewCard} style={{ padding: '0.8rem 1rem' }}>
                        <span className={styles.overviewLabel} style={{ fontSize: '0.8rem' }}>Gastos no mês</span>
                        <span className={styles.overviewValue} style={{ color: '#ef4444', fontSize: '0.95rem' }}>- R$ 450,00</span>
                    </div>
                    <div className={styles.overviewCard} style={{ padding: '0.8rem 1rem' }}>
                        <span className={styles.overviewLabel} style={{ fontSize: '0.8rem' }}>Reservado</span>
                        <span className={styles.overviewValue} style={{ color: '#eab308', fontSize: '0.95rem' }}>R$ 750,00</span>
                    </div>
                </section>
            </div>

            {/* Nova Seção de Transações Recentes */}
            <div className={styles.recentSection}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Transações Recentes</h2>
                    <Link href="/finances/records" className={styles.detailsBtn} style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                        Ver Tudo
                    </Link>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.transTable}>
                        <colgroup>
                            <col style={{ width: '100px' }} />
                            <col />
                            <col style={{ width: '180px' }} />
                            <col style={{ width: '140px' }} />
                            <col style={{ width: '160px' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Título</th>
                                <th>Categoria</th>
                                <th>Data</th>
                                <th style={{ textAlign: 'right' }}>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactions.map((tx) => (
                                <tr key={tx.id} className={styles.transRow}>
                                    <td>
                                        <span className={`${styles.typeBadge} ${tx.type === 'ganho' ? styles.typeGanho : styles.typeGasto}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>{tx.title}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{tx.category}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{tx.date}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        <span className={`${styles.amountVal} ${tx.type === 'ganho' ? styles.amountGanho : styles.amountGasto}`}>
                                            {tx.type === 'ganho' ? '+' : '-'} R$ {tx.amount.toFixed(2).replace('.', ',')}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
