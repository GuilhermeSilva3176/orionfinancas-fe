
"use client";

import Link from 'next/link';
import styles from './Profile.module.css';

export default function ProfilePage() {
    return (
        <div className={styles.profileContainer}>

            {/* Header Info */}
            <div className={styles.userHeader}>
                <div className={styles.avatar}></div>
                <div className={styles.userInfo}>
                    <h1 className={styles.userName}>Nome do usuário</h1>
                    <div className={styles.userActions}>
                        <Link href="/settings" className={styles.actionBtn}>Configurações</Link>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.toggleTabs}>
                <button className={`${styles.tabBtn} ${styles.active}`}>Lições</button>
                <Link href="/goals"><button className={styles.tabBtn}>Metas</button></Link>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>

                {/* Status Column */}
                <div className={styles.statsCard}>
                    <h3 className={styles.cardTitle}>Status</h3>
                    <div className={styles.statList}>
                        <div className={styles.statRow}>
                            <span>Evolução de XP (semanal)</span>
                            <span style={{ color: 'var(--primary-color)', fontWeight: 700 }}>+450 XP</span>
                        </div>
                        <div className={styles.statRow}>
                            <span>Lições concluídas</span>
                            <span>12</span>
                        </div>
                        <div className={styles.statRow}>
                            <span>Melhor desempenho</span>
                            <span>Módulo 1</span>
                        </div>
                        <div className={styles.statRow}>
                            <span>Mais tentativas</span>
                            <span>Módulo 2</span>
                        </div>
                    </div>
                    <button className={styles.detailBtn}>Ver detalhadamente</button>
                </div>

                {/* Right Column: Graph & Suggestion */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Graph */}
                    <div className={styles.statsCard}>
                        <h3 className={styles.cardTitle} style={{ fontSize: '0.9rem' }}>Lições feitas na última semana</h3>
                        <div className={styles.graphPlaceholder}>
                            {/* Fake Bars */}
                            <div className={styles.bar} style={{ height: '30%' }}></div>
                            <div className={styles.bar} style={{ height: '50%' }}></div>
                            <div className={styles.bar} style={{ height: '20%' }}></div>
                            <div className={styles.bar} style={{ height: '70%' }}></div>
                            <div className={styles.bar} style={{ height: '40%' }}></div>
                            <div className={styles.bar} style={{ height: '80%' }}></div>
                            <div className={styles.bar} style={{ height: '60%' }}></div>
                        </div>
                    </div>

                    {/* Suggested Lesson */}
                    <div className={`${styles.statsCard} ${styles.suggestedLesson}`}>
                        <h3 className={styles.cardTitle}>Aula sugerida:</h3>
                        <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Títulos públicos</p>
                        <button className={styles.goToLessonBtn}>Ir a aula</button>
                    </div>

                </div>

            </div>

            <Link href="/login" className={styles.logoutBtn}>
                Encerrar Sessão
            </Link>

        </div>
    );
}
