"use client";

import "@/styles/home.css";
import "@/styles/globals.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-container">
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-content">

          <h1 className="hero-title">
            Domine seu dinheiro com o{" "}
            <span className="highlight">Órion Finanças</span>
          </h1>

          <p className="hero-description">
            A maioria dos brasileiros nunca aprendeu a lidar com dinheiro.
            Nossa missão é mudar isso através de uma plataforma simples,
            prática e feita para a nova geração.
          </p>

          <div className="hero-buttons">
            <Link href="/register" className="btn-primary">
              Começar gratuitamente
            </Link>
            <Link href="/login" className="btn-secondary">
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <strong>79%</strong>
            <span>dos brasileiros têm dificuldades com finanças</span>
          </div>

          <div className="stat-card">
            <strong>63%</strong>
            <span>não possuem controle mensal de gastos</span>
          </div>

          <div className="stat-card">
            <strong>+5.000</strong>
            <span>jovens já evoluindo com a plataforma</span>
          </div>
        </div>
      </section>

      {/* ================= IMPORTÂNCIA ================= */}
      <section className="importance">
        <div className="importance-content">
          <h2>Por que educação financeira é tão importante?</h2>

          <p>
            Sem educação financeira, decisões erradas se acumulam ao longo da
            vida: dívidas, falta de investimentos e ausência de planejamento.
            O Órion Finanças foi criado para mudar esse cenário desde cedo.
          </p>

          <div className="importance-points">
            <div className="point">✔ Evitar dívidas desnecessárias</div>
            <div className="point">✔ Construir patrimônio cedo</div>
            <div className="point">✔ Tomar decisões financeiras inteligentes</div>
            <div className="point">✔ Alcançar liberdade financeira</div>
          </div>
        </div>
        
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        <h2 className="section-title">
          Tudo que você precisa para evoluir financeiramente
        </h2>
        <br/>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Controle de gastos</h3>
            <p>
              Visualize para onde seu dinheiro está indo e tome decisões mais
              inteligentes.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Aprendizado gamificado</h3>
            <p>
              Evolua por módulos práticos feitos para jovens que querem crescer
              rápido.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Visão de futuro</h3>
            <p>
              Construa hábitos financeiros que vão impactar sua vida inteira.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="final-cta">
        <div className="cta-box">
          <h2>Seu futuro financeiro começa hoje</h2>
          <p>
            Não espere ganhar mais para começar — comece agora a organizar sua
            vida financeira. 
          </p>
          <br/>
          <Link href="/register" className="btn-primary big">
            Criar conta grátis
          </Link>
        </div>
      </section>
    </main>
  );
}