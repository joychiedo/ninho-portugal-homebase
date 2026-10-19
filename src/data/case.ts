import type { L } from "@/lib/i18n";

export type TaskStatus = "todo" | "in_progress" | "done";
export type DocStatus = "requested" | "received" | "review";
export type ProCategory = "legal" | "finance" | "relocation" | "agent" | "survey" | "tax";

export type Professional = {
  id: string;
  name: string;
  initials: string;
  category: ProCategory;
  location: string;
  languages: string[];
  bio: L;
};

export const professionals: Professional[] = [
  {
    id: "ines-carvalho",
    name: "Inês Carvalho",
    initials: "IC",
    category: "legal",
    location: "Lisboa",
    languages: ["PT", "EN", "DE"],
    bio: { en: "Handles due diligence, promissory contracts and deeds for residential purchases.", pt: "Trata da verificação jurídica, contratos-promessa e escrituras em compras de habitação." },
  },
  {
    id: "rui-mendes",
    name: "Rui Mendes",
    initials: "RM",
    category: "finance",
    location: "Porto · remoto",
    languages: ["PT", "EN"],
    bio: { en: "Compares mortgage options for non-resident buyers and coordinates bank paperwork.", pt: "Compara opções de crédito à habitação para não residentes e coordena a documentação bancária." },
  },
  {
    id: "sofia-almeida",
    name: "Sofia Almeida",
    initials: "SA",
    category: "relocation",
    location: "Lisboa · Cascais",
    languages: ["PT", "EN", "FR"],
    bio: { en: "Helps families with tax numbers, bank accounts, schools and settling in.", pt: "Apoia famílias com NIF, contas bancárias, escolas e adaptação." },
  },
  {
    id: "miguel-duarte",
    name: "Miguel Duarte",
    initials: "MD",
    category: "agent",
    location: "Porto",
    languages: ["PT", "EN", "ES"],
    bio: { en: "Works with buyers searching in central Porto and the Foz area.", pt: "Acompanha compradores à procura no centro do Porto e na zona da Foz." },
  },
  {
    id: "ana-ferreira",
    name: "Ana Ferreira",
    initials: "AF",
    category: "survey",
    location: "Algarve",
    languages: ["PT", "EN"],
    bio: { en: "Carries out building condition surveys on older and rural properties.", pt: "Realiza vistorias ao estado de conservação de imóveis antigos e rurais." },
  },
  {
    id: "joao-pires",
    name: "João Pires",
    initials: "JP",
    category: "tax",
    location: "Cascais",
    languages: ["PT", "EN", "NL"],
    bio: { en: "Explains purchase taxes (IMT, stamp duty) and ongoing property tax (IMI).", pt: "Explica os impostos da compra (IMT, imposto do selo) e o IMI." },
  },
];

export const getPro = (id: string) => professionals.find((p) => p.id === id);

export type Task = { id: string; title: L; due: string; status: TaskStatus; proId: string };
export type Milestone = { id: string; title: L; date: string; state: "done" | "current" | "upcoming" };
export type Doc = { id: string; title: L; status: DocStatus; proId: string };
export type Appointment = { id: string; title: L; date: string; mode: L; proId: string };
export type Activity = { id: string; at: string; text: L };

export type BuyerCase = {
  id: string;
  buyers: string;
  propertyId: string;
  agreedPrice: number;
  stage: L;
  nextAction: L;
  milestones: Milestone[];
  tasks: Task[];
  proIds: string[];
  appointments: Appointment[];
  documents: Doc[];
  activity: Activity[];
};

export const DEMO_TODAY = "2026-10-20";

