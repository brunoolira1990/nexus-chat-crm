import { User, Contact, Company, Chat, ChatMessage, Department, Campaign } from "@/types";

export const currentUser: User = {
  id: "u1",
  name: "Carlos Silva",
  email: "carlos@nexusvalvulas.com.br",
  role: "admin",
  department: "Comercial",
  online: true,
};

export const users: User[] = [
  currentUser,
  { id: "u2", name: "Ana Souza", email: "ana@nexusvalvulas.com.br", role: "agent", department: "Comercial", online: true },
  { id: "u3", name: "Pedro Lima", email: "pedro@nexusvalvulas.com.br", role: "agent", department: "Financeiro", online: false },
  { id: "u4", name: "Julia Costa", email: "julia@nexusvalvulas.com.br", role: "agent", department: "Logística", online: true },
];

export const departments: Department[] = [
  { id: "d1", name: "Comercial" },
  { id: "d2", name: "Financeiro" },
  { id: "d3", name: "Logística" },
];

export const companies: Company[] = [
  { id: "c1", razaoSocial: "Petroquímica Nacional S.A.", cnpj: "12.345.678/0001-90", inscricaoEstadual: "123.456.789.001", labels: ["VIP", "Indústria"], createdAt: "2024-08-15" },
  { id: "c2", razaoSocial: "Siderúrgica Minas Gerais LTDA", cnpj: "98.765.432/0001-10", inscricaoEstadual: "987.654.321.002", labels: ["Indústria"], createdAt: "2024-09-01" },
  { id: "c3", razaoSocial: "Construtora Rios e Lagos S.A.", cnpj: "11.222.333/0001-44", inscricaoEstadual: "111.222.333.003", labels: ["Construção"], createdAt: "2024-10-20" },
  { id: "c4", razaoSocial: "Termelétrica do Norte LTDA", cnpj: "55.666.777/0001-88", inscricaoEstadual: "555.666.777.004", labels: ["Energia", "VIP"], createdAt: "2025-01-10" },
];

export const contacts: Contact[] = [
  { id: "ct1", name: "Roberto Mendes", phone: "+55 11 99999-0001", cargo: "Gerente de Compras", companyId: "c1", labels: ["Decisor"] },
  { id: "ct2", name: "Fernanda Oliveira", phone: "+55 11 99999-0002", cargo: "Engenheira de Processos", companyId: "c1", labels: ["Técnico"] },
  { id: "ct3", name: "Marcos Tavares", phone: "+55 31 98888-0003", cargo: "Diretor Industrial", companyId: "c2", labels: ["Decisor", "VIP"] },
  { id: "ct4", name: "Luciana Braga", phone: "+55 21 97777-0004", cargo: "Coordenadora de Obras", companyId: "c3", labels: [] },
  { id: "ct5", name: "Thiago Ramos", phone: "+55 92 96666-0005", cargo: "Comprador", companyId: "c4", labels: ["Decisor"] },
  { id: "ct6", name: "Patrícia Duarte", phone: "+55 92 96666-0006", cargo: "Engenheira de Manutenção", companyId: "c4", labels: ["Técnico"] },
];

export const chats: Chat[] = [
  { id: "ch1", contactId: "ct1", assignedTo: "u1", department: "Comercial", lastMessage: "Bom dia! Preciso de orçamento para 50 válvulas gaveta 6\"", lastMessageTime: "2026-02-19T09:45:00", unreadCount: 2, labels: ["Orçamento"], status: "open" },
  { id: "ch2", contactId: "ct3", assignedTo: "u2", department: "Comercial", lastMessage: "Qual o prazo de entrega das flanges ANSI 150?", lastMessageTime: "2026-02-19T09:30:00", unreadCount: 0, labels: ["Prazo"], status: "open" },
  { id: "ch3", contactId: "ct4", assignedTo: "u1", department: "Comercial", lastMessage: "Vocês trabalham com conexões em aço inox 316?", lastMessageTime: "2026-02-19T08:15:00", unreadCount: 1, labels: [], status: "open" },
  { id: "ch4", contactId: "ct5", assignedTo: "u3", department: "Financeiro", lastMessage: "Segue comprovante de pagamento da NF 4521", lastMessageTime: "2026-02-18T16:00:00", unreadCount: 0, labels: ["Financeiro"], status: "open" },
  { id: "ch5", contactId: "ct2", assignedTo: null, department: "Comercial", lastMessage: "Podem enviar a ficha técnica da válvula borboleta?", lastMessageTime: "2026-02-18T14:20:00", unreadCount: 3, labels: ["Técnico"], status: "open" },
];

export const chatMessages: ChatMessage[] = [
  { id: "m1", chatId: "ch1", content: "Bom dia! Preciso de orçamento para 50 válvulas gaveta 6\" classe 150.", sender: "customer", timestamp: "2026-02-19T09:40:00", status: "read", type: "text" },
  { id: "m2", chatId: "ch1", content: "Material em aço carbono, flange ANSI B16.5", sender: "customer", timestamp: "2026-02-19T09:42:00", status: "read", type: "text" },
  { id: "m3", chatId: "ch1", content: "Bom dia Roberto! Tudo bem? Vou preparar o orçamento. Qual o prazo de necessidade?", sender: "agent", timestamp: "2026-02-19T09:44:00", status: "read", type: "text" },
  { id: "m4", chatId: "ch1", content: "Precisamos para entrega em março se possível.", sender: "customer", timestamp: "2026-02-19T09:45:00", status: "delivered", type: "text" },
  { id: "m5", chatId: "ch2", content: "Qual o prazo de entrega das flanges ANSI 150?", sender: "customer", timestamp: "2026-02-19T09:30:00", status: "read", type: "text" },
  { id: "m6", chatId: "ch3", content: "Vocês trabalham com conexões em aço inox 316?", sender: "customer", timestamp: "2026-02-19T08:15:00", status: "delivered", type: "text" },
];

export const campaigns: Campaign[] = [
  { id: "cp1", name: "Promoção Flanges Fevereiro", template: "promo_flanges_fev", status: "sent", targetCount: 120, sentCount: 118, createdAt: "2026-02-01" },
  { id: "cp2", name: "Novos Produtos - Válvulas Esfera", template: "novos_produtos_valvulas", status: "draft", targetCount: 0, sentCount: 0, createdAt: "2026-02-15" },
];

export const labels = ["VIP", "Orçamento", "Prazo", "Técnico", "Financeiro", "Decisor", "Indústria", "Construção", "Energia"];
