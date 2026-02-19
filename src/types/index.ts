import { LucideIcon } from "lucide-react";

export type UserRole = "admin" | "agent";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
  online: boolean;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  cargo: string;
  companyId: string;
  labels: string[];
  avatarUrl?: string;
}

export interface Company {
  id: string;
  razaoSocial: string;
  cnpj: string;
  inscricaoEstadual: string;
  labels: string[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  content: string;
  timestamp: string;
  sender: "customer" | "agent";
  status: "sent" | "delivered" | "read";
  type: "text" | "audio" | "file";
  fileName?: string;
}

export interface Chat {
  id: string;
  contactId: string;
  assignedTo: string | null;
  department: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  labels: string[];
  status: "open" | "closed";
}

export interface Department {
  id: string;
  name: string;
}

export interface Campaign {
  id: string;
  name: string;
  template: string;
  status: "draft" | "sending" | "sent";
  targetCount: number;
  sentCount: number;
  createdAt: string;
}
