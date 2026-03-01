
"use client";

import Link from 'next/link';
import styles from './Finances.module.css';

export default function FinancesPage() {
    // Valores mockados só para visualização da dashboard
    const totalIncome = 3500.0;
    const totalExpenses = 450.0;
    const goalsAmount = 750.0;
    const balance = 1250.0;

    return (
        <div className={styles.financesContainer}>
            <h1 className={styles.pageTitle}>Suas Finanças</h1>
            <p className={styles.balanceText}>Seu saldo está (R$ {balance.toFixed(2).replace('.', ',')})</p>

            <div className={styles.topRow}>
                <div className={styles.chartContainer}>
                    <svg
                        viewBox="0 0 100 100"
                        className="pie-chart"
                        style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
                    >
                        {/* Slice 1: Gastos (0 to 120 deg) */}
                        <path
                            d="M 50 50 L 100 50 A 50 50 0 0 1 25 93.3 Z"
                            fill="#cbd5e1"
                            stroke="var(--dark-bg)"
                            strokeWidth="1"
                        />

                        {/* Slice 2: Metas (120 to 240 deg) */}
                        <path
                            d="M 50 50 L 25 93.3 A 50 50 0 0 1 25 6.7 Z"
                            fill="#94a3b8"
                            stroke="var(--dark-bg)"
                            strokeWidth="1"
                        />

                        {/* Slice 3: Ganhos (240 to 360 deg) */}
                        <path
                            d="M 50 50 L 25 6.7 A 50 50 0 0 1 100 50 Z"
                            fill="#e2e8f0"
                            stroke="var(--dark-bg)"
                            strokeWidth="1"
                        />
                    </svg>

                    <div className={styles.chartLabels}>
                        <span className={`${styles.label} ${styles.labelGastos}`}>Gastos</span>
                        <span className={`${styles.label} ${styles.labelMetas}`}>Metas</span>
                        <span className={`${styles.label} ${styles.labelGanhos}`}>Ganhos</span>
                    </div>
                </div>

                <section className={styles.overviewSummary}>
                    <div className={styles.overviewCard}>
                        <span className={styles.overviewLabel}>Ganhos no mês</span>
                        <span className={styles.overviewValue}>R$ {totalIncome.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className={styles.overviewCard}>
                        <span className={styles.overviewLabel}>Gastos no mês</span>
                        <span className={styles.overviewValue}>R$ {totalExpenses.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className={styles.overviewCard}>
                        <span className={styles.overviewLabel}>Reservado para metas</span>
                        <span className={styles.overviewValue}>R$ {goalsAmount.toFixed(2).replace('.', ',')}</span>
                    </div>
                </section>
            </div>

            <Link href="/finances/records" className={styles.detailsBtn}>
                Ver detalhado
            </Link>
        </div>
    );
}
