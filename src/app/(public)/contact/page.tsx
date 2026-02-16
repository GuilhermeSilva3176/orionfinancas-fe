
import styles from '../InfoPages.module.css';

export default function ContactPage() {
  return (
    <div className={styles.infoContainer}>
      <h1 className={styles.title}>Fale Conosco</h1>
      <div className={styles.content}>
        <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <strong>Nosso Email:</strong> contato@orionfinancas.com.br
        </p>
        <p style={{ textAlign: 'center' }}>
          <strong>Nosso Telefone:</strong> (11) 99999-9999
        </p>
      </div>
    </div>
  );
}
