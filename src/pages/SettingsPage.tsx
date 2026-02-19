import { users, departments } from "@/data/mockData";
import { useState } from "react";
import { Users, Building, Key, Shield, Circle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "team" | "api";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("team");

  const tabs = [
    { id: "team" as Tab, label: "Equipe e Departamentos", icon: Users },
    { id: "api" as Tab, label: "Integração API Meta", icon: Key },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">Gerenciamento de equipe e integrações</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-lg p-1 w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
              tab === t.id ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      {tab === "team" && (
        <div className="space-y-6">
          {/* Users */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Membros da Equipe</h3>
              <button className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                <Plus className="h-3.5 w-3.5" /> Adicionar Membro
              </button>
            </div>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Nome</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Email</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Perfil</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Departamento</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-border/50 last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-semibold text-primary">
                            {u.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <span className="text-sm font-medium text-foreground">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{u.email}</td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide",
                          u.role === "admin" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                        )}>
                          <Shield className="h-3 w-3 inline mr-1" />{u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{u.department}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5 text-xs">
                          <Circle className={cn("h-2 w-2 fill-current", u.online ? "text-success" : "text-muted-foreground")} />
                          {u.online ? "Online" : "Offline"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Departments */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Departamentos / Filas</h3>
              <button className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                <Plus className="h-3.5 w-3.5" /> Novo Departamento
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {departments.map(d => (
                <div key={d.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Building className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{d.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {users.filter(u => u.department === d.name).length} membros
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "api" && (
        <div className="bg-card border border-border rounded-lg p-6 max-w-xl space-y-5">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-1">API WhatsApp Business</h3>
            <p className="text-xs text-muted-foreground">Configure as credenciais para integração com a API oficial da Meta.</p>
          </div>
          <div className="space-y-4">
            {[
              { label: "Access Token", placeholder: "EAAxxxxxxx..." },
              { label: "Phone Number ID", placeholder: "1234567890" },
              { label: "WhatsApp Business Account ID", placeholder: "9876543210" },
              { label: "Webhook Verify Token", placeholder: "meu_token_seguro" },
            ].map(field => (
              <div key={field.label}>
                <label className="text-xs font-medium text-foreground block mb-1.5">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2.5 text-sm bg-secondary rounded-md outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
                />
              </div>
            ))}
          </div>
          <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Salvar Configurações
          </button>
        </div>
      )}
    </div>
  );
}
