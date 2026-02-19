import { Chat, Contact } from "@/types";
import { contacts, companies } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, Search } from "lucide-react";
import { useState } from "react";

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

export function ChatList({ chats, selectedChatId, onSelectChat }: ChatListProps) {
  const [search, setSearch] = useState("");

  const getContact = (contactId: string) => contacts.find(c => c.id === contactId);
  const getCompany = (companyId: string) => companies.find(c => c.id === companyId);

  const filtered = chats.filter(chat => {
    const contact = getContact(chat.contactId);
    if (!contact) return false;
    const company = getCompany(contact.companyId);
    const term = search.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      company?.razaoSocial.toLowerCase().includes(term) ||
      chat.lastMessage.toLowerCase().includes(term)
    );
  });

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "read") return <CheckCheck className="h-3.5 w-3.5 text-primary" />;
    if (status === "delivered") return <CheckCheck className="h-3.5 w-3.5 text-muted-foreground" />;
    return <Check className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  return (
    <div className="w-80 border-r border-border flex flex-col bg-card h-full">
      {/* Header */}
      <div className="p-3 border-b border-border space-y-3">
        <h2 className="text-base font-semibold text-foreground">Conversas</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar conversa..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm bg-secondary rounded-md border-0 outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Chat Items */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filtered.map(chat => {
          const contact = getContact(chat.contactId);
          const company = contact ? getCompany(contact.companyId) : null;
          if (!contact) return null;

          return (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "w-full flex items-start gap-3 px-3 py-3 text-left transition-colors border-b border-border/50",
                selectedChatId === chat.id
                  ? "bg-accent"
                  : "hover:bg-secondary"
              )}
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                {contact.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground truncate">{contact.name}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{formatTime(chat.lastMessageTime)}</span>
                </div>
                {company && (
                  <span className="text-[10px] text-primary font-medium truncate block">{company.razaoSocial}</span>
                )}
                <div className="flex items-center gap-1 mt-0.5">
                  <StatusIcon status={chat.labels.length > 0 ? "read" : "delivered"} />
                  <span className="text-xs text-muted-foreground truncate">{chat.lastMessage}</span>
                </div>
              </div>

              {/* Unread Badge */}
              {chat.unreadCount > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1">
                  {chat.unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
