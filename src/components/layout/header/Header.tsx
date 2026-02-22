import Link from 'next/link';
import styles from './Header.module.css';

interface HeaderProps {
  variant?: 'public' | 'logged';
}

export function Header({ variant = 'public' }: HeaderProps) {
  return (
    <header className={`${styles.header} ${styles[variant]}`}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>Órion Finanças</span>
          </Link>

          {variant === 'public' ? (
            <nav className={styles.nav}>
              <Link href="/about" className={styles.navLink}>
                Sobre
              </Link>
              <Link href="/userservices" className={styles.navLink}>
                Serviços
              </Link>
              <Link href="/login" className={`${styles.navLink} ${styles.btnLogin}`}>
                Login / Cadastrar-se
              </Link>
            </nav>
          ) : (
            <div className={styles.actions}>
              <button className={styles.iconBtn}>
                🔔
              </button>
              <Link href="/profile" className={styles.iconBtn}>
                👤
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

