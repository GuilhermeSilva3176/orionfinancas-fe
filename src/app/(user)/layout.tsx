import { Footer } from '@/components/layout/footer/Footer';
import { Header } from '@/components/layout/header/Header';
import styles from './UserLayout.module.css';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.userWrapper}>
            <Header variant="logged" />


            <div className={styles.appLayout}>
                <aside className={styles.sidebarLeft}>
                    <nav className={styles.sidebarNav}>
                        <a href="/finances" className={styles.navItem}>💼 Finanças</a>
                        <a href="/learning" className={`${styles.navItem} ${styles.active}`}>📚 Aprender</a>
                        <a href="/missions" className={styles.navItem}>🎯 Missões</a>
                        <a href="/goals" className={styles.navItem}>🏆 Metas</a>
                        <a href="/shop" className={styles.navItem}>🛒 Loja</a>
                    </nav>
                </aside>

                <main className={styles.mainContent}>{children}</main>

                <aside className={styles.sidebarRight}>
                    <div className={styles.gamificationPanel}>
                        <div className={styles.statItem}>
                            <span className={styles.statIcon}>🔥</span>
                            <div className={styles.statInfo}>
                                <span className={styles.statLabel}>Ofensiva</span>
                                <span className={styles.statValue}>5 dias</span>
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statIcon}>❤️</span>
                            <div className={styles.statInfo}>
                                <span className={styles.statLabel}>Vidas</span>
                                <span className={styles.statValue}>5/5</span>
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statIcon}>✨</span>
                            <div className={styles.statInfo}>
                                <span className={styles.statLabel}>XP</span>
                                <span className={styles.statValue}>1250</span>
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statIcon}>🪙</span>
                            <div className={styles.statInfo}>
                                <span className={styles.statLabel}>Moedas</span>
                                <span className={styles.statValue}>340</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}