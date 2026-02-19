import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  MessageSquare, 
  Building2, 
  Megaphone, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Circle
} from "lucide-react";
import { currentUser } from "@/data/mockData";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Caixa de Entrada", icon: MessageSquare, path: "/", badge: 6 },
  { label: "CRM", icon: Building2, path: "/crm" },
  { label: "Campanhas", icon: Megaphone, path: "/campaigns" },
  { label: "Configurações", icon: Settings, path: "/settings", adminOnly: true },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-200 h-screen sticky top-0",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <span className="text-primary-foreground font-bold text-sm">N</span>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-sidebar-accent-foreground truncate">WhatsApp Nexus</h1>
            <p className="text-[10px] text-sidebar-foreground truncate">Nexus Válvulas e Conexões</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          if (item.adminOnly && currentUser.role !== "admin") return null;
          const isActive = item.path === "/" 
            ? location.pathname === "/" 
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors group relative",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {item.badge && item.badge > 0 && (
                <span className={cn(
                  "bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shrink-0",
                  collapsed ? "absolute -top-1 -right-1 w-4 h-4" : "ml-auto w-5 h-5"
                )}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="border-t border-sidebar-border px-3 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold text-sidebar-accent-foreground">
              {currentUser.name.split(" ").map(n => n[0]).join("")}
            </div>
            <Circle className="absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-success text-success" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-sidebar-accent-foreground truncate">{currentUser.name}</p>
              <p className="text-[10px] text-sidebar-foreground truncate capitalize">{currentUser.role} · {currentUser.department}</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="border-t border-sidebar-border px-3 py-2.5 flex items-center justify-center text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
