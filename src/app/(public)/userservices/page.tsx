import styles from "./Services.module.css";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      icon: "💸",
      title: "Gestão de Gastos",
      description:
        "Registre suas despesas diárias de forma intuitiva e categorize seus gastos para entender para onde seu dinheiro está indo.",
      benefit: "Clareza total sobre seu comportamento financeiro."
    },
    {
      icon: "🎓",
      title: "Trilhas de Aprendizado",
      description:
        "Conteúdo educativo exclusivo para jovens, cobrindo desde o básico da poupança até o funcionamento do mercado de ações.",
      benefit: "Aprendizado estruturado e progressivo."
    },
    {
      icon: "🎯",
      title: "Planejador de Metas",
      description:
        "Defina objetivos financeiros e acompanhe seu progresso em tempo real.",
      benefit: "Transforme sonhos em planos executáveis."
    },
    {
      icon: "📊",
      title: "Relatórios Inteligentes",
      description:
        "Visualize sua saúde financeira através de gráficos claros e receba insights sobre como economizar mais.",
      benefit: "Decisões baseadas em dados, não em achismos."
    }
  ];

  return (
    <div className={styles.servicesContainer}>
      {/* HERO */}
      <header className={styles.servicesHeader}>
        <h1 className={styles.title}>
          Nossos <span className="highlight">Serviços</span>
        </h1>
        <p className={styles.subtitle}>
          Ferramentas práticas e inteligentes para você organizar, aprender e
          evoluir financeiramente.
        </p>
      </header>

      {/* INTRO EXPLICATIVA */}
      <section className={styles.introSection}>
        <p>
          O Órion Finanças não é apenas um aplicativo de controle de gastos.
          É um ecossistema completo de desenvolvimento financeiro pessoal,
          criado para transformar comportamento, mentalidade e resultados.
        </p>
      </section>

      {/* SERVIÇOS */}
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <div className={styles.iconWrapper}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <span className={styles.benefit}>{service.benefit}</span>
          </div>
        ))}
      </div>

      {/* COMO TUDO SE CONECTA */}
      <section className={styles.processSection}>
        <h2>Como tudo funciona junto?</h2>
        <div className={styles.processSteps}>
          <div>1️⃣ Organize seus gastos</div>
          <div>2️⃣ Entenda seus padrões</div>
          <div>3️⃣ Aprenda os fundamentos</div>
          <div>4️⃣ Defina metas</div>
          <div>5️⃣ Evolua com constância</div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section className={styles.audienceSection}>
        <h2>Para quem é o Órion?</h2>
        <ul>
          <li>✔ Jovens começando sua vida financeira</li>
          <li>✔ Universitários</li>
          <li>✔ Profissionais no primeiro emprego</li>
          <li>✔ Pessoas que querem sair do descontrole financeiro</li>
        </ul>
      </section>

      {/* CTA FINAL */}
      <section className={styles.ctaSection}>
        <h2>Pronto para transformar sua vida financeira?</h2>
        <p>
          Comece hoje gratuitamente e construa sua independência passo a passo.
        </p>
        <Link href="/register" className="btn-primary">
          Criar conta grátis
        </Link>
      </section>
    </div>
  );
}