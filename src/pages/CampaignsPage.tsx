import { campaigns, companies, contacts, labels } from "@/data/mockData";
import { Megaphone, Send, Clock, CheckCircle2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CampaignsPage() {
  const statusConfig = {
    draft: { label: "Rascunho", icon: Clock, color: "text-muted-foreground bg-secondary" },
    sending: { label: "Enviando", icon: Send, color: "text-primary bg-primary/10" },
    sent: { label: "Enviada", icon: CheckCircle2, color: "text-success bg-success/10" },
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campanhas</h1>
          <p className="text-sm text-muted-foreground mt-1">Disparos em massa com templates aprovados pela Meta</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Nova Campanha
        </button>
      </div>

      {/* Campaign Cards */}
      <div className="grid gap-4">
        {campaigns.map(campaign => {
          const cfg = statusConfig[campaign.status];
          return (
            <div key={campaign.id} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{campaign.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Template: <span className="font-mono">{campaign.template}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Criada em {new Date(campaign.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                <span className={cn("flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full", cfg.color)}>
                  <cfg.icon className="h-3.5 w-3.5" /> {cfg.label}
                </span>
              </div>
              {campaign.status !== "draft" && (
                <div className="mt-4 pt-4 border-t border-border flex items-center gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Destinatários</p>
                    <p className="text-lg font-bold text-foreground">{campaign.targetCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Enviados</p>
                    <p className="text-lg font-bold text-foreground">{campaign.sentCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Taxa de Entrega</p>
                    <p className="text-lg font-bold text-primary">
                      {campaign.targetCount > 0 ? Math.round((campaign.sentCount / campaign.targetCount) * 100) : 0}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Filters Info */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Filtros Disponíveis para Seleção</h3>
        <div className="flex flex-wrap gap-2">
          {labels.map(l => (
            <span key={l} className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full cursor-pointer hover:bg-accent transition-colors">{l}</span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {companies.length} empresas e {contacts.length} contatos disponíveis para segmentação
        </p>
      </div>
    </div>
  );
}
