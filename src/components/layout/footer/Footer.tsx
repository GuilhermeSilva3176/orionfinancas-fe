
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.linksGrid}>
        <div className={styles.column}>
          <Link href="/services" className={styles.link}>produtos e serviços</Link>
          <Link href="/contact" className={styles.link}>Central de atendimento</Link>
        </div>

        <div className={styles.column}>
          <Link href="/about" className={styles.link}>Sobre Nós</Link>
          <Link href="/contact" className={styles.link}>fale conosco</Link>
        </div>

        <div className={styles.column}>
          <Link href="/terms" className={styles.link}>Termos de uso</Link>
        </div>

        <div className={styles.column}>
          <Link href="/privacy" className={styles.link}>Políticas de privacidade</Link>
        </div>
      </div>

      <div className={styles.copyright}>
        DIREITOS RESERVADOS
      </div>
    </footer>
  );
}
