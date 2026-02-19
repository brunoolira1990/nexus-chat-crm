import { Chat } from "@/types";
import { contacts, companies } from "@/data/mockData";
import { Building2, User, Phone, FileText, Hash } from "lucide-react";

interface CrmPanelProps {
  chat: Chat;
}

export function CrmPanel({ chat }: CrmPanelProps) {
  const contact = contacts.find(c => c.id === chat.contactId);
  const company = contact ? companies.find(c => c.id === contact.companyId) : null;
  const relatedContacts = company ? contacts.filter(c => c.companyId === company.id) : [];

  return (
    <div className="w-72 border-l border-border bg-card flex flex-col h-full overflow-y-auto scrollbar-thin">
      {/* Contact Section */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <User className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Contato</h3>
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
              {contact?.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{contact?.name}</p>
              <p className="text-xs text-muted-foreground">{contact?.cargo}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{contact?.phone}</span>
          </div>
          {contact?.labels && contact.labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {contact.labels.map(l => (
                <span key={l} className="text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{l}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Company Section */}
      {company && (
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Empresa Vinculada</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{company.razaoSocial}</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileText className="h-3 w-3" />
                <span>CNPJ: {company.cnpj}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Hash className="h-3 w-3" />
                <span>IE: {company.inscricaoEstadual}</span>
              </div>
            </div>
            {company.labels.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {company.labels.map(l => (
                  <span key={l} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{l}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Related Contacts */}
      {relatedContacts.length > 1 && (
        <div className="p-4">
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
            Outros Contatos ({relatedContacts.length - 1})
          </h3>
          <div className="space-y-2">
            {relatedContacts
              .filter(c => c.id !== contact?.id)
              .map(c => (
                <div key={c.id} className="flex items-center gap-2 p-2 rounded-md bg-secondary/50">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary shrink-0">
                    {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{c.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{c.cargo}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
