import { useState } from "react";
import { Chat, ChatMessage } from "@/types";
import { contacts, companies, users, departments, chatMessages } from "@/data/mockData";
import { Send, Paperclip, Mic, MoreVertical, Tag, ArrowRightLeft, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { labels } from "@/data/mockData";

interface ChatAreaProps {
  chat: Chat;
}

export function ChatArea({ chat }: ChatAreaProps) {
  const [message, setMessage] = useState("");
  const contact = contacts.find(c => c.id === chat.contactId);
  const company = contact ? companies.find(c => c.id === contact.companyId) : null;
  const assignedUser = chat.assignedTo ? users.find(u => u.id === chat.assignedTo) : null;
  const messages = chatMessages.filter(m => m.chatId === chat.id);

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "read") return <CheckCheck className="h-3 w-3 text-primary" />;
    if (status === "delivered") return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
    return <Check className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
            {contact?.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{contact?.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">
              {company?.razaoSocial} · {contact?.cargo}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {assignedUser && (
            <span className="text-[10px] bg-secondary text-secondary-foreground px-2 py-1 rounded-full mr-2">
              {assignedUser.name}
            </span>
          )}
          {chat.labels.map(l => (
            <span key={l} className="text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{l}</span>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-md hover:bg-secondary transition-colors">
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <ArrowRightLeft className="mr-2 h-4 w-4" /> Transferir
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {departments.map(d => (
                    <DropdownMenuItem key={d.id}>{d.name}</DropdownMenuItem>
                  ))}
                  <div className="border-t border-border my-1" />
                  {users.map(u => (
                    <DropdownMenuItem key={u.id}>{u.name}</DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Tag className="mr-2 h-4 w-4" /> Etiquetas
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {labels.map(l => (
                    <DropdownMenuItem key={l}>{l}</DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
        {messages.map(msg => (
          <div key={msg.id} className={cn("flex", msg.sender === "agent" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[70%] rounded-lg px-3 py-2 shadow-sm",
              msg.sender === "agent"
                ? "bg-primary/10 text-foreground rounded-br-sm"
                : "bg-card text-foreground rounded-bl-sm"
            )}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[10px] text-muted-foreground">{formatTime(msg.timestamp)}</span>
                {msg.sender === "agent" && <StatusIcon status={msg.status} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-3 shrink-0">
        <div className="flex items-end gap-2">
          <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors shrink-0">
            <Paperclip className="h-5 w-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Digite uma mensagem..."
              rows={1}
              className="w-full resize-none bg-secondary rounded-lg px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  setMessage("");
                }
              }}
            />
          </div>
          <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors shrink-0">
            <Mic className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMessage("")}
            className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
