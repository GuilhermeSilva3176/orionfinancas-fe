
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Trash2, X, AlertTriangle } from 'lucide-react';
import styles from './Settings.module.css';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

    const handleDeleteAccount = () => {
        // Lógica de exclusão aqui
        alert("Conta excluída com sucesso.");
        window.location.href = '/';
    };

    return (
        <div className={styles.settingsContainer}>
            <div className={styles.headerActions}>
                <Link href="/profile" className={styles.backBtn}>
                    <ArrowLeft size={16} />
                    Voltar
                </Link>
            </div>

            <h1 className={styles.pageTitle}>Configurações</h1>

            <div className={styles.settingsLayout}>
                <aside className={styles.settingsNav}>
                    <button
                        className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Perfil
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'security' ? styles.active : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        Segurança
                    </button>
                    <button
                        className={`${styles.navItem} ${activeTab === 'subscription' ? styles.active : ''}`}
                        onClick={() => setActiveTab('subscription')}
                    >
                        Assinatura
                    </button>
                </aside>

                <main className={styles.settingsContent}>
                    {activeTab === 'profile' && (
                        <div className={styles.card}>
                            <h2>Informações do Perfil</h2>
                            <form className={styles.form}>
                                <div className={styles.field}>
                                    <label>Nome Completo</label>
                                    <input type="text" defaultValue="Guilherme Cunha" />
                                </div>
                                <div className={styles.field}>
                                    <label>Email</label>
                                    <input type="email" defaultValue="guilherme@exemplo.com" />
                                </div>
                                <div className={styles.field}>
                                    <label>Bio</label>
                                    <textarea defaultValue="Estudante de Sistemas de Informação focado em educação financeira." />
                                </div>
                                <div className={styles.formFooter}>
                                    <button type="submit" className={styles.saveBtn}>Salvar Alterações</button>

                                    <button
                                        type="button"
                                        className={styles.btnDeleteInline}
                                        onClick={() => setIsDeleteModalOpen(true)}
                                    >
                                        <Trash2 size={16} />
                                        Excluir minha conta
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className={styles.card}>
                            <h2>Segurança</h2>
                            <form className={styles.form}>
                                <div className={styles.field}>
                                    <label>Senha Atual</label>
                                    <input type="password" placeholder="••••••••" />
                                </div>
                                <div className={styles.field}>
                                    <label>Nova Senha</label>
                                    <input type="password" placeholder="••••••••" />
                                </div>
                                <div className={styles.field}>
                                    <label>Confirmar Nova Senha</label>
                                    <input type="password" placeholder="••••••••" />
                                </div>
                                <button type="submit" className={styles.saveBtn}>Atualizar Senha</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'subscription' && (
                        <div className={styles.card}>
                            <h2>Detalhes da Assinatura</h2>
                            <div className={styles.planInfo}>
                                <div className={styles.planHeader}>
                                    <span className={styles.planBadge}>PLANO PRO</span>
                                    <span className={styles.planPrice}>R$ 29,90/mês</span>
                                </div>
                                <p>Sua assinatura está ativa até 14/03/2026.</p>
                                <div className={styles.planActions}>
                                    <button
                                        className={styles.secondaryBtn}
                                        onClick={() => setIsPlanModalOpen(true)}
                                    >
                                        Mudar Plano
                                    </button>
                                    <button className={styles.dangerBtn}>Cancelar Assinatura</button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Change Plan Modal */}
            {isPlanModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsPlanModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Mudar para Plano Anual</h2>
                            <button className={styles.closeModal} onClick={() => setIsPlanModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <p className={styles.modalSub}>Economize mais de 20% mudando para o pagamento anual!</p>

                            <div className={styles.premiumPlanCard}>
                                <div className={styles.planItemHeader}>
                                    <span className={styles.planItemTitle}>Plano Anual</span>
                                    <span className={styles.planItemPrice}>R$ 289,90/ano</span>
                                </div>
                                <span className={styles.planSavings}>Equivale a R$ 24,15 por mês</span>

                                <ul className={styles.planFeatures}>
                                    <li><span className={styles.featureCheck}>✓</span> Vidas ilimitadas</li>
                                    <li><span className={styles.featureCheck}>✓</span> Sem anúncios</li>
                                    <li><span className={styles.featureCheck}>✓</span> Cursos exclusivos de investimento</li>
                                </ul>
                            </div>

                            <button className={styles.upgradeBtn} onClick={() => {
                                alert("Upgrade solicitado para o Plano Anual!");
                                setIsPlanModalOpen(false);
                            }}>
                                Confirmar Upgrade Anual
                            </button>
                        </div>
                        <div className={styles.modalFooterNote}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                O valor será cobrado imediatamente no seu cartão padrão.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Account Modal */}
            {isDeleteModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsDeleteModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 style={{ color: '#ff6464' }}>Excluir Conta</h2>
                            <button className={styles.closeModal} onClick={() => setIsDeleteModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.warningIcon}>
                                <AlertTriangle size={48} color="#ff6464" />
                            </div>
                            <p className={styles.confirmText}>
                                Tem certeza que deseja <strong>excluir permanentemente</strong> sua conta?<br />
                                Todos os seus dados, lições e conquistas serão perdidos para sempre.
                            </p>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.secondaryBtn} onClick={() => setIsDeleteModalOpen(false)}>
                                Cancelar
                            </button>
                            <button className={styles.deleteConfirmBtn} onClick={handleDeleteAccount}>
                                Excluir Permanentemente
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
