
"use client";

import { useRouter } from 'next/navigation';
import styles from './Learning.module.css';

const MODULOS = [
  { id: 1, label: "MÓDULO 1", title: "Introdução ao dinheiro", status: "completed" },
  { id: 2, label: "MÓDULO 2", title: "Organização Financeira: Primeiros Passos", status: "active" },
  { id: 3, label: "MÓDULO 3", title: "Conceitos Financeiros Essenciais", status: "locked" },
  { id: 4, label: "MÓDULO 4", title: "Créditos, Dívidas e Responsabilidade", status: "locked" },
];

export default function Learning() {
  const router = useRouter();

  return (
    <div className={styles.modulesContainer}>
      <div className={styles.modulesPath}>
        {MODULOS.map((mod, index) => (
          <div key={mod.id} className={styles.moduleWrapper}>
            <div
              className={`${styles.moduleCard} ${styles[mod.status]}`}
              onClick={() =>
                mod.status !== "locked" && router.push(`/modulo/${mod.id}`)
              }
            >
              <span className={styles.moduleHeader}>{mod.label}</span>
              <h3 className={styles.moduleTitle}>{mod.title}</h3>
            </div>

            {index < MODULOS.length - 1 && (
              <div className={styles.arrowConn}>
                ↓
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
