
"use client";
import { useState } from 'react';
import styles from '../UserLists.module.css';

export default function GoalsPage() {
    const [goals, setGoals] = useState([
        { id: 1, title: "Comprar livro", current: 13.00, target: 50.00, urgency: 'medium', description: 'Para estudar investimentos.', date: '2026-05-20' },
        { id: 2, title: "Guardar 500 reais", current: 450.00, target: 500.00, urgency: 'high', description: 'Meta de economia mensal.', date: '2026-04-10' },
        { id: 3, title: "Economizar dinheiro do almoço", current: 13.00, target: 75.00, urgency: 'low', description: 'Reduzir gastos diários.', date: '' },
    ]);

    const [currentBalance, setCurrentBalance] = useState(1500.00);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [goalToDelete, setGoalToDelete] = useState<any>(null);

    const [formData, setFormData] = useState({
        title: '',
        current: '',
        target: '',
        date: '',
        description: '',
        urgency: 'medium',
    });

    const openCreateModal = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({
            title: '',
            current: '0',
            target: '',
            date: '',
            description: '',
            urgency: 'medium',
        });
        setIsModalOpen(true);
    };

    const openEditModal = (goal: any) => {
        setIsEditing(true);
        setEditingId(goal.id);
        setFormData({
            title: goal.title,
            current: goal.current.toString(),
            target: goal.target.toString(),
            date: goal.date || '',
            description: goal.description || '',
            urgency: goal.urgency || 'medium',
        });
        setIsModalOpen(true);
    };

    const handleSaveGoal = (e: React.FormEvent) => {
        e.preventDefault();
        const targetVal = parseFloat(formData.target) || 0;
        const currentVal = parseFloat(formData.current) || 0;

        if (isEditing && editingId !== null) {
            const oldGoal = goals.find(g => g.id === editingId);
            if (oldGoal) {
                const diff = currentVal - oldGoal.current;
                setCurrentBalance(prev => prev - diff);

                setGoals(goals.map(g => g.id === editingId ? {
                    ...g,
                    title: formData.title,
                    current: currentVal,
                    target: targetVal,
                    date: formData.date,
                    description: formData.description,
                    urgency: formData.urgency,
                } : g));
            }
        } else {
            setCurrentBalance(prev => prev - currentVal);
            const newGoalItem = {
                id: Date.now(),
                title: formData.title,
                current: currentVal,
                target: targetVal,
                date: formData.date,
                description: formData.description,
                urgency: formData.urgency,
            };
            setGoals([...goals, newGoalItem]);
        }
        setIsModalOpen(false);
    };

    const openDeleteModal = (goal: any) => {
        setGoalToDelete(goal);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteGoal = () => {
        if (goalToDelete) {
            setCurrentBalance(prev => prev + goalToDelete.current);
            setGoals(goals.filter(g => g.id !== goalToDelete.id));
            setIsDeleteModalOpen(false);
            setGoalToDelete(null);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerTitle}>METAS</div>

            <div className={styles.listContainer}>
                <div className={styles.scrollableList}>
                    {goals.map((goal) => (
                        <div key={goal.id} className={styles.card}>
                            <div className={styles.cardInfo} style={{ flex: 1, paddingRight: '0.5rem' }}>
                                <div className={styles.cardTitle}>{goal.title}</div>
                                <div className={styles.cardProgress} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '0.6rem' }}>
                                    <div>
                                        Alcançado:<br />
                                        <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary-color)' }}>
                                            R$ {goal.current.toFixed(2).replace('.', ',')}
                                        </span>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.06)', padding: '0.5rem 1.1rem', borderRadius: '10px', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                        Meta: R$ {goal.target.toFixed(2).replace('.', ',')}
                                    </div>
                                </div>
                                <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', marginTop: '1rem', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                                        height: '100%',
                                        background: 'linear-gradient(to right, var(--primary-color), #2dd4bf)',
                                        borderRadius: '6px'
                                    }} />
                                </div>
                            </div>
                            <div className={styles.cardActions}>
                                <div className={styles.iconActions}>
                                    <button
                                        className={styles.iconBtn}
                                        onClick={() => openDeleteModal(goal)}
                                        title="Excluir meta"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                                <button
                                    className={styles.depositBtn}
                                    onClick={() => openEditModal(goal)}
                                    title="Gerenciar meta"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button className={styles.addBtn} onClick={openCreateModal}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Adicionar metas
                </button>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.modalTitle}>{isEditing ? 'Gerenciar Meta' : 'Nova Meta'}</h3>

                        <div className={styles.goalModalHeaderRow}>
                            <div className={styles.balanceBox}>
                                <span className={styles.balanceLabel}>Saldo da conta</span>
                                <span className={styles.balanceValue}>R$ {currentBalance.toFixed(2).replace('.', ',')}</span>
                            </div>
                            <div className={styles.urgencyBox}>
                                <span className={styles.urgencyLabel}>Prioridade</span>
                                <div className={styles.urgencyOptions}>
                                    <button
                                        className={`${styles.urgencyPill} ${styles.urgencyLow} ${formData.urgency === 'low' ? styles.urgencySelected : ''}`}
                                        onClick={() => setFormData({ ...formData, urgency: 'low' })}
                                    >Baixa</button>
                                    <button
                                        className={`${styles.urgencyPill} ${styles.urgencyMedium} ${formData.urgency === 'medium' ? styles.urgencySelected : ''}`}
                                        onClick={() => setFormData({ ...formData, urgency: 'medium' })}
                                    >Média</button>
                                    <button
                                        className={`${styles.urgencyPill} ${styles.urgencyHigh} ${formData.urgency === 'high' ? styles.urgencySelected : ''}`}
                                        onClick={() => setFormData({ ...formData, urgency: 'high' })}
                                    >Alta</button>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSaveGoal}>
                            <div className={styles.formGroup}>
                                <label>Título da Meta</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    placeholder="Ex: Viagem de Férias"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Dinheiro reservado (R$)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={styles.formInput}
                                        style={{ color: 'var(--primary-color)', fontWeight: 700 }}
                                        value={formData.current}
                                        onChange={(e) => setFormData({ ...formData, current: e.target.value })}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Valor Alvo (R$)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={styles.formInput}
                                        value={formData.target}
                                        onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Data Limite</label>
                                    <input
                                        type="date"
                                        className={styles.formInput}
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div className={styles.formGroup} style={{ opacity: formData.target ? 1 : 0.5 }}>
                                    <label>Resumo de Progresso</label>
                                    <div className={styles.formInput} style={{ background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                                        {formData.target ? `${Math.round(((parseFloat(formData.current) || 0) / (parseFloat(formData.target) || 1)) * 100)}% concluído` : 'Defina o alvo'}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Descrição (opcional)</label>
                                <textarea
                                    className={styles.formInput}
                                    style={{ minHeight: '80px', resize: 'none' }}
                                    placeholder="Detalhes sobre sua meta..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className={styles.modalFooter}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                <button type="submit" className={styles.confirmBtn}>Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsDeleteModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
                        <div className={styles.deleteWarningIcon}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>
                        <h3 className={styles.modalTitle} style={{ color: '#ef4444' }}>Excluir Meta</h3>
                        <p className={styles.depositText} style={{ marginBottom: '2rem' }}>
                            Tem certeza que deseja excluir <strong>"{goalToDelete?.title}"</strong>?<br />
                            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>O dinheiro reservado voltará para seu saldo.</span>
                        </p>
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelBtn} onClick={() => setIsDeleteModalOpen(false)}>Manter Meta</button>
                            <button className={`${styles.confirmBtn} ${styles.deleteConfirmBtn}`} onClick={confirmDeleteGoal}>Sim, Excluir</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
