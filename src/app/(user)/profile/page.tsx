
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { User, Cat, Dog, Shield, Star, Zap, X } from 'lucide-react';
import styles from './Profile.module.css';

const AVAILABLE_AVATARS = [
    { id: 'user', icon: User, label: 'Padrão' },
    { id: 'cat', icon: Cat, label: 'Gato' },
    { id: 'dog', icon: Dog, label: 'Cachorro' },
    { id: 'shield', icon: Shield, label: 'Escudo' },
    { id: 'star', icon: Star, label: 'Estrela' },
    { id: 'zap', icon: Zap, label: 'Raio' },
];

// Mock data for the profile
const MOCK_USER_DATA = {
    name: "Guilherme Silva",
    currentAvatar: "/images/avatar.png",
    xpWeekly: 450,
    lessonsCompleted: 12,
    bestPerformance: "Módulo 1",
    toughestModule: "Módulo 2",
    suggestedLesson: {
        title: "Títulos públicos",
        link: "/lessons/titulos-publicos"
    },
    weeklyLessons: [
        { day: 'SEG', count: 3 },
        { day: 'TER', count: 5 },
        { day: 'QUA', count: 2 },
        { day: 'QUI', count: 7 },
        { day: 'SEX', count: 4 },
        { day: 'SAB', count: 8 },
        { day: 'DOM', count: 6 },
    ],
    // Collection of icons the user ALREADY BOUGHT/OWNED
    ownedAvatars: [
        { id: 1, img: '/images/avatar.png', label: 'Personagem' },
        { id: 2, img: '/images/avatar1.png', label: 'Especial 1' },
        { id: 3, img: '/images/avatar2.png', label: 'Especial 2' },
        { id: 4, img: '/images/avatar3.png', label: 'Especial 3' },
    ],
    recentGoals: [
        { title: 'Economizar R$ 500', progress: 100 },
        { title: 'Investir em Tesouro Direto', progress: 100 },
        { title: 'Fundo de Emergência', progress: 60 },
    ],
    recentMissions: [
        { title: 'Gabarite 3 quizzes perfeitos', reward: '10 moedas' },
        { title: 'Acumule 20 moedas', reward: 'XP Bônus' },
        { title: 'Cumpra 5 missões', reward: 'Badge' },
    ]
};

