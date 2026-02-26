
"use client";
import { useState } from 'react';
import styles from '../UserLists.module.css';

export default function GoalsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<any>(null);
    const [depositAmount, setDepositAmount] = useState('');

    const [goals, setGoals] = useState([
        { id: 1, title: "Comprar livro", current: 13.00, target: 50.00 },
        { id: 2, title: "Guardar 500 reais", current: 450.00, target: 500.00 },
        { id: 3, title: "Economizar dinheiro do almoço", current: 13.00, target: 75.00 },
        { id: 4, title: "Comprar livro", current: 13.00, target: 50.00 },
        { id: 5, title: "Guardar 500 reais", current: 450.00, target: 500.00 },
        { id: 6, title: "Economizar dinheiro do almoço", current: 13.00, target: 75.00 },
    ]);

    const [newGoal, setNewGoal] = useState({ title: '', target: '' });

    const handleAddGoal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGoal.title || !newGoal.target) return;

        const goal = {
            id: goals.length + 1,
            title: newGoal.title,
            current: 0,
            target: parseFloat(newGoal.target)
        };

        setGoals([...goals, goal]);
        setNewGoal({ title: '', target: '' });
        setIsModalOpen(false);
    };

    const openDepositModal = (goal: any) => {
        setSelectedGoal(goal);
        setIsDepositModalOpen(true);
    };

    const handleDeposit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!depositAmount || !selectedGoal) return;

        const amount = parseFloat(depositAmount);
        setGoals(goals.map(g =>
            g.id === selectedGoal.id
                ? { ...g, current: Math.min(g.current + amount, g.target) }
                : g
        ));

        setDepositAmount('');
        setIsDepositModalOpen(false);
        setSelectedGoal(null);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerTitle}>METAS</div>

            <div className={styles.listContainer}>
                <div className={styles.scrollableList}>
                    {goals.map((goal) => (
                        <div key={goal.id} className={styles.card}>
                            <div className={styles.cardInfo} style={{ flex: 1 }}>
                                <div className={styles.cardTitle}>{goal.title}</div>
                                <div className={styles.cardProgress} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '0.5rem' }}>
                                    <div>
                                        Alcançado:<br />
                                        <span style={{ fontWeight: 700 }}>R$ {goal.current.toFixed(2).replace('.', ',')}</span>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '8px' }}>
                                        Meta: R$ {goal.target.toFixed(2).replace('.', ',')}
                                    </div>
                                </div>
                                {/* Progress Bar Visual */}
                                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '0.8rem', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${(goal.current / goal.target) * 100}%`,
                                        height: '100%',
                                        background: 'var(--primary-color)',
                                        borderRadius: '4px'
                                    }} />
                                </div>
                            </div>
                            <button
                                className={styles.depositBtn}
                                onClick={() => openDepositModal(goal)}
                                title="Abastecer meta"
                            >
                                Guardar
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    className={styles.addBtn}
                    onClick={() => setIsModalOpen(true)}
                >
                    Adicionar metas
                </button>
            </div>

            {/* Modal de Adicionar Meta */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.modalTitle}>Nova Meta</h3>

                        <form onSubmit={handleAddGoal}>
                            <div className={styles.formGroup}>
                                <label>Nome da Meta</label>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    placeholder="Ex: Viagem, Notebook..."
                                    value={newGoal.title}
                                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Valor Alvo (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className={styles.formInput}
                                    placeholder="0,00"
                                    value={newGoal.target}
                                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                                    required
                                />
                            </div>

                            <div className={styles.modalFooter}>
                                <button
                                    type="button"
                                    className={styles.cancelBtn}
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.confirmBtn}>
                                    Salvar Meta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Abastecer Meta */}
            {isDepositModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsDepositModalOpen(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <h3 className={styles.modalTitle}>Abastecer Meta</h3>
                        <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                            Quanto deseja adicionar para <strong>{selectedGoal?.title}</strong>?
                        </p>

                        <form onSubmit={handleDeposit}>
                            <div className={styles.formGroup}>
                                <label>Valor a adicionar (R$)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className={styles.formInput}
                                    placeholder="0,00"
                                    value={depositAmount}
                                    onChange={(e) => setDepositAmount(e.target.value)}
                                    autoFocus
                                    required
                                />
                            </div>

                            <div className={styles.modalFooter}>
                                <button
                                    type="button"
                                    className={styles.cancelBtn}
                                    onClick={() => setIsDepositModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.confirmBtn} style={{ background: '#fbbf24', color: '#000' }}>
                                    Confirmar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

