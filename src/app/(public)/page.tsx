"use client";

import { useState } from "react";
import "@/styles/home.css";
import "@/styles/globals.css";
import Link from "next/link";
import Image from "next/image";
import {
  Pin,
  Brain,
  Gamepad2,
  TrendingUp,
  CheckCircle2,
  Check,
  BarChart3,
  Target,
  BookOpen,
  GraduationCap,
  Rocket,
  ShieldCheck
} from "lucide-react";

export default function HomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const stats = [
    {
      percentage: "72,4%",
      short: "dos brasileiros vivem em famílias com dificuldades para pagar as contas",
      full: "Pesquisas indicam Cerca de 72,4% da população brasileira viviam em famílias com alguma dificuldade para arcar com as despesas mensais. Enquanto 58,3% viviam em famílias que alegavam dificuldade, 14,1% tinham muita dificuldade. Já outros 26,5% tinham facilidade e apenas 1,1% viviam em famílias que responderam ter muita facilidade para chegar até o fim do mês com a renda total familiar que tinham.",
      source:
        "https://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/31401-72-4-dos-brasileiros-vivem-em-familias-com-dificuldades-para-pagar-as-contas#:~:text=72,4%25%20dos%20brasileiros%20vivem,as%20contas%20%7C%20Agência%20de%20Notícias",
    },
    {
      percentage: "47%",
      short:
        "dos jovens da geração Z não realizam controle efetivo de suas finanças",
      full:
        "Segundo pesquisa da CNDL e SPC Brasil, 47% dos jovens da geração Z não realizam controle efetivo de suas finanças, impactando diretamente no nível de endividamento e na dificuldade de planejamento financeiro.",
      source:
        "https://cndl.org.br/politicaspublicas/47-dos-jovens-da-geracao-z-nao-realizam-o-controle-das-financas-aponta-pesquisa-cndl-spc-brasil/",
    },
    {
      percentage: "75%",
      short: "dos jovens não se preparam para a aposentadoria",
      full:
        "Dentre os que realizam algum preparo, a estratégia mais comum é a aplicação em poupança (26%), o INSS pago pela empresa (21%) – que não reflete um investimento deles mesmos –, a Previdência Privada (21%), a abertura do próprio negócio (21%) e o INSS pago de forma autônoma (19%).",
      source:
        "https://cndl.org.br/politicaspublicas/47-dos-jovens-da-geracao-z-nao-realizam-o-controle-das-financas-aponta-pesquisa-cndl-spc-brasil/",
    },
  ];

  const toggleCard = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
            A maioria dos brasileiros nunca aprendeu a lidar com dinheiro. Nossa
            missão é mudar isso através de uma plataforma simples, prática e
            feita para a nova geração.
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

      {/* ================= INTRODUÇÃO ÓRION ================= */}
      <section className="orion-intro">
        <div className="orion-grid">
          <div className="orion-text">
            <h2>Quem somos</h2>
            <p>
              O <strong>Órion Finanças</strong> é uma plataforma de{" "}
              <strong>finanças pessoais</strong> e{" "}
              <strong>educação financeira</strong> feita para quem quer aprender
              do zero — com clareza, prática e constância.
            </p>
            <p>
              Nosso objetivo é ajudar você a <strong>organizar gastos</strong>,
              entender <strong>planejamento</strong>, aprender{" "}
              <strong>investimentos</strong> e criar hábitos financeiros que
              sustentam um futuro mais livre.
            </p>

            <div className="orion-highlights">
              <div className="chip">
                <Pin size={14} className="icon-inline" /> Simples
              </div>
              <div className="chip">
                <Brain size={14} className="icon-inline" /> Didático
              </div>
              <div className="chip">
                <Gamepad2 size={14} className="icon-inline" /> Gamificado
              </div>
              <div className="chip">
                <TrendingUp size={14} className="icon-inline" /> Evolução real
              </div>
            </div>
          </div>

          <div className="orion-card">
            <h3>O que você vai construir aqui</h3>
            <ul>
              <li>
                <CheckCircle2 size={18} className="highlight icon-inline" /> Controle de gastos e rotina financeira
              </li>
              <li>
                <CheckCircle2 size={18} className="highlight icon-inline" /> Metas, reserva de emergência e planejamento
              </li>
              <li>
                <CheckCircle2 size={18} className="highlight icon-inline" /> Noções de investimentos e juros
              </li>
              <li>
                <CheckCircle2 size={18} className="highlight icon-inline" /> Decisões melhores no dia a dia
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= ESTATÍSTICAS (PROBLEMA) ================= */}
      <section className="stats-section">
        <div className="stats-intro">
          <h2>O problema é real — e começa cedo</h2>
          <p>
            Muitos brasileiros vivem no limite do orçamento e grande parte dos
            jovens não tem rotina financeira. Clique nos cards para ver detalhes
            e a fonte.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card dropdown ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleCard(index)}
            >
              <div className="stat-header">
                <strong>{stat.percentage}</strong>
                <span>{stat.short}</span>
              </div>

              {openIndex === index && (
                <div className="dropdown-content">
                  <p>{stat.full}</p>
                  <a href={stat.source} target="_blank" rel="noopener noreferrer">
                    Acessar fonte completa
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* espaço extra abaixo para não empurrar a seção seguinte */}
        <div className="stats-bottom-space" />
      </section>

      {/* ================= CONTROLE FINANCEIRO (ZIG-ZAG) ================= */}
      <section className="zigzag">
        <div className="zigzag-row">
          <div className="zigzag-text">
            <h2 className="zigzag-title">
              Poupar não é sobre cortar tudo... É sobre ter <span className="highlight">controle</span> total do seu dinheiro.
            </h2>

            <p className="zigzag-subtitle">
              No Órion Finanças, você aprende a transformar pequenos hábitos em grandes resultados. O controle financeiro é a base para conquistar seus sonhos, e nós estamos aqui para te guiar nessa jornada de forma simples, prática e sem complicação.
            </p>

            <ul className="zigzag-checks">
              <li>
                <Check size={18} className="check" /> Entenda para onde seu dinheiro vai
              </li>
              <li>
                <Check size={18} className="check" /> Crie metas e acompanhe seu progresso
              </li>
              <li>
                <Check size={18} className="check" /> Comece a investir com consciência
              </li>
            </ul>
          </div>

          <div className="zigzag-media">
            <Image
              src="/assets/gifs/home/pig.gif"
              alt="Cofrinho representando economia"
              width={320}
              height={320}
              className="zigzag-pig-gif"
              unoptimized
              priority
            />
          </div>
        </div>
      </section>

      {/* ================= ORGANIZAÇÃO FINANCEIRA (ZIG-ZAG) ================= */}
      <section className="zigzag">
        <div className="zigzag-row reverse">

          <div className="zigzag-media">
            <Image
              src="/assets/gifs/home/coin.gif"
              alt="Organização financeira"
              width={200}
              height={200}
              className="zigzag-coin-gif"
              unoptimized
            />
          </div>

          <div className="zigzag-text">
            <h2 className="zigzag-title">
              Organize suas <span className="highlight">finanças</span> sem complicação
            </h2>

            <p className="zigzag-subtitle">
              Registre gastos e visualize para onde seu dinheiro está indo. Com o Órion Finanças, a organização financeira é simples e prática, sem planilhas complexas ou categorias confusas. Você tem o controle total da sua vida financeira, de forma clara e sem estresse.
            </p>

            <ul className="zigzag-checks">
              <li><Check size={18} className="check" />Categorize seus gastos</li>
              <li><Check size={18} className="check" />Veja padrões de consumo</li>
              <li><Check size={18} className="check" />Entenda seu comportamento financeiro</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ================= METAS FINANCEIRA (ZIGZAG) ================= */}
      <section className="zigzag">
        <div className="zigzag-row">

          <div className="zigzag-text">
            <h2 className="zigzag-title">
              Defina metas e acompanhe seu <span className="highlight">progresso</span>
            </h2>

            <p className="zigzag-subtitle">
              Transforme sonhos em objetivos claros e acompanhe sua evolução ao longo do tempo. No Órion Finanças, você pode criar metas financeiras personalizadas, acompanhar seu progresso e manter a motivação para alcançar seus objetivos. Com uma abordagem prática e gamificada, cada passo que você dá é um avanço rumo à sua liberdade financeira.
            </p>

            <ul className="zigzag-checks">
              <li><Check size={18} className="check" />Crie metas financeiras</li>
              <li><Check size={18} className="check" />Acompanhe seu progresso</li>
              <li><Check size={18} className="check" />Mantenha consistência nos hábitos</li>
            </ul>
          </div>

          <div className="zigzag-media">
            <Image
              src="/assets/gifs/home/graphic.gif"
              alt="Metas financeiras"
              width={300}
              height={300}
              className="zigzag-graphic-gif"
              unoptimized
            />
          </div>

        </div>
      </section>

      {/* ================= EDUCAÇÃO FINANCEIRA (ZIGZAG) ================= */}
      <section className="zigzag">
        <div className="zigzag-row reverse">

          <div className="zigzag-media">
            <Image
              src="/assets/gifs/home/trophy.gif"
              alt="Educação financeira"
              width={300}
              height={310}
              className="zigzag-trophy-gif"
              unoptimized
            />
          </div>

          <div className="zigzag-text">
            <h2 className="zigzag-title">
              Aprenda <span className="highlight">finanças</span> de forma prática
            </h2>

            <p className="zigzag-subtitle">
              Conteúdo direto ao ponto para ajudar você a tomar decisões financeiras melhores. Sem teoria infinita, sem complicação — apenas o que você precisa para aplicar no dia a dia e evoluir financeiramente.
            </p>

            <ul className="zigzag-checks">
              <li><Check size={18} className="check" />Conceitos simples e aplicáveis</li>
              <li><Check size={18} className="check" />Aprendizado por módulos</li>
              <li><Check size={18} className="check" />Evolução passo a passo</li>
            </ul>
          </div>

        </div>
      </section>


      {/* ================= COMO FUNCIONA ================= */}
      <section className="how">
        <div className="how-header">
          <h2>Como funciona</h2>
          <p>Um caminho simples: organizar → aprender → aplicar → evoluir.</p>
        </div>

        <div className="timeline">
          <div className="timeline-line" />

          <div className="timeline-item">
            <div className="timeline-dot">1</div>
            <div className="timeline-content">
              <h3>Crie sua conta</h3>
              <p>Em poucos cliques você já começa sua jornada.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot">2</div>
            <div className="timeline-content">
              <h3>Registre e entenda</h3>
              <p>Organize entradas/saídas e enxergue seus padrões.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot">3</div>
            <div className="timeline-content">
              <h3>Aprenda por módulos</h3>
              <p>Conteúdo direto ao ponto com prática e metas.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot">4</div>
            <div className="timeline-content">
              <h3>Evolua com gamificação</h3>
              <p>Ganhe progresso ao manter consistência e concluir aulas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DIFERENCIAIS ================= */}
      <section className="differences">
        <div className="differences-header">
          <h2 className="section-title">Diferenciais do Órion Finanças</h2>
          <p>
            Feito para você aplicar no dia a dia: menos teoria, mais clareza e evolução real.
          </p>
        </div>

        <div className="differences-grid">
          <div className="differences-list">
            <div className="diff-item">
              <span className="diff-icon"><BarChart3 size={24} className="highlight" /></span>
              <div>
                <h3>Controle de gastos</h3>
                <p>Veja para onde seu dinheiro vai e ajuste com segurança.</p>
              </div>
            </div>

            <div className="diff-item">
              <span className="diff-icon"><Target size={24} className="highlight" /></span>
              <div>
                <h3>Metas e progresso</h3>
                <p>Transforme objetivos em passos semanais e acompanhe evolução.</p>
              </div>
            </div>

            <div className="diff-item">
              <span className="diff-icon"><BookOpen size={24} className="highlight" /></span>
              <div>
                <h3>Conteúdo aplicável</h3>
                <p>Você aprende e já aplica no mesmo dia — sem teoria infinita.</p>
              </div>
            </div>
          </div>

          <div className="differences-list">
            <div className="diff-item">
              <span className="diff-icon"><GraduationCap size={24} className="highlight" /></span>
              <div>
                <h3>Aprendizado gamificado</h3>
                <p>Módulos curtos, claros e com evolução por níveis.</p>
              </div>
            </div>

            <div className="diff-item">
              <span className="diff-icon"><Rocket size={24} className="highlight" /></span>
              <div>
                <h3>Visão de futuro</h3>
                <p>Hábitos financeiros que impactam sua vida inteira.</p>
              </div>
            </div>

            <div className="diff-item">
              <span className="diff-icon"><ShieldCheck size={24} className="highlight" /></span>
              <div>
                <h3>Sem complicação</h3>
                <p>Interface simples e focada em clareza.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PREVIEW DO DASHBOARD ================= */}
      <section className="preview">
        <div className="preview-grid">
          <div className="preview-text">
            <h2>Veja como é por dentro</h2>
            <p>
              Um dashboard limpo, com foco no que importa: progresso de estudo,
              metas e visão geral financeira.
            </p>

            <div className="preview-list">
              <div className="preview-item">
                <CheckCircle2 size={16} className="highlight icon-inline" /> Resumo do mês
              </div>
              <div className="preview-item">
                <CheckCircle2 size={16} className="highlight icon-inline" /> Trilhas e módulos
              </div>
              <div className="preview-item">
                <CheckCircle2 size={16} className="highlight icon-inline" /> Metas e hábitos
              </div>
              <div className="preview-item">
                <CheckCircle2 size={16} className="highlight icon-inline" /> Gamificação e evolução
              </div>
            </div>

            <Link href="/register" className="btn-primary big">
              Quero acessar o dashboard
            </Link>
          </div>

          <div className="preview-mock">
            <div className="mock-top">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>

            <div className="mock-body">
              <div className="mock-card">
                <p className="mock-title">Progresso</p>
                <div className="mock-bar">
                  <div className="mock-fill" />
                </div>
                <p className="mock-sub">Módulo 2 • 45%</p>
              </div>

              <div className="mock-row">
                <div className="mock-mini">
                  <p className="mock-title">Gastos</p>
                  <p className="mock-value">R$ 680</p>
                </div>
                <div className="mock-mini">
                  <p className="mock-title">Metas</p>
                  <p className="mock-value">3/5</p>
                </div>
              </div>

              <div className="mock-card">
                <p className="mock-title">Próxima aula</p>
                <p className="mock-sub">Organização Financeira • 10 min</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="final-cta">
        <div className="cta-box">
          <h2>Seu futuro financeiro começa hoje</h2>
          <p>
            Não espere ganhar mais para começar — comece agora a organizar sua vida financeira.
          </p>
          <Link href="/register" className="btn-primary big">
            Criar conta grátis
          </Link>
        </div>
      </section>
    </main>
  );
}