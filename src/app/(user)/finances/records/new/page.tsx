"use client";

import Link from "next/link";
import styles from "../../Finances.module.css";

export default function NewFinanceRecordPage() {
  return (
    <div className={styles.recordsContainer}>
      <header className={styles.recordsHeader}>
        <div>
          <h1 className={styles.recordsTitle}>Área de controle financeiro</h1>
          <p className={styles.recordsSubtitle}>Cadastro de gastos</p>
        </div>
      </header>

      <div className={styles.formCard}>
        <form className={styles.financeForm}>
          <div className={styles.formRow}>
            <div className={styles.formGroupInline}>
              <label>Tipo</label>
              <select className={styles.formInput}>
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
                />
              </div>
            </div>

            <div className={styles.formGroupInline}>
              <label>Data</label>
              <input type="date" className={styles.formInput} />
            </div>
          </div>

          <div className={styles.formActions}>
            <Link href="/finances/records" className={styles.secondaryBtnWide}>
              Cancelar
            </Link>
            <button type="submit" className={styles.primaryBtnWide}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

