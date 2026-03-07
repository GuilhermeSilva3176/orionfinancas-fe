"use client";

import { Fragment, useState } from "react";
import styles from "./Learning.module.css";
import { LEARNING_DOCUMENT, getModuleById } from "./lessonsData";
import Image from "next/image";

type ModuleStatus = "completed" | "active" | "locked";

interface Modulo {
  id: number;
  label: string;
  title: string;
  status: ModuleStatus;
}

const MODULOS: Modulo[] = [
  { id: 1, label: "MÓDULO 1", title: "Introdução ao dinheiro", status: "completed" },
  { id: 2, label: "MÓDULO 2", title: "Organização financeira: Primeiros Passos", status: "active" },
  { id: 3, label: "MÓDULO 3", title: "Conceitos Financeiros Essenciais", status: "active" },
  { id: 4, label: "MÓDULO 4", title: "Créditos, Dívidas e Responsabilidade Financeira", status: "active" },
  { id: 5, label: "MÓDULO 5", title: "Reserva de Emergência e Proteção", status: "active" },
  { id: 6, label: "MÓDULO 6", title: "Trilha dos Investimentos: Renda Fixa", status: "active" },
  { id: 7, label: "MÓDULO 7", title: "Trilha dos Investimentos: Renda Variável", status: "active" },
  { id: 8, label: "MÓDULO 8", title: "Planejamento de Longo Prazo e Aposentadoria", status: "active" },
];

const PlayIcon = () => (
  <div className={styles.playIconContainer}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  </div>
);

// Padrão de irregularidade para a trilha (Offsets horizontais em pixels)
// REGRAS: Alternar entre negativo e positivo para evitar que fiquem no mesmo lado.
const TRAIL_OFFSETS = [-120, 80, -50, 110, -20, 90, -70, 130, -30, 60, -90, 40];

