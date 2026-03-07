'use client';

import { useMemo, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend
} from 'recharts';
import styles from './AdminDashboard.module.css';

type DashboardView = 'resumo' | 'historico';

const historyData = [
  { month: 'Set', activeUsers: 860, newSignups: 74, reactivated: 18 },
  { month: 'Out', activeUsers: 910, newSignups: 82, reactivated: 22 },
  { month: 'Nov', activeUsers: 980, newSignups: 95, reactivated: 19 },
  { month: 'Dez', activeUsers: 1050, newSignups: 102, reactivated: 28 },
  { month: 'Jan', activeUsers: 1160, newSignups: 124, reactivated: 33 },
  { month: 'Fev', activeUsers: 1284, newSignups: 96, reactivated: 30 }
];

const statusDistribution = [
  { name: 'Ativos', value: 1284, color: '#2dd4bf' },
  { name: 'Pendentes', value: 96, color: '#f59e0b' },
  { name: 'Inativos', value: 214, color: '#ef4444' }
];

const recentAdminEvents = [
  {
    id: 1,
    title: 'Lote de validação concluído',
    details: '32 perfis revisados no onboarding',
    date: 'Hoje, 09:12',
    type: 'success'
  },
  {
    id: 2,
    title: 'Aumento de novos cadastros',
    details: 'Pico de +18% nas últimas 24h',
    date: 'Hoje, 07:40',
    type: 'info'
  },
  {
    id: 3,
    title: 'Alerta de tickets pendentes',
    details: '2 solicitações críticas aguardando resposta',
    date: 'Ontem, 20:33',
    type: 'warning'
  },
  {
    id: 4,
    title: 'Reativação de usuários',
    details: '30 contas voltaram a interagir este mês',
    date: 'Ontem, 14:10',
    type: 'success'
  }
];

const formatMetric = (value: number | string): string =>
  typeof value === 'number' ? value.toLocaleString('pt-BR') : String(value);

