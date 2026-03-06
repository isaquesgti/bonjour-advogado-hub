export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  date: string;
  tags: string[];
  imageUrl?: string;
}

export interface JurisprudenceItem {
  id: string;
  title: string;
  court: string;
  caseNumber: string;
  summary: string;
  aiSummary: string;
  category: string;
  date: string;
  tags: string[];
}

export interface ArticleItem {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl?: string;
}

export const categories = [
  "Civil", "Criminal", "Trabalhista", "Tributário", "Administrativo",
  "Constitucional", "Ambiental", "Empresarial", "Digital", "Família"
] as const;

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "STF decide sobre a constitucionalidade da cobrança de ICMS sobre energia elétrica",
    summary: "O Supremo Tribunal Federal decidiu por unanimidade que a cobrança de ICMS sobre energia elétrica deve seguir as alíquotas gerais, e não as majoradas.",
    category: "Tributário",
    source: "Conjur",
    date: "2026-03-06",
    tags: ["ICMS", "Energia", "STF", "Tributário"],
  },
  {
    id: "2",
    title: "Nova lei de proteção de dados pessoais entra em vigor com novas penalidades",
    summary: "As empresas que não se adequarem às novas regras de proteção de dados poderão sofrer multas de até 2% do faturamento bruto anual.",
    category: "Digital",
    source: "Migalhas",
    date: "2026-03-05",
    tags: ["LGPD", "Dados Pessoais", "Compliance"],
  },
  {
    id: "3",
    title: "TST fixa novo entendimento sobre horas extras em regime de teletrabalho",
    summary: "O Tribunal Superior do Trabalho fixou tese vinculante sobre o controle de jornada para trabalhadores em regime de teletrabalho.",
    category: "Trabalhista",
    source: "JOTA",
    date: "2026-03-04",
    tags: ["Teletrabalho", "Horas Extras", "TST"],
  },
  {
    id: "4",
    title: "Reforma do Código Civil avança com mudanças no direito de família",
    summary: "A comissão especial aprovou as principais mudanças no livro de família do Código Civil, incluindo novas regras para guarda compartilhada.",
    category: "Família",
    source: "Valor Econômico",
    date: "2026-03-03",
    tags: ["Código Civil", "Família", "Reforma"],
  },
];

export const mockJurisprudence: JurisprudenceItem[] = [
  {
    id: "1",
    title: "Responsabilidade civil por dano moral em transporte público",
    court: "STJ",
    caseNumber: "REsp 1.234.567/SP",
    summary: "A Segunda Turma do STJ decidiu que a empresa de transporte público responde objetivamente por danos morais causados a passageiros em decorrência de acidentes.",
    aiSummary: "Empresa de ônibus deve indenizar passageiro que se machucou em acidente, mesmo sem culpa direta. A responsabilidade é automática por ser serviço público.",
    category: "Civil",
    date: "2026-03-05",
    tags: ["Dano Moral", "Transporte", "Responsabilidade Civil"],
  },
  {
    id: "2",
    title: "Incidência de ICMS sobre energia elétrica - alíquota geral",
    court: "STJ",
    caseNumber: "REsp 2.345.678/MG",
    summary: "O STJ confirmou que o ICMS sobre energia elétrica deve ser cobrado pela alíquota geral do estado, não podendo ser superior à alíquota aplicável às mercadorias em geral.",
    aiSummary: "O imposto ICMS cobrado na conta de luz não pode ser mais caro que o cobrado em produtos normais. Estados devem usar a mesma taxa para energia e mercadorias.",
    category: "Tributário",
    date: "2026-03-04",
    tags: ["ICMS", "Energia", "Alíquota"],
  },
  {
    id: "3",
    title: "Nulidade de cláusula contratual abusiva em contratos de adesão",
    court: "TJSP",
    caseNumber: "AC 3.456.789/SP",
    summary: "O TJSP declarou nula cláusula contratual que impunha multa desproporcional ao consumidor em contrato de adesão de telefonia móvel.",
    aiSummary: "Multa abusiva em contrato de celular foi cancelada pelo tribunal. Empresas não podem cobrar valores desproporcionais quando o cliente cancela o contrato.",
    category: "Civil",
    date: "2026-03-03",
    tags: ["Consumidor", "Contrato", "Cláusula Abusiva"],
  },
];

export const mockArticles: ArticleItem[] = [
  {
    id: "1",
    title: "O impacto da inteligência artificial no Direito brasileiro",
    author: "Dr. Carlos Mendes",
    excerpt: "Uma análise aprofundada sobre como a IA está transformando a prática jurídica no Brasil, desde a automação de tarefas até a análise preditiva de decisões judiciais.",
    category: "Digital",
    date: "2026-03-06",
    readTime: "8 min",
    tags: ["IA", "Tecnologia", "Jurimetria"],
  },
  {
    id: "2",
    title: "Guia prático: como se preparar para a nova reforma tributária",
    author: "Dra. Ana Beatriz Lima",
    excerpt: "Um guia completo para advogados tributaristas sobre as principais mudanças da reforma e como orientar seus clientes durante a transição.",
    category: "Tributário",
    date: "2026-03-05",
    readTime: "12 min",
    tags: ["Reforma Tributária", "IBS", "CBS"],
  },
  {
    id: "3",
    title: "Jurisprudência defensiva: análise crítica das barreiras recursais",
    author: "Prof. Roberto Alves",
    excerpt: "Uma reflexão sobre como os tribunais superiores têm utilizado requisitos formais para impedir o conhecimento de recursos, limitando o acesso à justiça.",
    category: "Civil",
    date: "2026-03-04",
    readTime: "10 min",
    tags: ["Processo Civil", "Recursos", "Acesso à Justiça"],
  },
];
