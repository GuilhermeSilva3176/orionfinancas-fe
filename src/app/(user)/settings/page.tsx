
"use client";

import { useState } from 'react';
import styles from './Settings.module.css';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className={styles.settingsContainer}>
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
                                <button type="submit" className={styles.saveBtn}>Salvar Alterações</button>
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
                                    <button className={styles.secondaryBtn}>Mudar Plano</button>
                                    <button className={styles.dangerBtn}>Cancelar Assinatura</button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
