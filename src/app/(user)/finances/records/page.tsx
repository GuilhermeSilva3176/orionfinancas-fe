"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../Finances.module.css";

const mockEntries = [
  { id: 1, type: "Gasto", category: "Mercado", value: 250.0, date: "10/02/2026" },
  { id: 2, type: "Gasto", category: "Transporte", value: 80.0, date: "12/02/2026" },
  { id: 3, type: "Ganho", category: "Salário", value: 3500.0, date: "15/02/2026" },
  { id: 4, type: "Gasto", category: "Lazer", value: 120.0, date: "18/02/2026" },
];

export default function FinanceRecordsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    type: "gasto",
    category: "",
    value: "",
    date: "",
  });

  const totalExpenses = mockEntries
    .filter((e) => e.type === "Gasto")
    .reduce((acc, e) => acc + e.value, 0);

  const totalIncome = mockEntries
    .filter((e) => e.type === "Ganho")
    .reduce((acc, e) => acc + e.value, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui entraria a lógica real de salvar o registro
    console.log("Novo registro (mock):", formState);
    setIsModalOpen(false);
    setFormState({
      type: "gasto",
      category: "",
      value: "",
      date: "",
    });
  };

  return (
    <div className={styles.recordsContainer}>
      <header className={styles.recordsHeader}>
        <div className={styles.recordsHeaderText}>
          <h1 className={styles.recordsTitle}>Área de controle financeiro</h1>
          <p className={styles.recordsSubtitle}>Tabela de registros</p>
        </div>
        <div className={styles.recordsHeaderActions}>
          <Link href="/finances" className={styles.backToOverview}>
            ← Voltar para visão geral
          </Link>
          <button
            type="button"
            className={styles.addRecordBtn}
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar gastos
          </button>
        </div>
      </header>

      <section className={styles.recordsSummary}>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Total de gastos</span>
          <span className={styles.summaryValue}>
            R$ {totalExpenses.toFixed(2).replace(".", ",")}
          </span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Total de ganhos</span>
          <span className={styles.summaryValue}>
            R$ {totalIncome.toFixed(2).replace(".", ",")}
          </span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.summaryLabel}>Saldo projetado</span>
          <span className={styles.summaryValue}>
            R$ {(totalIncome - totalExpenses).toFixed(2).replace(".", ",")}
          </span>
        </div>
      </section>

      <div className={styles.tableCard}>
        <div className={styles.tableHeaderRow}>
          <span>Tipo</span>
          <span>Categoria</span>
          <span>Valor</span>
          <span>Data</span>
        </div>

        <div className={styles.tableBody}>
          {mockEntries.map((entry) => (
            <div key={entry.id} className={styles.tableRow}>
              <span className={styles.typeCell}>{entry.type}</span>
              <span>{entry.category}</span>
              <span>R$ {entry.value.toFixed(2).replace(".", ",")}</span>
              <span>{entry.date}</span>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.recordModalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.recordModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.recordModalTitle}>Cadastro de gastos</h2>
            <form className={styles.financeForm} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroupInline}>
                  <label>Tipo</label>
                  <select
                    className={styles.formInput}
                    value={formState.type}
                    onChange={(e) =>
                      setFormState({ ...formState, type: e.target.value })
                    }
                  >
                    <option value="gasto">Gasto</option>
                    <option value="ganho">Ganho</option>
                  </select>
                </div>

                <div className={styles.formGroupInline}>
                  <label>Categoria</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="Ex: Mercado, transporte..."
                    value={formState.category}
                    onChange={(e) =>
                      setFormState({ ...formState, category: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroupInline}>
                  <label>Valor</label>
                  <div className={styles.inlineValueGroup}>
                    <span className={styles.currencyPrefix}>R$</span>
                    <input
                      type="number"
                      step="0.01"
                      className={styles.formInput}
                      placeholder="0,00"
                      value={formState.value}
                      onChange={(e) =>
                        setFormState({ ...formState, value: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className={styles.formGroupInline}>
                  <label>Data</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={formState.date}
                    onChange={(e) =>
                      setFormState({ ...formState, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.secondaryBtnWide}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.primaryBtnWide}>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

