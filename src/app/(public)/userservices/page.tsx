import styles from './Services.module.css';

export default function ServicesPage() {
  const services = [
    {
      title: "Gestão de Gastos",
      description: "Registre suas despesas diárias de forma intuitiva e categorize seus gastos para entender para onde seu dinheiro está indo."
    },
    {
      title: "Trilhas de Aprendizado",
      description: "Conteúdo educativo exclusivo para jovens, cobrindo desde o básico da poupança até o funcionamento do mercado de ações."
    },
    {
      title: "Planejador de Metas",
      description: "Defina objetivos financeiros (como uma viagem ou reserva de emergência) e acompanhe seu progresso em tempo real."
    },
    {
      title: "Relatórios Inteligentes",
      description: "Visualize sua saúde financeira através de gráficos claros e receba insights sobre como economizar mais no final do mês."
    }
  ];

  return (
    <div className={styles.servicesContainer}>
      <header className={styles.servicesHeader}>
        <h1 className={styles.title}>Nossos <span className="highlight">Serviços</span></h1>
        <p className={styles.subtitle}>
          Tudo o que você precisa para sair do zero e alcançar sua independência financeira.
        </p>
      </header>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}