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
  {
    id: 2,
    label: "MÓDULO 2",
    title: "Organização Financeira: Primeiros Passos",
    status: "active",
  },
  { id: 3, label: "MÓDULO 3", title: "Conceitos Financeiros Essenciais", status: "locked" },
  {
    id: 4,
    label: "MÓDULO 4",
    title: "Créditos, Dívidas e Responsabilidade",
    status: "locked",
  },
];


export default function Learning() {
  const [activeModule, setActiveModule] = useState<Modulo | null>(null);
  // Índice da lição no caminho (0 = lição 1, 1 = lição 2, ...)
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
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
    setLessonPhase("content");
    setCurrentQuestionIndex(0);
  };

  const activeContent = activeModule ? getModuleById(activeModule.id) : null;
  const lessons = activeContent?.licoes ?? [];
  const currentLesson = lessons[activeLessonIndex];
  const questions = currentLesson?.questions ?? [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleLessonClick = (index: number) => {
    setActiveLessonIndex(index);
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
      // Última pergunta desta lição concluída: volta para conteúdo (pode depois acionar animação/conclusão)
      setLessonPhase("content");
      setCurrentQuestionIndex(0);
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
  // A aula (conteúdo + perguntas) aparece na própria página, abaixo da trilha.
  if (activeModule && activeContent && lessons.length > 0) {
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

          {/* Caminho de lições: trilha não reta, em zigue-zague */}
          <div className={styles.trailPath}>
            {lessons.map((_, index) => (
              <div key={`lesson-${index}`} className={styles.trailStep}>
                <button
                  type="button"
                  className={`${styles.trailNode} ${index === activeLessonIndex ? styles.trailNodeActive : ""
                    } ${index % 2 === 0 ? styles.trailNodeLeft : styles.trailNodeRight}`}
                  onClick={() => handleLessonClick(index)}
                  aria-label={`Lição ${index + 1}`}
                >
                  {index + 1}
                </button>
                {index < lessons.length - 1 && (
                  <div className={styles.trailConnector} aria-hidden />
                )}
              </div>
            ))}
          </div>

          {/* Área de conteúdo da lição + perguntas, na própria página */}
          {currentLesson && (
            <section className={styles.lessonInlineContainer}>
              {lessonPhase === "content" && (
                <div className={styles.lessonCardLarge}>
                  <header className={styles.lessonCardHeader}>
                    <span className={styles.lessonCardModule}>
                      {activeModule.label} · Aula {activeLessonIndex + 1}
                    </span>
                    <h3 className={styles.lessonCardTitle}>{currentLesson.tituloLicao}</h3>
                  </header>
                  <div className={styles.lessonCardBody}>
                    <div className={styles.lessonTextBlock}>
                      <p>{currentLesson.conteudo}</p>
                    </div>
                    <div className={styles.lessonIllustrationBlock}>
                      <span>Imagem ilustrativa / animação</span>
                    </div>
                  </div>
                  <footer className={styles.lessonCardFooter}>
                    <button
                      type="button"
                      className={styles.secondaryBtnWide}
                      onClick={handleBackToModules}
                    >
                      Voltar para módulos
                    </button>
                    <button
                      type="button"
                      className={styles.primaryBtnWide}
                      onClick={goToQuestions}
                      disabled={!questions.length}
                    >
                      Ir para perguntas
                    </button>
                  </footer>
                </div>
              )}

              {lessonPhase === "questions" && currentQuestion && (
                <div className={styles.quizCard}>
                  {/* Área fixa para animação do personagem */}
                  <div className={styles.animationBox}>
                    <span>Área de animação do personagem (ataque/acerto/erro)</span>
                  </div>

                  {currentQuestion.type === "multipleChoice" && (
                    <>
                      <header className={styles.quizHeader}>
                        <h3 className={styles.quizTitle}>Questão {currentQuestionIndex + 1}</h3>
                        <p className={styles.quizSubtitle}>{currentQuestion.enunciado}</p>
                      </header>
                      <div className={styles.quizOptions}>
                        {currentQuestion.alternativas.map((alt, idx) => (
                          <button key={idx} type="button" className={styles.quizOptionButton}>
                            {alt}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {currentQuestion.type === "connect" && (
                    <>
                      <header className={styles.quizHeader}>
                        <h3 className={styles.quizTitle}>
                          Questão {currentQuestionIndex + 1} - modelo de conectar respostas
                        </h3>
                        <p className={styles.quizSubtitle}>{currentQuestion.enunciado}</p>
                      </header>
                      <div className={styles.quizOptions}>
                        {currentQuestion.alternativas.map((alt, idx) => (
                          <button key={idx} type="button" className={styles.quizOptionButton}>
                            {alt}
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {currentQuestion.type === "matching" && (
                    <>
                      <header className={styles.quizHeader}>
                        <h3 className={styles.quizTitle}>
                          Questão {currentQuestionIndex + 1} - modelo de organizar respostas
                        </h3>
                        <p className={styles.quizSubtitle}>{currentQuestion.enunciado}</p>
                      </header>
                      <div className={styles.matchingGrid}>
                        <div className={styles.matchingColumn}>
                          <h4>Coluna A</h4>
                          {currentQuestion.colunaA.map((item, idx) => (
                            <button key={idx} type="button" className={styles.quizOptionButton}>
                              {item}
                            </button>
                          ))}
                        </div>
                        <div className={styles.matchingColumn}>
                          <h4>Coluna B</h4>
                          {currentQuestion.colunaB.map((item, idx) => (
                            <button key={idx} type="button" className={styles.quizOptionButton}>
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <footer className={styles.quizFooter}>
                    <button
                      type="button"
                      className={styles.secondaryBtnWide}
                      onClick={goToPreviousQuestion}
                    >
                      Pular / Voltar
                    </button>
                    <button
                      type="button"
                      className={styles.primaryBtnWide}
                      onClick={goToNextQuestion}
                    >
                      Verificar / Próxima
                    </button>
                  </footer>
                </div>
              )}
            </section>
          )}
        </section>
      </div>
    );
  }

  // Lista de módulos (tela inicial)
  return (
    <div className={styles.modulesContainer}>
      <div className={styles.modulesShowcase}>
        <header className={styles.studyIntro}>
          <h1 className={styles.studyTitle}>
            Sua <span className={styles.studyHighlight}>Área de Estudos</span>
          </h1>
          <p className={styles.studySubtitle}>
            Avance pelos módulos no seu ritmo, pratique com quizzes e acompanhe sua evolução.
          </p>
        </header>

        <div className={styles.modulesPath}>
          {MODULOS.map((mod, index) => (
            <div key={mod.id} className={styles.moduleWrapper}>
              <div
                className={`${styles.moduleCard} ${styles[mod.status]}`}
                onClick={() => handleModuleClick(mod)}
              >
                <span className={styles.moduleHeader}>{mod.label}</span>
                <h3 className={styles.moduleTitle}>{mod.title}</h3>
              </div>

              {index < MODULOS.length - 1 && (
                <div className={styles.arrowConn}>↓</div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.moduleGifWrap}>
          <Image
            src="/assets/gifs/home/sprSketch3.gif"
            alt="Mascote da área de módulos"
            width={140}
            height={233}
            unoptimized
            className={styles.moduleGif}
          />
        </div>
      </div>
    </div>
  );
}