export default function Learning() {
  const [activeModule, setActiveModule] = useState<Modulo | null>(null);
  // Índice da lição no caminho (0 = lição 1, 1 = lição 2, ...)
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [isLessonViewOpen, setIsLessonViewOpen] = useState(false);
  // Fase da lição: conteúdo (treino) ou perguntas
  const [lessonPhase, setLessonPhase] = useState<"content" | "questions">("content");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleModuleClick = (mod: Modulo) => {
    if (mod.status === "locked") return;
    setActiveModule(mod);
    setActiveLessonIndex(0);
    setLessonPhase("content");
    setCurrentQuestionIndex(0);
  };

  const handleBackToModules = () => {
    setActiveModule(null);
    setActiveLessonIndex(0);
    setIsLessonViewOpen(false);
    setLessonPhase("content");
    setCurrentQuestionIndex(0);
  };

  const handleBackToTrail = () => {
    setIsLessonViewOpen(false);
    setLessonPhase("content");
  };

  const activeContent = activeModule ? getModuleById(activeModule.id) : null;
  const lessons = activeContent?.licoes ?? [];
  const currentLesson = lessons[activeLessonIndex];
  const questions = currentLesson?.questions ?? [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleLessonClick = (index: number) => {
    setActiveLessonIndex(index);
    setIsLessonViewOpen(true);
    setLessonPhase("content");
    setCurrentQuestionIndex(0);
  };

  const goToQuestions = () => {
    if (!questions.length) return;
    setLessonPhase("questions");
    setCurrentQuestionIndex(0);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      // Última pergunta desta lição concluída: volta para conteúdo
      setLessonPhase("content");
      setCurrentQuestionIndex(0);
    }
  };

  /**
   * Calcula o estilo dinâmico do conector entre a lição atual e a próxima
   */
  const getConnectorStyle = (index: number) => {
    if (!lessons.length || index >= lessons.length - 1) return {};

    const currentOffset = TRAIL_OFFSETS[index % TRAIL_OFFSETS.length];
    const nextOffset = TRAIL_OFFSETS[(index + 1) % TRAIL_OFFSETS.length];

    const width = Math.abs(nextOffset - currentOffset);
    const minOffset = Math.min(currentOffset, nextOffset);

    // VARIedade de curvas (0-2: L-Shape/Topo | 3: J-Shape/Baixo para o 7->8)
    // Usamos o índice para forçar o formato J no step 7 (index 6) como no desenho
    const isJPath = index === 6 || (index === 3); 

    const baseStyle: React.CSSProperties = {
      width: `${width}px`,
      left: `calc(50% + ${minOffset}px)`,
      height: "116px",
    };

    if (currentOffset < nextOffset) {
      // Movimento: ESQUERDA -> DIREITA
      if (isJPath) {
        // J-Shape (Down then Right)
        return {
          ...baseStyle,
          borderTop: "none",
          borderRight: "none",
          borderBottomLeftRadius: "50px",
          top: "42px",
        };
      }
      // L-Shape (Across then Down)
      return {
        ...baseStyle,
        borderLeft: "none",
        borderBottom: "none",
        borderTopRightRadius: "50px",
        top: "42px",
      };
    } else {
      // Movimento: DIREITA -> ESQUERDA
      if (isJPath) {
        // J-Shape (Down then Left)
        return {
          ...baseStyle,
          borderTop: "none",
          borderLeft: "none",
          borderBottomRightRadius: "50px",
          top: "42px",
        };
      }
      // L-Shape (Across then Down)
      return {
        ...baseStyle,
        borderRight: "none",
        borderBottom: "none",
        borderTopLeftRadius: "50px",
        top: "42px",
      };
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    } else {
      setLessonPhase("content");
    }
  };

  // Tela do módulo: banner do módulo + caminho de lições (1-2-3-4)
  if (activeModule && activeContent && lessons.length > 0) {
    if (isLessonViewOpen && currentLesson) {
      return (
        <div className={styles.studyViewContainer}>
          <div className={styles.studyWrapper}>
            <header className={styles.studyHeader}>
              <span className={styles.studyModuleTitle}>{activeModule.label}</span>
              <h2 className={styles.studyLessonTitle}>
                Aula {activeLessonIndex + 1}: {currentLesson.tituloLicao}
              </h2>
            </header>

            <section className={styles.studyCard}>
              <div className={styles.studyLayout}>
                <div className={styles.studyTextContent}>
                  <p>{currentLesson.conteudo}</p>
                  {currentLesson.bulletPoints && (
                    <ul className={styles.studyBulletList}>
                      {currentLesson.bulletPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={styles.studyImagePlaceholder}>
                  {currentLesson.imageUrl ? (
                    <div className={styles.placeholderBox} style={{ border: 'none', background: 'none' }}>
                      <Image 
                        src={currentLesson.imageUrl} 
                        alt={currentLesson.tituloLicao} 
                        width={400} 
                        height={400} 
                        className={styles.studyImage}
                        style={{ borderRadius: '20px', objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                  ) : (
                    <div className={styles.placeholderBox}>
                      <span>Imagem Ilustrativa</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <footer className={styles.studyActions}>
              <button 
                type="button" 
                className={styles.studyBtnBack} 
                onClick={handleBackToTrail}
              >
                voltar
              </button>
              <button 
                type="button" 
                className={styles.studyBtnNext} 
                onClick={goToQuestions}
              >
                próximo
              </button>
            </footer>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.modulesContainer}>
        <section className={styles.activeModuleContainer}>
          <header className={styles.trailHeader}>
            <button type="button" className={styles.backToModulesBtn} onClick={handleBackToModules}>
              ← Voltar para módulos
            </button>
            <h2 className={styles.trailTitle}>{activeModule.label}</h2>
            <p className={styles.trailSubtitle}>{activeModule.title}</p>
            <span className={styles.trailDocMeta}>
              {LEARNING_DOCUMENT.title} · Nível {LEARNING_DOCUMENT.difficulty}
            </span>
          </header>

          {/* Caminho de lições: trilha não reta, em zigue-zague conforme wireframe */}
          <div className={styles.trailPath}>
            {lessons.map((lesson, index) => {
              const nodeOffset = TRAIL_OFFSETS[index % TRAIL_OFFSETS.length];
              return (
                <div key={index} className={styles.trailStep}>
                  <div 
                    className={styles.nodeWrapper} 
                    style={{ transform: `translateX(${nodeOffset}px)` }}
                  >
                    {index === activeLessonIndex && (
                      <div className={`${styles.activeTooltip} ${styles.bounceAnimation}`}>
                        Começar
                        <div className={styles.tooltipArrow} />
                      </div>
                    )}
                    <button
                      type="button"
                      className={`${styles.trailNode} ${
                        index === activeLessonIndex ? styles.trailNodeActive : ""
                      } ${
                        index < activeLessonIndex ? styles.trailNodeCompleted : ""
                      }`}
                      onClick={() => handleLessonClick(index)}
                      aria-label={`Lição ${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  </div>
                  {index < lessons.length - 1 && (
                    <div 
                      className={styles.simpleConnector} 
                      style={getConnectorStyle(index)}
                      aria-hidden 
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // Lista de módulos (tela inicial)
  return (
    <div className={styles.modulesContainer}>
      <header className={styles.learningHeader}>
        <h2 className={styles.sectionTitle}>Módulos de Estudo</h2>
        <p className={styles.sectionSubtitle}>Continue de onde você parou</p>
      </header>

      <div className={styles.modulesGrid}>
        {MODULOS.map((mod) => {
          const moduleData = getModuleById(mod.id);
          const lessonCount = moduleData?.licoes.length ?? 0;
          const itemCount = lessonCount * 4; // Média de 4 itens por lição

          return (
            <div
              key={mod.id}
              className={`${styles.modernModuleCard} ${mod.status === "locked" ? styles.locked : ""} ${mod.status === "completed" ? styles.completed : ""} ${mod.status === "active" ? styles.active : ""}`}
              onClick={() => handleModuleClick(mod)}
            >
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>{mod.label}</span>
                <h3 className={styles.cardTitle}>{mod.title}</h3>
                <PlayIcon />
              </div>
              
              <div className={styles.cardStats}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{lessonCount}</span>
                  <span className={styles.statLabel}>Aulas</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{itemCount}</span>
                  <span className={styles.statLabel}>Items</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.progressValue}>
                    {mod.status === "completed" ? "100%" : mod.status === "active" ? (mod.id === 2 ? "25%" : "0%") : "0%"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
