export type QuestionModel = "multipleChoice" | "connect" | "matching";

export interface MultipleChoiceQuestion {
  type: "multipleChoice";
  enunciado: string;
  alternativas: string[];
  respostaCorretaIndex?: number;
}

export interface ConnectQuestion {
  type: "connect";
  enunciado: string;
  alternativas: string[];
}

export interface MatchingQuestion {
  type: "matching";
  enunciado: string;
  colunaA: string[];
  colunaB: string[];
}

export type LessonQuestion = MultipleChoiceQuestion | ConnectQuestion | MatchingQuestion;

export interface Lesson {
  tituloLicao: string;
  conteudo: string;
  conteudoAdicional?: string;
  questions?: LessonQuestion[];
}

export interface ModuleContent {
  id: number;
  titulo: string;
  licoes: Lesson[];
}

export interface LearningDocument {
  title: string;
  description: string;
  difficulty: string;
  modulos: ModuleContent[];
}

// Mock de conteúdo vindo do banco de dados.
// Quando o backend estiver pronto, esta estrutura pode ser
// preenchida dinamicamente a partir da API mantendo este formato.
export const LEARNING_DOCUMENT: LearningDocument = {
  title: "Guia do Investidor Iniciante",
  description: "Aprenda os conceitos básicos para começar a investir com segurança.",
  difficulty: "Iniciante",
  modulos: [
    {
      id: 1,
      titulo: "Entendendo a Renda Fixa",
      licoes: [
        {
          tituloLicao: "O que é o Tesouro Direto?",
          conteudo:
            "O Tesouro Direto é um programa do governo brasileiro que permite que qualquer pessoa invista em títulos públicos de forma simples pela internet. Ele é considerado um investimento de baixo risco, pois os títulos são garantidos pelo Tesouro Nacional.",
          conteudoAdicional:
            "https://www.tesourodireto.com.br/titulos/tesouro-direto.htm",
          questions: [
            {
              type: "multipleChoice",
              enunciado: "Qual é uma característica importante do Tesouro Direto?",
              alternativas: [
                "É um investimento garantido pelo Tesouro Nacional.",
                "É um tipo de criptomoeda.",
                "Só pode ser comprado por grandes investidores.",
                "Não possui liquidez diária.",
              ],
              respostaCorretaIndex: 0,
            },
            {
              type: "connect",
              enunciado: "Relacione o conceito ao benefício do Tesouro Direto.",
              alternativas: [
                "Baixo risco",
                "Acesso pela internet",
                "Investimento inicial baixo",
                "Garantia do Tesouro Nacional",
              ],
            },
            {
              type: "matching",
              enunciado: "Organize as colunas com as combinações corretas.",
              colunaA: ["Tesouro Direto", "Títulos públicos"],
              colunaB: [
                "Investimento acessível pela internet",
                "Dívida emitida pelo governo",
              ],
            },
          ],
        },
        {
          tituloLicao: "O que é o Tesouro Selic?",
          conteudo:
            "O Tesouro Selic é um título público pós-fixado, cuja rentabilidade acompanha a taxa básica de juros da economia (Selic). Por ter alta liquidez e baixa oscilação, é muito utilizado como reserva de emergência.",
          conteudoAdicional:
            "https://www.tesourodireto.com.br/titulos/tesouro-selic.htm",
          questions: [
            {
              type: "multipleChoice",
              enunciado: "Para que objetivo o Tesouro Selic é mais indicado?",
              alternativas: [
                "Reserva de emergência.",
                "Apostas de curto prazo em renda variável.",
                "Compra de moedas estrangeiras.",
                "Investimentos sem risco de oscilação.",
              ],
              respostaCorretaIndex: 0,
            },
          ],
        },
        {
          tituloLicao: "Renda fixa vs renda variável",
          conteudo:
            "Na renda fixa, você sabe desde o início como será a rentabilidade (ou a regra que a define). Na renda variável, o retorno depende do mercado e pode subir ou descer. Para começar, a renda fixa costuma ser mais previsível.",
          questions: [
            {
              type: "multipleChoice",
              enunciado: "O que caracteriza a renda fixa?",
              alternativas: [
                "Rentabilidade previsível ou com regra definida.",
                "Retorno sempre igual à inflação.",
                "Apenas para investidores qualificados.",
              ],
              respostaCorretaIndex: 0,
            },
          ],
        },
        {
          tituloLicao: "Primeiros passos para investir",
          conteudo:
            "Antes de investir, organize suas finanças: reserve uma quantia para emergências, pague dívidas caras e defina seus objetivos. Só então escolha o investimento que combina com seu perfil e prazo.",
          questions: [
            {
              type: "multipleChoice",
              enunciado: "O que fazer antes de investir?",
              alternativas: [
                "Reservar para emergências e definir objetivos.",
                "Aplicar todo o dinheiro em ações.",
                "Não é necessário planejamento.",
              ],
              respostaCorretaIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};

export function getModuleById(id: number): ModuleContent | undefined {
  return LEARNING_DOCUMENT.modulos.find((mod) => mod.id === id);
}