export default function AdminDashboardPage() {
  const [view, setView] = useState<DashboardView>('resumo');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const activeUsers = historyData[historyData.length - 1].activeUsers;
  const newSignups = historyData[historyData.length - 1].newSignups;
  const reactivated = historyData[historyData.length - 1].reactivated;
  const pendingApprovals = 96;

  const engagementRate = useMemo(() => {
    const totalBase = 1594;
    return Math.round((activeUsers / totalBase) * 100);
  }, [activeUsers]);

  return (
    <div className={styles.adminContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Painel Administrativo</h1>
        <p className={styles.pageSubtitle}>
          Monitore atividade da base, novos cadastros e performance operacional em
          tempo real.
        </p>
      </header>

      <div className={styles.actionBanner}>
        <div className={styles.actionText}>
          <h3>Resumo de hoje</h3>
          <p>
            Acompanhe rapidamente crescimento da plataforma e pontos que exigem
            intervenção.
          </p>
        </div>
        <button className={styles.addStepBtn} type="button">
          Exportar relatório
        </button>
      </div>

      <div className={styles.mainDashboard}>
        <div className={styles.chartSection}>
          <div className={styles.chartTabs}>
            <button
              className={`${styles.tabBtn} ${view === 'resumo' ? styles.activeTab : ''}`}
              onClick={() => setView('resumo')}
              type="button"
            >
              Resumo do Mês
            </button>
            <button
              className={`${styles.tabBtn} ${view === 'historico' ? styles.activeTab : ''}`}
              onClick={() => setView('historico')}
              type="button"
            >
              Histórico de Usuários
            </button>
          </div>

          <div className={styles.chartDisplay}>
            {view === 'resumo' ? (
              <div className={styles.resumoView}>
                <div className={styles.pieWrapper}>
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={90}
                        outerRadius={115}
                        paddingAngle={8}
                        dataKey="value"
                        stroke="none"
                      >
                        {statusDistribution.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '10px',
                          padding: '8px 12px',
                          fontSize: '13px'
                        }}
                        itemStyle={{ color: '#fff', padding: '2px 0' }}
                        formatter={(value: number | string) => formatMetric(value)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className={styles.chartCenterInfo}>
                    <span className={styles.centerLabel}>Base Ativa</span>
                    <span className={styles.centerValue}>{activeUsers}</span>
                  </div>
                </div>

                <div className={styles.resumoContext}>
                  <h4>Situação atual da base</h4>
                  <p>
                    A distribuição mostra concentração saudável de usuários ativos,
                    com volume de pendências sob controle no funil de entrada.
                  </p>
                  <div className={styles.healthStatus}>
                    <span className={styles.statusDot} />
                    <span>
                      Status geral: <strong>Operação Estável</strong>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.historyWrapper}>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={historyData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px'
                      }}
                      formatter={(value: number | string) => formatMetric(value)}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '13px' }} />
                    <Line
                      type="monotone"
                      name="Usuários ativos"
                      dataKey="activeUsers"
                      stroke="#2dd4bf"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      name="Novos cadastros"
                      dataKey="newSignups"
                      stroke="#60a5fa"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                    <Line
                      type="monotone"
                      name="Reativados"
                      dataKey="reactivated"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        <aside className={styles.sideMetrics}>
          <div className={styles.balanceCard}>
            <span className={styles.balanceLabel}>Usuários ativos (mês)</span>
            <h2 className={styles.balanceValue}>{activeUsers}</h2>
            <p className={styles.balanceHint}>+124 em relação ao mês anterior</p>
          </div>

          <div className={styles.metricGroup}>
            <div className={styles.miniMetric}>
              <span className={styles.miniLabel}>Novos</span>
              <span className={styles.miniValue} style={{ color: '#60a5fa' }}>
                {newSignups}
              </span>
            </div>
            <div className={styles.miniMetric}>
              <span className={styles.miniLabel}>Reativados</span>
              <span className={styles.miniValue} style={{ color: '#f59e0b' }}>
                {reactivated}
              </span>
            </div>
          </div>

          <div className={styles.primeCard}>
            <div className={styles.primeHeader}>
              <span className={styles.primeLabel}>Engajamento da base</span>
              <span className={styles.primeTag}>Meta</span>
            </div>
            <div className={styles.primeBody}>
              <span className={styles.primeValue}>{engagementRate}%</span>
              <div className={styles.primeProgress}>
                <div className={styles.progressFill} style={{ width: `${engagementRate}%` }} />
              </div>
              <p>Meta definida: 80% de atividade recorrente.</p>
            </div>
          </div>

          <div className={styles.eduCard}>
            <div>
              <h5>Pendências de aprovação</h5>
              <p>
                {pendingApprovals} cadastros aguardando validação. Priorize os
                perfis com mais de 24h em análise.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className={styles.recentSection}>
        <div className={styles.tableHeader}>
          <h2 className={styles.sectionTitle} style={{ margin: 0 }}>
            Atividades Administrativas Recentes
          </h2>
          <button
            className={styles.detailsBtn}
            type="button"
            onClick={() => setIsHistoryModalOpen(true)}
          >
            Ver tudo
          </button>
        </div>

        <div className={styles.activityList}>
          {recentAdminEvents.map((event) => (
            <div key={event.id} className={styles.activityItem}>
              <div
                className={styles.activityIcon}
                style={{
                  background:
                    event.type === 'warning'
                      ? 'rgba(245, 158, 11, 0.12)'
                      : event.type === 'info'
                        ? 'rgba(96, 165, 250, 0.12)'
                        : 'rgba(45, 212, 191, 0.12)',
                  color:
                    event.type === 'warning'
                      ? '#f59e0b'
                      : event.type === 'info'
                        ? '#60a5fa'
                        : '#2dd4bf'
                }}
              >
                {event.type === 'warning' ? '!' : event.type === 'info' ? 'i' : 'ok'}
              </div>
              <div className={styles.activityMain}>
                <span className={styles.activityTitle}>{event.title}</span>
                <span className={styles.activityCategory}>{event.details}</span>
              </div>
              <div className={styles.activityAmount}>{event.date}</div>
            </div>
          ))}
        </div>
      </div>

      {isHistoryModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsHistoryModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(event) => event.stopPropagation()}
          >
            <header className={styles.modalHeader}>
              <h2>Histórico Administrativo</h2>
              <button
                className={styles.closeButton}
                onClick={() => setIsHistoryModalOpen(false)}
                type="button"
                aria-label="Fechar modal"
              >
                &times;
              </button>
            </header>

            <div className={styles.modalBody}>
              <table className={styles.historyTable}>
                <thead>
                  <tr>
                    <th>Evento</th>
                    <th>Descrição</th>
                    <th>Tipo</th>
                    <th>Data/Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAdminEvents.map((event) => (
                    <tr key={event.id}>
                      <td style={{ fontWeight: 700 }}>{event.title}</td>
                      <td>{event.details}</td>
                      <td>
                        <span
                          className={`${styles.typeIndicator} ${
                            event.type === 'warning'
                              ? styles.typeWarning
                              : event.type === 'info'
                                ? styles.typeInfo
                                : styles.typeSuccess
                          }`}
                        >
                          {event.type === 'warning'
                            ? 'Atenção'
                            : event.type === 'info'
                              ? 'Informativo'
                              : 'Sucesso'}
                        </span>
                      </td>
                      <td>{event.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <footer className={styles.modalFooter}>
              <span className={styles.footerNote}>
                Exibindo todas as atividades administrativas registradas neste ambiente.
              </span>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