export const buyerCase: BuyerCase = {
  id: "NH-2026-0417",
  buyers: "Hannah & Tom Becker",
  propertyId: "principe-real-apartment",
  agreedPrice: 870000,
  stage: { en: "Legal due diligence", pt: "Verificação jurídica" },
  nextAction: {
    en: "Review the land registry certificate with Inês before signing the promissory contract (CPCV).",
    pt: "Rever a certidão permanente com a Inês antes de assinar o contrato-promessa (CPCV).",
  },
  milestones: [
    { id: "m1", title: { en: "Search & shortlist", pt: "Pesquisa e seleção" }, date: "2026-08-28", state: "done" },
    { id: "m2", title: { en: "Offer accepted", pt: "Proposta aceite" }, date: "2026-10-02", state: "done" },
    { id: "m3", title: { en: "Legal due diligence", pt: "Verificação jurídica" }, date: "2026-10-30", state: "current" },
    { id: "m4", title: { en: "Promissory contract (CPCV)", pt: "Contrato-promessa (CPCV)" }, date: "2026-11-12", state: "upcoming" },
    { id: "m5", title: { en: "Mortgage approval", pt: "Aprovação do crédito" }, date: "2026-12-04", state: "upcoming" },
    { id: "m6", title: { en: "Deed (escritura) & keys", pt: "Escritura e chaves" }, date: "2027-01-15", state: "upcoming" },
  ],
  tasks: [
    { id: "t1", title: { en: "Obtain Portuguese tax number (NIF)", pt: "Obter número de contribuinte (NIF)" }, due: "2026-09-10", status: "done", proId: "sofia-almeida" },
    { id: "t2", title: { en: "Open a Portuguese bank account", pt: "Abrir conta bancária em Portugal" }, due: "2026-09-24", status: "done", proId: "sofia-almeida" },
    { id: "t3", title: { en: "Review land registry certificate", pt: "Rever a certidão permanente" }, due: "2026-10-24", status: "in_progress", proId: "ines-carvalho" },
    { id: "t4", title: { en: "Confirm habitation licence", pt: "Confirmar a licença de utilização" }, due: "2026-10-28", status: "todo", proId: "ines-carvalho" },
    { id: "t5", title: { en: "Submit mortgage pre-approval documents", pt: "Entregar documentos para pré-aprovação do crédito" }, due: "2026-10-31", status: "in_progress", proId: "rui-mendes" },
    { id: "t6", title: { en: "Sign CPCV and transfer deposit", pt: "Assinar o CPCV e transferir o sinal" }, due: "2026-11-12", status: "todo", proId: "ines-carvalho" },
    { id: "t7", title: { en: "Arrange home insurance quote", pt: "Pedir simulação de seguro multirriscos" }, due: "2026-11-27", status: "todo", proId: "rui-mendes" },
    { id: "t8", title: { en: "Shortlist schools for January", pt: "Selecionar escolas para janeiro" }, due: "2026-12-10", status: "todo", proId: "sofia-almeida" },
  ],
  proIds: ["ines-carvalho", "rui-mendes", "sofia-almeida"],
  appointments: [
    { id: "a1", title: { en: "Due diligence review", pt: "Revisão da verificação jurídica" }, date: "2026-10-23T10:00:00", mode: { en: "Video call", pt: "Videochamada" }, proId: "ines-carvalho" },
    { id: "a2", title: { en: "Bank meeting — mortgage application", pt: "Reunião no banco — pedido de crédito" }, date: "2026-10-29T15:30:00", mode: { en: "In person, Lisbon", pt: "Presencial, Lisboa" }, proId: "rui-mendes" },
    { id: "a3", title: { en: "Second viewing with surveyor", pt: "Segunda visita com vistoria" }, date: "2026-11-05T11:00:00", mode: { en: "At the property", pt: "No imóvel" }, proId: "sofia-almeida" },
  ],
  documents: [
    { id: "d1", title: { en: "Passport copies", pt: "Cópias dos passaportes" }, status: "received", proId: "ines-carvalho" },
    { id: "d2", title: { en: "NIF certificates", pt: "Comprovativos de NIF" }, status: "received", proId: "sofia-almeida" },
    { id: "d3", title: { en: "Proof of funds", pt: "Comprovativo de fundos" }, status: "review", proId: "rui-mendes" },
    { id: "d4", title: { en: "Land registry certificate (certidão permanente)", pt: "Certidão permanente do registo predial" }, status: "review", proId: "ines-carvalho" },
    { id: "d5", title: { en: "Property tax record (caderneta predial)", pt: "Caderneta predial" }, status: "requested", proId: "ines-carvalho" },
    { id: "d6", title: { en: "Habitation licence", pt: "Licença de utilização" }, status: "requested", proId: "ines-carvalho" },
    { id: "d7", title: { en: "Energy certificate", pt: "Certificado energético" }, status: "received", proId: "ines-carvalho" },
  ],
  activity: [
    { id: "s1", at: "2026-10-19T16:40:00", text: { en: "Inês Carvalho marked the land registry certificate as under review", pt: "Inês Carvalho colocou a certidão permanente em análise" } },
    { id: "s2", at: "2026-10-17T11:05:00", text: { en: "Rui Mendes requested proof of funds", pt: "Rui Mendes pediu o comprovativo de fundos" } },
    { id: "s3", at: "2026-10-14T09:20:00", text: { en: "Energy certificate received from the seller's agent", pt: "Certificado energético recebido do agente do vendedor" } },
    { id: "s4", at: "2026-10-02T18:00:00", text: { en: "Offer of €870,000 accepted by the seller", pt: "Proposta de 870 000 € aceite pelo vendedor" } },
  ],
};
