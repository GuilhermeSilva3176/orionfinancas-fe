'use client';

import { Footer } from '@/components/layout/footer/Footer';
import { Header } from '@/components/layout/header/Header';
import styles from './UserLayout.module.css';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { href: '/finances', label: '💼 Finanças' },
        { href: '/learning', label: '📚 Aprender' },
        { href: '/missions', label: '🎯 Missões' },
        { href: '/goals', label: '🏆 Metas' },
        { href: '/shop', label: '🛒 Loja' },
    ];

    return (
        <div className={styles.userWrapper}>
            <Header variant="logged" />


            <div className={styles.appLayout}>
                <aside className={styles.sidebarLeft}>
                    <nav className={styles.sidebarNav}>
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${pathname === item.href || pathname.startsWith(item.href + '/')
                                        ? styles.active
                                        : ''
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
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