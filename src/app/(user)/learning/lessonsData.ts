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
  bulletPoints?: string[];
  imageUrl?: string;
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
export const LEARNING_DOCUMENT: LearningDocument = {
  title: "Guia do Investidor Iniciante",
  description: "Aprenda os conceitos básicos para começar a investir com segurança.",
  difficulty: "Iniciante",
  modulos: [
    {
      id: 1,
      titulo: "Introdução ao dinheiro",
      licoes: [
        { 
          tituloLicao: "O que é dinheiro?", 
          conteudo: "O dinheiro é uma ferramenta de troca que evoluiu do escambo para o digital.",
          bulletPoints: ["Meio de troca", "Unidade de conta", "Reserva de valor"],
          imageUrl: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=400"
        },
        { 
          tituloLicao: "Inflação", 
          conteudo: "A inflação é o aumento generalizado dos preços de bens e serviços em uma economia durante um período de tempo. Quando o nível geral de preços sobe, cada unidade de moeda compra menos bens e serviços; consequentemente, a inflação reflete uma redução do poder de compra por unidade de dinheiro. Isso significa que, com o passar dos anos, o seu dinheiro parado 'vale menos'. É por isso que investir não é apenas uma escolha para ganhar mais, mas uma necessidade para proteger o que você já tem contra a desvalorização natural da economia mundial.",
          bulletPoints: ["IPCA é o índice oficial", "Afeta o custo de vida", "Corrói economias paradas"],
          imageUrl: "https://images.unsplash.com/photo-1611974714158-f88c146d9a0d?auto=format&fit=crop&q=80&w=400"
        },
        { 
          tituloLicao: "Juros Simples", 
          conteudo: "Cálculo de juros incidente apenas sobre o valor principal inicial.",
          bulletPoints: ["Fórmula: J = C . i . t", "Crescimento linear", "Menos comum em investimentos"],
        },
        { 
          tituloLicao: "Juros Compostos", 
          conteudo: "Diferente dos juros simples, onde o percentual incide apenas sobre o valor inicial, os juros compostos são calculados sobre o montante acumulado de cada período anterior. É o famoso 'juros sobre juros'. No início, a diferença pode parecer pequena, mas com o passar dos anos, o crescimento se torna exponencial. Albert Einstein supostamente chamou os juros compostos de 'a oitava maravilha do mundo'. Quem entende, ganha; quem não entende, paga (através de dívidas e cartões de crédito).",
          bulletPoints: ["Oiticava maravilha do mundo", "Crescimento exponencial", "Beneficia o investidor paciente"],
          imageUrl: "https://images.unsplash.com/photo-1579621970795-87f9ac756a70?auto=format&fit=crop&q=80&w=400"
        },
        { 
          tituloLicao: "Reserva de Emergência", 
          conteudo: "Um montante guardado para cobrir imprevistos e dar paz de espírito.",
          bulletPoints: ["6 a 12 meses de custo", "Alta liquidez necessária", "Não é para luxos"],
        },
        { 
          tituloLicao: "Perfil de Risco", 
          conteudo: "Sua tolerância a oscilações em troca de possíveis retornos maiores.",
          bulletPoints: ["Conservador", "Moderado", "Arrojado"],
        },
        { 
          tituloLicao: "Bancos vs Corretoras", 
          conteudo: "Entenda a diferença entre onde você guarda e onde você investe.",
          bulletPoints: ["Taxas de corretagem", "Variedade de produtos", "Independência financeira"],
        },
        { 
          tituloLicao: "Mentalidade de Riqueza", 
          conteudo: "Focar em ativos que geram renda em vez de passivos que geram despesas.",
          bulletPoints: ["Educação financeira contínua", "Disciplina nos aportes", "Foco no longo prazo"],
        }
      ]
    },
    {
      id: 2,
      titulo: "Organização financeira: Primeiros Passos",
      licoes: [
        { 
          tituloLicao: "Mapeando Gastos", 
          conteudo: "Identifique para onde cada centavo do seu dinheiro está indo.",
          bulletPoints: ["Gastos fixos", "Gastos variáveis", "Identificar ralos de dinheiro"],
        },
        { 
          tituloLicao: "Regra 50/30/20", 
          conteudo: "A regra 50-30-20 é um método simplificado de orçamento que ajuda as pessoas a gerenciar seu dinheiro de forma eficaz, simples e sustentável. A ideia básica é dividir sua renda mensal após os impostos em três categorias principais de gastos: 50% para necessidades básicas (aluguel, contas, alimentação), 30% para desejos pessoais (hobbies, sair para comer, assinaturas) e 20% para objetivos financeiros (pagar dívidas ou investir para o futuro). Ao manter seus custos fixos em 50%, você garante que terá flexibilidade para aproveitar a vida hoje e ainda garantir o seu amanhã.",
          bulletPoints: ["50% Necessidades", "30% Desejos", "20% Investimentos/Dívidas"],
        },
        { 
          tituloLicao: "Cortando Supérfluos", 
          conteudo: "Como economizar sem perder qualidade de vida.",
          bulletPoints: ["Assinaturas esquecidas", "Taxas bancárias", "Compras por impulso"],
        },
        { 
          tituloLicao: "Ferramentas de Controle", 
          conteudo: "Escolha o melhor método para controlar suas finanças.",
          bulletPoints: ["Apps de finanças", "Planilhas Excel", "Caderno de anotações"],
        },
        { 
          tituloLicao: "Consumo Consciente", 
          conteudo: "A arte de comprar o que realmente agrega valor à sua vida.",
          bulletPoints: ["Pesquisa de preço", "Custo por uso", "Impacto ambiental"],
        }
      ]
    },
    {
      id: 3,
      titulo: "Conceitos Financeiros Essenciais",
      licoes: [
        { 
          tituloLicao: "Taxa SELIC", 
          conteudo: "A taxa básica de juros que dita o ritmo da economia no Brasil.",
          bulletPoints: ["Meta da inflação", "Copom define a taxa", "Influencia rentabilidade fixa"],
        },
        { 
          tituloLicao: "IPCA", 
          conteudo: "O Índice de Preços ao Consumidor Amplo (a nossa inflação oficial).",
          bulletPoints: ["Cesta de produtos", "Poder de compra", "Reajuste de contratos"],
        },
        { 
          tituloLicao: "CDI", 
          conteudo: "Certificado de Depósito Interbancário, a referência dos bancos.",
          bulletPoints: ["Taxa de liquidez", "Referência para CDBs", "Corre junto com a Selic"],
        },
        { 
          tituloLicao: "Taxa de Câmbio", 
          conteudo: "O preço de uma moeda estrangeira em relação ao Real.",
          bulletPoints: ["Dolarização", "Impacto nas exportações", "Viagens e compras"],
        },
        { 
          tituloLicao: "PIB", 
          conteudo: "Produto Interno Bruto, a soma de todas as riquezas do país.",
          bulletPoints: ["Crescimento econômico", "Consumo das famílias", "Investimentos"],
        },
        { 
          tituloLicao: "Spread Bancário", 
          conteudo: "A diferença entre o que o banco paga e o que ele cobra.",
          bulletPoints: ["Lucro do banco", "Custo de crédito", "Inadimplência"],
        }
      ]
    },
    {
      id: 4,
      titulo: "Créditos, Dívidas e Responsabilidade",
      licoes: [
        { 
          tituloLicao: "Cartão de Crédito", 
          conteudo: "Uma ferramenta de pagamento poderosa, mas perigosa.",
          bulletPoints: ["Milhas e Cashback", "Parcelamento sem juros", "Rotativo do cartão"],
        },
        { 
          tituloLicao: "Juros de Empréstimos", 
          conteudo: "Entenda o custo real de usar dinheiro de terceiros.",
          bulletPoints: ["CET (Custo Efetivo Total)", "Garantias", "Prazo de pagamento"],
        },
        { 
          tituloLicao: "Saindo das Dívidas", 
          conteudo: "Passo a passo para negociar e quitar seus débitos.",
          bulletPoints: ["Priorizar juros altos", "Negociação direta", "Troca por dívida barata"],
        },
        { 
          tituloLicao: "Score de Crédito", 
          conteudo: "Sua 'nota' de bom pagador perante as instituições financeiras.",
          bulletPoints: ["Serasa/Boa Vista", "Cadastro Positivo", "Histórico de pagamentos"],
        }
      ]
    },
    {
      id: 5,
      titulo: "Reserva de Emergência e Proteção",
      licoes: [
        { 
          tituloLicao: "Quanto guardar?", 
          conteudo: "O cálculo ideal para dormir tranquilo à noite.",
          bulletPoints: ["Custo de vida mensal", "Estabilidade no emprego", "Dependentes"],
        },
        { 
          tituloLicao: "Liquidez Diária", 
          conteudo: "A rapidez com que você resgata seu dinheiro em urgências.",
          bulletPoints: ["Resgate no mesmo dia", "Segurança extrema", "Títulos públicos/CDBs"],
        },
        { 
          tituloLicao: "Seguros", 
          conteudo: "Proteção contra imprevistos que podem destruir sua riqueza.",
          bulletPoints: ["Seguro de Vida", "Seguro de Auto", "Residencial"],
        },
        { 
          tituloLicao: "Planos de Saúde", 
          conteudo: "Um investimento na sua maior ferramenta: sua saúde.",
          bulletPoints: ["Carência", "Abrangência", "Reembolso"],
        },
        { 
          tituloLicao: "Previdência Social", 
          conteudo: "O teto do INSS e as regras da aposentadoria pública.",
          bulletPoints: ["Tempo de contribuição", "Fator previdenciário", "Idade mínima"],
        },
        { 
          tituloLicao: "Fundos de Emergência", 
          conteudo: "Diferença entre poupar (guardar) e investir (valorizar).",
          bulletPoints: ["Mentalidade poupadora", "Previsibilidade", "Segurança"],
        },
        { 
          tituloLicao: "Paz de Espírito", 
          conteudo: "Como as finanças saudáveis impactam sua saúde mental.",
          bulletPoints: ["Redução de estresse", "Planejamento futuro", "Qualidade de vida"],
        }
      ]
    },
    {
      id: 6,
      titulo: "Trilha dos Investimentos: Renda Fixa",
      licoes: [
        { 
          tituloLicao: "Tesouro Direto", 
          conteudo: "Empreste seu dinheiro para o Brasil e receba com juros.",
          bulletPoints: ["Tesouro Selic", "Tesouro IPCA+", "Tesouro Prefixado"],
        },
        { 
          tituloLicao: "CDBs", 
          conteudo: "Certificados de Depósito Bancário, o investimento mais popular.",
          bulletPoints: ["Rendimento em % CDI", "Pós e prefixados", "Diferentes bancos"],
        },
        { 
          tituloLicao: "LCI e LCA", 
          conteudo: "Títulos isentos de IR focados no setor imobiliário e agro.",
          bulletPoints: ["Imobiliário", "Agronegócio", "Isenção fiscal"],
        },
        { 
          tituloLicao: "Debêntures", 
          conteudo: "Títulos de dívida de empresas privadas para financiar projetos.",
          bulletPoints: ["Infraestrutura", "Risco de crédito", "Prazos longos"],
        },
        { 
          tituloLicao: "FGC", 
          conteudo: "O Fundo Garantidor de Crédito, seu airbag na renda fixa.",
          bulletPoints: ["Garantia até 250k", "Bancos e corretoras", "Quais produtos cobre"],
        }
      ]
    },
    {
      id: 7,
      titulo: "Trilha dos Investimentos: Renda Variável",
      licoes: [
        { 
          tituloLicao: "Ações", 
          conteudo: "Pequenos pedaços de grandes empresas negociados em bolsa.",
          bulletPoints: ["Virar sócio", "Valorização", "Voto e Direitos"],
        },
        { 
          tituloLicao: "Fundos Imobiliários", 
          conteudo: "Invista em imóveis de alto padrão com pouco dinheiro.",
          bulletPoints: ["Renda mensal isenta", "Tijolo e Papel", "Gestão profissional"],
        },
        { 
          tituloLicao: "ETFs", 
          conteudo: "Fundos que replicam um índice inteiro de mercado.",
          bulletPoints: ["BOVA11", "Diversificação barata", "Rebalanceamento automático"],
        },
        { 
          tituloLicao: "Dividendos", 
          conteudo: "Parte do lucro das empresas distribuída aos acionistas.",
          bulletPoints: ["Yeld e Payout", "Renda passiva", "Frequência de pagamento"],
        },
        { 
          tituloLicao: "Riscos da Bolsa", 
          conteudo: "Como lidar com a volatilidade sem entrar em pânico.",
          bulletPoints: ["Circuit Breaker", "Psicologia de mercado", "Ciclos econômicos"],
        },
        { 
          tituloLicao: "Holders vs Traders", 
          conteudo: "A diferença entre investir no negócio e apostar no preço.",
          bulletPoints: ["Buy and Hold", "Análise Fundamentalista", "Curto prazo"],
        }
      ]
    },
    {
      id: 8,
      titulo: "Planejamento de Longo Prazo",
      licoes: [
        { 
          tituloLicao: "Fases da Vida", 
          conteudo: "Adapte seus investimentos conforme sua idade e objetivos.",
          bulletPoints: ["Fase de acúmulo", "Fase de manutenção", "Fase de renda"],
        },
        { 
          tituloLicao: "Aposentadoria Privada", 
          conteudo: "O complemento essencial à previdência pública.",
          bulletPoints: ["PGBL (Dedução IR)", "VGBL (Padrão)", "Regimes tributários"],
        },
        { 
          tituloLicao: "Independência Financeira", 
          conteudo: "O momento em que seu dinheiro trabalha para você.",
          bulletPoints: ["Viver de renda", "Regra dos 4%", "Liberdade geográfica"],
        },
        { 
          tituloLicao: "Sucessão Patrimonial", 
          conteudo: "Planeje como seus bens serão transmitidos aos herdeiros.",
          bulletPoints: ["Holding familiar", "Testamento", "Eficiência tributária"],
        },
        { 
          tituloLicao: "Investimentos no Exterior", 
          conteudo: "Proteja seu patrimônio investindo na maior economia do mundo.",
          bulletPoints: ["Ações americanas (REITs)", "Conta internacional", "Hedge cambial"],
        },
        { 
          tituloLicao: "Rebalanceamento", 
          conteudo: "Venda na alta e compre na baixa de forma metódica.",
          bulletPoints: ["Controlar riscos", "Manter estratégia", "Ajustes periódicos"],
        },
        { 
          tituloLicao: "Filantropia", 
          conteudo: "A importância de retribuir e causar impacto social.",
          bulletPoints: ["Doações planejadas", "Fundações", "Senso de propósito"],
        },
        { 
          tituloLicao: "Checklist Final", 
          conteudo: "Um resumo de tudo para você aplicar hoje mesmo.",
          bulletPoints: ["Próximos passos", "Disciplina mensal", "Monitoramento"],
        }
      ]
    }
  ],
};

export function getModuleById(id: number): ModuleContent | undefined {
  return LEARNING_DOCUMENT.modulos.find((mod) => mod.id === id);
}

