
"use client";

import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import styles from './Finances.module.css';

export default function FinancesPage() {
    const [view, setView] = useState<'resumo' | 'historico'>('resumo');
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Estados para Edição/Exclusão
    const [editingTx, setEditingTx] = useState<any>(null);
    const [deletingTxId, setDeletingTxId] = useState<number | null>(null);

    // Estado para novo registro
    const [newTx, setNewTx] = useState({
        type: 'gasto' as 'ganho' | 'gasto',
        title: '',
        amount: '',
        category: '',
        date: new Date().toLocaleDateString('pt-BR')
    });

    // Mock inicial transformado em estado para refletir edições/exclusões
    const [transactions, setTransactions] = useState([
        { id: 1, type: 'gasto', title: 'Assinatura Spotify', amount: 21.90, date: '04/03/2026', category: 'Lazer' },
        { id: 2, type: 'ganho', title: 'Freelance Design', amount: 1500.00, date: '02/03/2026', category: 'Trabalho' },
        { id: 3, type: 'gasto', title: 'Mercado Central', amount: 156.40, date: '01/03/2026', category: 'Alimentação' },
        { id: 4, type: 'gasto', title: 'Uber - Ida', amount: 15.00, date: '28/02/2026', category: 'Transporte' },
        { id: 5, type: 'gasto', title: 'Aluguel', amount: 1200.00, date: '01/02/2026', category: 'Moradia' },
        { id: 6, type: 'ganho', title: 'Bônus Mensal', amount: 500.00, date: '15/01/2026', category: 'Trabalho' },
        { id: 7, type: 'gasto', title: 'Farmácia', amount: 45.00, date: '20/01/2026', category: 'Saúde' },
        { id: 8, type: 'gasto', title: 'Internet Fibra', amount: 99.00, date: '05/01/2026', category: 'Serviços' },
        { id: 9, type: 'gasto', title: 'Curso Online', amount: 199.00, date: '10/01/2026', category: 'Educação' },
    ]);

    // Cálculo dinâmico baseado no estado
    const totalIncome = transactions.filter(t => t.type === 'ganho').reduce((acc, t) => acc + t.amount, 0);
    const totalExpensesByCtx = transactions.filter(t => t.type === 'gasto').reduce((acc, t) => acc + t.amount, 0);
    const balance = totalIncome - totalExpensesByCtx - 750;

    const pieData = [
        { name: 'Ganhos', value: totalIncome, color: 'var(--primary-color)' },
        { name: 'Gastos', value: totalExpensesByCtx, color: '#ef4444' },
        { name: 'Metas', value: 750, color: '#eab308' },
    ];

    const historyData = [
        { month: 'Set', ganhos: 3200, gastos: 2100 },
        { month: 'Out', ganhos: 3500, gastos: 1800 },
        { month: 'Nov', ganhos: 3100, gastos: 2400 },
        { month: 'Dez', ganhos: 4200, gastos: 2900 },
        { month: 'Jan', ganhos: 3800, gastos: 1500 },
        { month: 'Fev', ganhos: totalIncome, gastos: totalExpensesByCtx },
    ];

    // Handlers
    const confirmDelete = () => {
        if (deletingTxId) {
            setTransactions(transactions.filter(t => t.id !== deletingTxId));
            setDeletingTxId(null);
        }
    };

    const saveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        setTransactions(transactions.map(t => t.id === editingTx.id ? editingTx : t));
        setEditingTx(null);
    };

    const handleAddTx = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            id: transactions.length + 1,
            ...newTx,
            amount: parseFloat(newTx.amount) || 0,
            date: new Date().toLocaleDateString('pt-BR')
        };
        setTransactions([payload, ...transactions]);
        setIsAddModalOpen(false);
        setNewTx({
            type: 'gasto',
            title: '',
            amount: '',
            category: '',
            date: new Date().toLocaleDateString('pt-BR')
        });
    };

    return (
        <div className={styles.financesContainer}>
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Seu Simulador Financeiro</h1>
                <p className={styles.pageSubtitle}>
                    Pratique sua organização financeira em um ambiente de
                    <b> aprendizado</b> seguro e intuitivo.
                </p>
            </header>

            <div className={styles.actionBanner}>
                <div className={styles.actionText}>
                    <h3>Pronto para praticar?</h3>
                    <p>Simule uma nova entrada ou saída para ver o impacto no seu planejamento.</p>
                </div>
                <button
                    className={styles.addStepBtn}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    + Registrar Movimentação
                </button>
            </div>

            <div className={styles.mainDashboard}>
                <div className={styles.chartSection}>
                    <div className={styles.chartTabs}>
                        <button
                            className={`${styles.tabBtn} ${view === 'resumo' ? styles.activeTab : ''}`}
                            onClick={() => setView('resumo')}
                        >
                            Resumo do Mês
                        </button>
                        <button
                            className={`${styles.tabBtn} ${view === 'historico' ? styles.activeTab : ''}`}
                            onClick={() => setView('historico')}
                        >
                            Histórico (Tendência)
                        </button>
                    </div>

                    <div className={styles.chartDisplay}>
                        {view === 'resumo' ? (
                            <div className={styles.resumoView}>
                                <div className={styles.pieWrapper}>
                                    <ResponsiveContainer width="100%" height={320}>
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={90}
                                                outerRadius={115}
                                                paddingAngle={8}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#1e293b',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '10px',
                                                    padding: '8px 12px',
                                                    fontSize: '13px'
                                                }}
                                                itemStyle={{ color: '#fff', padding: '2px 0' }}
                                                formatter={(value: any) => `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className={styles.chartCenterInfo}>
                                        <span className={styles.centerLabel}>Seu Foco</span>
                                        <span className={styles.centerValue}>Equilíbrio</span>
                                    </div>
                                </div>
                                <div className={styles.resumoContext}>
                                    <h4>Análise Mensal</h4>
                                    <p>Este gráfico reflete sua saúde financeira atual através da distribuição entre <strong>ganhos</strong>, <strong>gastos</strong> e <strong>reservas planejadas</strong>.</p>
                                    <div className={styles.healthStatus}>
                                        <span className={styles.statusDot}></span>
                                        <span>Status: <strong>Saúde Estável</strong></span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.historyWrapper}>
                                <ResponsiveContainer width="100%" height={320}>
                                    <BarChart data={historyData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                                        />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                            formatter={(value: any) => `R$ ${value}`}
                                        />
                                        <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} />
                                        <Bar name="Ganhos" dataKey="ganhos" fill="#2dd4bf" radius={[6, 6, 0, 0]} barSize={20} />
                                        <Bar name="Gastos" dataKey="gastos" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>

                <aside className={styles.sideMetrics}>
                    <div className={styles.balanceCard}>
                        <span className={styles.balanceLabel}>Saldo p/ gastar</span>
                        <h2 className={styles.balanceValue}>R$ {balance.toFixed(2).replace('.', ',')}</h2>
                        <p className={styles.balanceHint}>Livre após reservas e fixos.</p>
                    </div>

                    <div className={styles.metricGroup}>
                        <div className={styles.miniMetric}>
                            <span className={styles.miniLabel}>Entrou</span>
                            <span className={styles.miniValue} style={{ color: '#2dd4bf' }}>+ R$ {totalIncome.toFixed(0)}</span>
                        </div>
                        <div className={styles.miniMetric}>
                            <span className={styles.miniLabel}>Saiu</span>
                            <span className={styles.miniValue} style={{ color: '#ef4444' }}>- R$ {totalExpensesByCtx.toFixed(0)}</span>
                        </div>
                    </div>

                    <div className={styles.primeCard}>
                        <div className={styles.primeHeader}>
                            <span className={styles.primeLabel}>Reserva de Emergência</span>
                            <span className={styles.primeTag}>Atenção</span>
                        </div>
                        <div className={styles.primeBody}>
                            <span className={styles.primeValue}>R$ 750,00</span>
                            <div className={styles.primeProgress}>
                                <div className={styles.progressFill} style={{ width: '35%' }}></div>
                            </div>
                            <p>Você atingiu <strong>35%</strong> da sua meta de reserva.</p>
                        </div>
                    </div>

                    <div className={styles.eduCard}>
                        <div className={styles.eduIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                            </svg>
                        </div>
                        <div>
                            <h5>Dica do Especialista</h5>
                            <p>Antes de investir, foque em sua <strong>Reserva de Emergência</strong> (3 meses de gastos).</p>
                        </div>
                    </div>
                </aside>
            </div>

            <div className={styles.recentSection}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Transações Recentes</h2>
                    <button
                        className={styles.detailsBtn}
                        style={{ margin: 0, padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                        onClick={() => setIsHistoryModalOpen(true)}
                    >
                        Ver Tudo
                    </button>
                </div>

                <div className={styles.activityList}>
                    {transactions.slice(0, 4).map((tx) => (
                        <div key={tx.id} className={styles.activityItem}>
                            <div className={styles.activityIcon} style={{ background: tx.type === 'ganho' ? 'rgba(45, 212, 191, 0.1)' : 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {tx.type === 'ganho' ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                        <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                                        <polyline points="17 18 23 18 23 12"></polyline>
                                    </svg>
                                )}
                            </div>
                            <div className={styles.activityMain}>
                                <span className={styles.activityTitle}>{tx.title}</span>
                                <span className={styles.activityCategory}>{tx.category} • {tx.date}</span>
                            </div>
                            <div className={`${styles.activityAmount} ${tx.type === 'ganho' ? styles.amountGanho : styles.amountGasto}`}>
                                {tx.type === 'ganho' ? '+' : '-'} R$ {tx.amount.toFixed(2).replace('.', ',')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal de Registro de Nova Movimentação */}
            {isAddModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsAddModalOpen(false)}>
                    <div className={styles.modalContent} style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
                        <header className={styles.modalHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                                    <path d="M12 5v14M5 12l7 7 7-7" />
                                </svg>
                                <h2>Nova Movimentação</h2>
                            </div>
                            <button className={styles.closeButton} onClick={() => setIsAddModalOpen(false)}>&times;</button>
                        </header>
                        <div className={styles.modalBody} style={{ padding: '2rem' }}>
                            <form className={styles.editForm} onSubmit={handleAddTx}>
                                <div className={styles.formGroup}>
                                    <label>Tipo de Registro</label>
                                    <div className={styles.typeSelectGroup}>
                                        <button
                                            type="button"
                                            className={`${styles.typeOption} ${newTx.type === 'ganho' ? styles.activeGanho : ''}`}
                                            onClick={() => setNewTx({ ...newTx, type: 'ganho' })}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                            </svg>
                                            Entrada
                                        </button>
                                        <button
                                            type="button"
                                            className={`${styles.typeOption} ${newTx.type === 'gasto' ? styles.activeGasto : ''}`}
                                            onClick={() => setNewTx({ ...newTx, type: 'gasto' })}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="17 17 7 17 7 7"></polyline>
                                                <line x1="17" y1="7" x2="7" y2="17"></line>
                                            </svg>
                                            Saída
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Título da Transação</label>
                                    <div className={styles.inputWithIcon}>
                                        <div className={styles.inputIcon}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 20h9"></path>
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                            </svg>
                                        </div>
                                        <input
                                            required
                                            className={styles.formInput}
                                            placeholder="Ex: Aluguel, Salário, Mercado..."
                                            value={newTx.title}
                                            onChange={e => setNewTx({ ...newTx, title: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formRow2}>
                                    <div className={styles.formGroup}>
                                        <label>Valor</label>
                                        <div className={styles.inputWithIcon}>
                                            <span className={styles.inputIcon} style={{ fontSize: '0.8rem', fontWeight: 800 }}>R$</span>
                                            <input
                                                required
                                                type="number"
                                                step="0.01"
                                                className={styles.formInput}
                                                placeholder="0,00"
                                                value={newTx.amount}
                                                onChange={e => setNewTx({ ...newTx, amount: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Categoria</label>
                                        <input
                                            required
                                            className={styles.formInput}
                                            placeholder="Ex: Lazer"
                                            value={newTx.category}
                                            onChange={e => setNewTx({ ...newTx, category: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className={styles.confirmActions} style={{ marginTop: '1rem' }}>
                                    <button type="button" className={styles.cancelBtn} onClick={() => setIsAddModalOpen(false)}>Cancelar</button>
                                    <button type="submit" className={styles.dangerBtn} style={{ background: 'var(--primary-color)' }}>Finalizar Registro</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Histórico Completo */}
            {isHistoryModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsHistoryModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <header className={styles.modalHeader}>
                            <h2>Histórico de Movimentações</h2>
                            <button className={styles.closeButton} onClick={() => setIsHistoryModalOpen(false)}>&times;</button>
                        </header>
                        <div className={styles.modalBody}>
                            <table className={styles.historyTable}>
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Título / Categoria</th>
                                        <th>Valor</th>
                                        <th>Data</th>
                                        <th style={{ textAlign: 'right' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((tx) => (
                                        <tr key={tx.id}>
                                            <td>
                                                <span className={`${styles.typeIndicator} ${tx.type === 'ganho' ? styles.typeGanho : styles.typeGasto}`}>
                                                    {tx.type === 'ganho' ? 'Ganho' : 'Gasto'}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ fontWeight: 700 }}>{tx.title}</div>
                                                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{tx.category}</div>
                                            </td>
                                            <td style={{ fontWeight: 800, color: tx.type === 'ganho' ? '#2dd4bf' : '#ef4444' }}>
                                                {tx.type === 'ganho' ? '+' : '-'} R$ {tx.amount.toFixed(2).replace('.', ',')}
                                            </td>
                                            <td style={{ color: 'var(--text-secondary)' }}>{tx.date}</td>
                                            <td>
                                                <div className={styles.actionsCell}>
                                                    <button
                                                        className={`${styles.actionIconBtn} ${styles.editBtn}`}
                                                        onClick={() => setEditingTx(tx)}
                                                        title="Editar"
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className={`${styles.actionIconBtn} ${styles.deleteBtn}`}
                                                        onClick={() => setDeletingTxId(tx.id)}
                                                        title="Excluir"
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="3 6 5 6 21 6"></polyline>
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <footer className={styles.modalFooter}>
                            <span className={styles.footerNote}>Exibindo todas as transações (Ambiente Sandbox).</span>
                        </footer>
                    </div>
                </div>
            )}

            {/* Modal de Confirmação de Exclusão */}
            {deletingTxId && (
                <div className={styles.confirmModalOverlay}>
                    <div className={styles.confirmModalContent}>
                        <div className={styles.confirmIcon} style={{ color: '#ef4444', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </div>
                        <h3 className={styles.confirmTitle}>Excluir Transação?</h3>
                        <p className={styles.confirmDesc}>Esta ação não pode ser desfeita. O valor será removido permanentemente dos cálculos.</p>
                        <div className={styles.confirmActions}>
                            <button className={styles.cancelBtn} onClick={() => setDeletingTxId(null)}>Cancelar</button>
                            <button className={styles.dangerBtn} onClick={confirmDelete}>Sim, Excluir</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Edição */}
            {editingTx && (
                <div className={styles.confirmModalOverlay}>
                    <div className={styles.confirmModalContent} style={{ maxWidth: '450px' }}>
                        <h3 className={styles.confirmTitle}>Editar Movimentação</h3>
                        <form className={styles.editForm} onSubmit={saveEdit}>
                            <div className={styles.formGroup}>
                                <label>Título</label>
                                <input
                                    className={styles.formInput}
                                    value={editingTx.title}
                                    onChange={e => setEditingTx({ ...editingTx, title: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Valor (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className={styles.formInput}
                                    value={editingTx.amount}
                                    onChange={e => setEditingTx({ ...editingTx, amount: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Categoria</label>
                                <input
                                    className={styles.formInput}
                                    value={editingTx.category}
                                    onChange={e => setEditingTx({ ...editingTx, category: e.target.value })}
                                />
                            </div>
                            <div className={styles.confirmActions} style={{ marginTop: '1rem' }}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setEditingTx(null)}>Cancelar</button>
                                <button type="submit" className={styles.dangerBtn} style={{ background: 'var(--primary-color)' }}>Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

