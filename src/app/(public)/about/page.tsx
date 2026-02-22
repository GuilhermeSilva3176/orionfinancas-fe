import styles from './About.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <section className={styles.heroAbout}>
        <h1 className={styles.title}>Nossa Missão no <span className="highlight">Orion</span></h1>
        <p className={styles.subtitle}>
          Capacitando a nova geração com as ferramentas necessárias para a liberdade financeira.
        </p>
      </section>

      <section className={styles.contentGrid}>
        <div className={styles.card}>
          <h3>Quem Somos?</h3>
          <p>
            O Orion Finanças nasceu da necessidade de transformar a educação financeira 
            em algo acessível, prático e moderno para jovens que estão começando sua jornada.
          </p>
        </div>

        <div className={styles.card}>
          <h3>Nosso Propósito</h3>
          <p>
            Acreditamos que o controle do dinheiro é a base para a realização de sonhos. 
            Nossa plataforma simplifica a gestão de gastos e ensina investimentos de forma clara.
          </p>
        </div>
      </section>
    </div>
  );
}