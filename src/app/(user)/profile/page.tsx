
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { User, Cat, Dog, Shield, Star, Zap, X } from 'lucide-react';
import styles from './Profile.module.css';
import { Coins, Flame, Clock } from 'lucide-react';

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
    ],
    allGoals: [
        { title: 'Economizar R$ 500', progress: 100 },
        { title: 'Investir em Tesouro Direto', progress: 100 },
        { title: 'Fundo de Emergência', progress: 60 },
        { title: 'Comprar Notebook', progress: 30 },
        { title: 'Viagem de Férias', progress: 10 },
        { title: 'Aposentadoria precoce', progress: 5 },
        { title: 'Trocar de Carro', progress: 45 },
        { title: 'Curso de Especialização', progress: 85 },
        { title: 'Montar Setup Gamer', progress: 15 },
        { title: 'Reforma da Casa', progress: 0 },
        { title: 'Fundo para Emergência 2', progress: 20 },
        { title: 'Viagem Japão', progress: 5 },
        { title: 'Aposentadoria 2', progress: 10 },
    ],
    allMissions: [
        { title: 'Gabarite 3 quizzes perfeitos', reward: '10 moedas', completed: true },
        { title: 'Acumule 20 moedas', reward: 'XP Bônus', completed: true },
        { title: 'Cumpra 5 missões', reward: 'Badge', completed: true },
        { title: 'Estude por 2 horas', reward: '5 moedas', completed: false },
        { title: 'Complete um módulo', reward: 'XP extra', completed: false },
        { title: 'Convide um amigo', reward: '15 moedas', completed: false },
        { title: 'Acesse o app por 7 dias', reward: 'Vidas extra', completed: true },
        { title: 'Faça 10 exercícios', reward: 'XP Bônus', completed: true },
        { title: 'Personalize seu perfil', reward: '5 moedas', completed: true },
        { title: 'Alcance o rank Prata', reward: 'Badge Especial', completed: false },
        { title: 'Deposite em uma meta', reward: '10 moedas', completed: false },
        { title: 'Missão Bônus 1', reward: 'XP', completed: true },
        { title: 'Missão Bônus 2', reward: 'Coins', completed: false },
        { title: 'Missão Bônus 3', reward: 'Hearts', completed: false },
    ],
    accountDetails: {
        memberSince: "Janeiro 2024",
        xpWeekly: 450,
        lessonsCompleted: 12,
        bestPerformance: "Módulo 1",
        toughestModule: "Módulo 2",
        totalCoinsEarned: 2450,
        currentStreak: 15,
        rank: "Investidor Prata",
        totalTimeSpent: "42 horas"
    }
};

