
"use client";

import styles from '../UserLists.module.css';

export default function MissionsPage() {
    const missions = [
        { id: 1, title: "Gabarite 3 quizzes perfeitos", current: 1, total: 3, reward: "Recompensa: XP" },
        { id: 2, title: "Faça aulas por 5 dias seguidos", current: 1, total: 5, reward: "Recompensa: Moedas" },
        { id: 3, title: "Acumule 20 moedas", current: 1, total: 20, reward: "Recompensa: Vidas" },
        { id: 4, title: "Cumpra 5 missões", current: 1, total: 5, reward: "Recompensa: Conquista" },
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerTitle}>MISSÕES</div>

            <div className={styles.listContainer}>
                <div className={styles.scrollableList}>
                    {missions.map((mission) => (
                        <div key={mission.id} className={styles.card}>
                            <div className={styles.cardInfo} style={{ flex: 1 }}>
                                <div className={styles.cardTitle}>{mission.title}</div>
                                <div className={styles.cardProgress} style={{ marginTop: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                                        <span>Progresso</span>
                                        <span style={{ fontWeight: 700, color: 'var(--primary-color)' }}>
                                            {mission.current} / {mission.total}
                                        </span>
                                    </div>
                                    {/* Progress Bar Visual */}
                                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${(mission.current / mission.total) * 100}%`,
                                            height: '100%',
                                            background: 'var(--primary-color)',
                                            borderRadius: '4px'
                                        }} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cardReward} style={{ marginLeft: '1.5rem' }}>{mission.reward}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
