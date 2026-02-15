import Link from 'next/link';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>Órion Finanças</span>
          </Link>

          <nav className={styles.nav}>
            <Link href="/about" className={styles.navLink}>
              Sobre
            </Link>

            <Link href="/services" className={styles.navLink}>
              Serviços
            </Link>

            <Link href="/login" className={`${styles.navLink} ${styles.btnLogin}`}>
              Login / Cadastrar-se
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