export default function ProfilePage() {
    // Forcing state update from MOCK_USER_DATA (Refresh)
    const [userData] = useState(MOCK_USER_DATA);
    const [activeTab, setActiveTab] = useState<'lessons' | 'goals'>('lessons');
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
    const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
    const [isMissionsModalOpen, setIsMissionsModalOpen] = useState(false);
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
                                    <span className={styles.xpText}>+{MOCK_USER_DATA.accountDetails.xpWeekly} XP</span>
                                </div>
                                <div className={styles.statRow}>
                                    <span>Lições concluídas</span>
                                    <span>{MOCK_USER_DATA.accountDetails.lessonsCompleted}</span>
                                </div>
                                <div className={styles.statRow}>
                                    <span>Melhor desempenho</span>
                                    <span>{MOCK_USER_DATA.accountDetails.bestPerformance}</span>
                                </div>
                                <div className={styles.statRow}>
                                    <span>Mais tentativas</span>
                                    <span>{MOCK_USER_DATA.accountDetails.toughestModule}</span>
                                </div>
                            </div>
                            <button
                                className={styles.detailBtn}
                                onClick={() => setIsStatsModalOpen(true)}
                            >
                                Ver detalhadamente
                            </button>
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
                            <button
                                className={styles.detailBtn}
                                onClick={() => setIsGoalsModalOpen(true)}
                            >
                                Ver todas metas
                            </button>
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
                            <button
                                className={styles.detailBtn}
                                onClick={() => setIsMissionsModalOpen(true)}
                            >
                                Ver todas missões
                            </button>
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
            {/* Detailed Stats Modal */}
            {isStatsModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsStatsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Detalhes da Conta</h2>
                            <button className={styles.closeModal} onClick={() => setIsStatsModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className={styles.statsModalBody}>
                            <div className={styles.modalStatRow}>
                                <span>Membro desde:</span>
                                <span>{MOCK_USER_DATA.accountDetails.memberSince}</span>
                            </div>
                            <div className={styles.modalStatRow}>
                                <span>Evolução de XP (semanal):</span>
                                <span className={styles.xpText}>+{MOCK_USER_DATA.accountDetails.xpWeekly} XP</span>
                            </div>
                            <div className={styles.modalStatRow}>
                                <span>Lições concluídas:</span>
                                <span>{MOCK_USER_DATA.accountDetails.lessonsCompleted}</span>
                            </div>
                            <div className={styles.modalStatRow}>
                                <span>Melhor desempenho:</span>
                                <span>{MOCK_USER_DATA.accountDetails.bestPerformance}</span>
                            </div>
                            <div className={styles.modalStatRow}>
                                <span>Mais tentativas:</span>
                                <span>{MOCK_USER_DATA.accountDetails.toughestModule}</span>
                            </div>
                            <div className={styles.modalStatRow}>
                                <span>Total de moedas ganhas:</span>
                                <span><Coins size={18} /> {MOCK_USER_DATA.accountDetails.totalCoinsEarned}</span>
                            </div>
                            <div className={styles.modalStatRow}>
                                <span>Ofensiva atual:</span>
                                <span><Flame size={18} /> {MOCK_USER_DATA.accountDetails.currentStreak} dias</span>
                            </div>
                            <div className={styles.modalStatRow}>
                                <span>Rank atual:</span>
                                <span className={styles.rankBadge}>{MOCK_USER_DATA.accountDetails.rank}</span>
                            </div>
                            <div className={styles.modalStatRow} style={{ borderBottom: 'none' }}>
                                <span>Tempo total de estudo:</span>
                                <span><Clock size={18} /> {MOCK_USER_DATA.accountDetails.totalTimeSpent}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* All Goals Modal */}
            {isGoalsModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsGoalsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Todas as Metas</h2>
                            <button className={styles.closeModal} onClick={() => setIsGoalsModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className={styles.statsModalBody}>
                            {MOCK_USER_DATA.allGoals.map((goal, index) => (
                                <div key={index} className={styles.goalRow} style={{ marginBottom: '1rem' }}>
                                    <div className={styles.goalInfo}>
                                        <span style={{ fontWeight: 600 }}>{goal.title}</span>
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
                        <div className={styles.modalFooterNote}>
                            <Link href="/goals" className={styles.shopLink}>Ir para página de Metas</Link>
                        </div>
                    </div>
                </div>
            )}

            {/* All Missions Modal */}
            {isMissionsModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsMissionsModalOpen(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>Histórico de Missões</h2>
                            <button className={styles.closeModal} onClick={() => setIsMissionsModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className={styles.statsModalBody}>
                            <div className={styles.missionList}>
                                {MOCK_USER_DATA.allMissions.map((mission, index) => (
                                    <div key={index} className={styles.missionItem} style={{ opacity: mission.completed ? 1 : 0.6 }}>
                                        <div className={styles.missionCheck} style={{ background: mission.completed ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)' }}>
                                            {mission.completed ? '✓' : '○'}
                                        </div>
                                        <div className={styles.missionDetails}>
                                            <p className={styles.missionText}>{mission.title}</p>
                                            <span className={styles.missionReward}>{mission.reward}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.modalFooterNote}>
                            <Link href="/missions" className={styles.shopLink}>Ir para página de Missões</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