export default function ProfilePage() {
    const [userData] = useState(MOCK_USER_DATA);
    const [activeTab, setActiveTab] = useState<'lessons' | 'goals'>('lessons');
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [currentAvatarImg, setCurrentAvatarImg] = useState(userData.currentAvatar);

    // Calculate max height for bars
    const maxLessons = Math.max(...userData.weeklyLessons.map(d => d.count));

    return (
        <div className={styles.profileContainer}>

            {/* Header Info */}
            <div className={styles.userHeader}>
                <div
                    className={styles.avatar}
                    onClick={() => setIsAvatarModalOpen(true)}
                    title="Mudar ícone de perfil"
                >
                    <img src={currentAvatarImg} alt="Perfil" className={styles.avatarImg} />
                    <div className={styles.avatarOverlay}>
                        <span>Mudar</span>
                    </div>
                </div>
                <div className={styles.userInfo}>
                    <h1 className={styles.userName}>{userData.name}</h1>
                    <div className={styles.userActions}>
                        <Link href="/settings" className={styles.actionBtn}>Configurações</Link>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.toggleTabs}>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'lessons' ? styles.active : ''}`}
                    onClick={() => setActiveTab('lessons')}
                >
                    Lições
                </button>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'goals' ? styles.active : ''}`}
                    onClick={() => setActiveTab('goals')}
                >
                    Metas / Missões
                </button>
            </div>

            {/* Content Area Rendering */}
            <div className={styles.statsGrid}>
                {activeTab === 'lessons' ? (
                    <>
                        {/* Status Column */}
                        <div className={styles.statsCard}>
                            <h3 className={styles.cardTitle}>Status</h3>
                            <div className={styles.statList}>
                                <div className={styles.statRow}>
                                    <span>Evolução de XP (semanal)</span>
                                    <span className={styles.xpText}>+{userData.xpWeekly} XP</span>
                                </div>
                                <div className={styles.statRow}>
                                    <span>Lições concluídas</span>
                                    <span>{userData.lessonsCompleted}</span>
                                </div>
                                <div className={styles.statRow}>
                                    <span>Melhor desempenho</span>
                                    <span>{userData.bestPerformance}</span>
                                </div>
                                <div className={styles.statRow}>
                                    <span>Mais tentativas</span>
                                    <span>{userData.toughestModule}</span>
                                </div>
                            </div>
                            <button className={styles.detailBtn}>Ver detalhadamente</button>
                        </div>

                        {/* Right Column: Graph & Suggestion */}
                        <div className={styles.graphContainer}>

                            {/* Graph */}
                            <div className={styles.statsCard}>
                                <h3 className={styles.cardTitle} style={{ fontSize: '0.9rem' }}>Lições feitas na última semana</h3>
                                <div className={styles.chartWrapper}>
                                    <div className={styles.graphArea}>
                                        {userData.weeklyLessons.map((item, index) => (
                                            <div key={index} className={styles.barColumn}>
                                                <div
                                                    className={styles.bar}
                                                    style={{ height: `${(item.count / maxLessons) * 100}%` }}
                                                    data-value={item.count}
                                                >
                                                    <span className={styles.tooltip}>{item.count} lições</span>
                                                </div>
                                                <span className={styles.dayLabel}>{item.day}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Suggested Lesson */}
                            <div className={`${styles.statsCard} ${styles.suggestedLesson}`}>
                                <h3 className={styles.cardTitle}>Aula sugerida:</h3>
                                <p className={styles.suggestedTitle}>{userData.suggestedLesson.title}</p>
                                <Link href={userData.suggestedLesson.link} className={styles.goToLessonBtn}>
                                    Ir a aula
                                </Link>
                            </div>

                        </div>
                    </>
                ) : (
                    <>
                        {/* Metas Column */}
                        <div className={styles.statsCard}>
                            <h3 className={styles.cardTitle}>Metas alcançadas recentemente</h3>
                            <div className={styles.statList}>
                                {userData.recentGoals.map((goal, index) => (
                                    <div key={index} className={styles.goalRow}>
                                        <div className={styles.goalInfo}>
                                            <span>{goal.title}</span>
                                            <span className={styles.goalPercentage}>{goal.progress}%</span>
                                        </div>
                                        <div className={styles.progressBar}>
                                            <div
                                                className={styles.progressFill}
                                                style={{ width: `${goal.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className={styles.detailBtn}>Ver todas metas</button>
                        </div>

                        {/* Missões Column */}
                        <div className={styles.statsCard}>
                            <h3 className={styles.cardTitle}>Missões feitas recentemente</h3>
                            <div className={styles.missionList}>
                                {userData.recentMissions.map((mission, index) => (
                                    <div key={index} className={styles.missionItem}>
                                        <div className={styles.missionCheck}>✓</div>
                                        <div className={styles.missionDetails}>
                                            <p className={styles.missionText}>{mission.title}</p>
                                            <span className={styles.missionReward}>{mission.reward}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className={styles.detailBtn}>Ver todas missões</button>
                        </div>
                    </>
                )}
            </div>

            {/* Avatar Selection Modal */}
            {isAvatarModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsAvatarModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Escolha seu Ícone</h2>
                            <button
                                className={styles.closeModal}
                                onClick={() => setIsAvatarModalOpen(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <p className={styles.modalSub}>Sua coleção de ícones comprados na loja:</p>

                        <div className={styles.avatarGrid}>
                            {userData.ownedAvatars.map((avatar) => {
                                return (
                                    <div
                                        key={avatar.id}
                                        className={`${styles.avatarOption} ${currentAvatarImg === avatar.img ? styles.selected : ''}`}
                                        onClick={() => {
                                            setCurrentAvatarImg(avatar.img);
                                            setIsAvatarModalOpen(false);
                                        }}
                                    >
                                        <div className={styles.optionCircle}>
                                            <img src={avatar.img} alt={avatar.label} className={styles.optionImg} />
                                        </div>
                                        <span>{avatar.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.modalFooterNote}>
                            <Link href="/shop" className={styles.shopLink}>
                                Ir para a loja comprar novos ícones
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

