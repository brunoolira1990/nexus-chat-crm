import { useState } from "react";
import { companies, contacts, chats } from "@/data/mockData";
import { Building2, Search, Users, MessageSquare, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CrmPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const selectedCompany = companies.find(c => c.id === selectedCompanyId);
  const companyContacts = selectedCompanyId ? contacts.filter(c => c.companyId === selectedCompanyId) : [];

  const filtered = companies.filter(c =>
    c.razaoSocial.toLowerCase().includes(search.toLowerCase()) ||
    c.cnpj.includes(search)
  );

  const getContactCount = (companyId: string) => contacts.filter(c => c.companyId === companyId).length;
  const getChatCount = (companyId: string) => {
    const companyContactIds = contacts.filter(c => c.companyId === companyId).map(c => c.id);
    return chats.filter(ch => companyContactIds.includes(ch.contactId)).length;
  };

  return (
    <div className="flex h-screen">
      {/* Company List */}
      <div className="w-96 border-r border-border flex flex-col bg-card">
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Empresas</h2>
            <span className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded-full">{companies.length}</span>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por razão social ou CNPJ..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm bg-secondary rounded-md outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {filtered.map(company => (
            <button
              key={company.id}
              onClick={() => setSelectedCompanyId(company.id)}
              className={cn(
                "w-full text-left px-4 py-3 border-b border-border/50 transition-colors",
                selectedCompanyId === company.id ? "bg-accent" : "hover:bg-secondary"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{company.razaoSocial}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">CNPJ: {company.cnpj}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Users className="h-3 w-3" /> {getContactCount(company.id)} contatos
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <MessageSquare className="h-3 w-3" /> {getChatCount(company.id)} conversas
                    </span>
                  </div>
                  {company.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {company.labels.map(l => (
                        <span key={l} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">{l}</span>
                      ))}
                    </div>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Company Detail */}
      <div className="flex-1 overflow-y-auto">
        {selectedCompany ? (
          <div className="p-6 space-y-6 max-w-3xl">
            {/* Company Header */}
            <div className="bg-card rounded-lg border border-border p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Building2 className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedCompany.razaoSocial}</h2>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">CNPJ: {selectedCompany.cnpj}</span>
                    <span className="text-xs text-muted-foreground">IE: {selectedCompany.inscricaoEstadual}</span>
                  </div>
                </div>
              </div>
              {selectedCompany.labels.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedCompany.labels.map(l => (
                    <span key={l} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">{l}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Contacts */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" /> Contatos Vinculados ({companyContacts.length})
              </h3>
              <div className="grid gap-2">
                {companyContacts.map(ct => (
                  <div key={ct.id} className="bg-card rounded-lg border border-border p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                      {ct.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{ct.name}</p>
                      <p className="text-xs text-muted-foreground">{ct.cargo} · {ct.phone}</p>
                    </div>
                    {ct.labels.length > 0 && (
                      <div className="flex gap-1 shrink-0">
                        {ct.labels.map(l => (
                          <span key={l} className="text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded-full">{l}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent conversations */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" /> Conversas Recentes
              </h3>
              <div className="grid gap-2">
                {chats
                  .filter(ch => companyContacts.some(ct => ct.id === ch.contactId))
                  .map(ch => {
                    const ct = contacts.find(c => c.id === ch.contactId);
                    return (
                      <div key={ch.id} className="bg-card rounded-lg border border-border p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-foreground">{ct?.name}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(ch.lastMessageTime).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{ch.lastMessage}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center space-y-3">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground/30" />
              <p className="text-sm">Selecione uma empresa para ver detalhes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
