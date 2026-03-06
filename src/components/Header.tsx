import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Scale, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const publicNavItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Busca", href: "/search" },
];

const authNavItems = [
  { label: "Monitoramento", href: "/monitoring" },
  { label: "Notícias", href: "/dashboard" },
  { label: "Busca", href: "/search" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut, profile } = useAuth();

  const navItems = user ? authNavItems : publicNavItems;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Scale className="h-7 w-7 text-accent" />
          <span className="font-display text-xl font-bold text-foreground">
            Bonjour <span className="text-accent">Advogado</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${
                location.pathname === item.href ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground ${
                location.pathname === "/admin" ? "text-accent" : "text-muted-foreground"
              }`}
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{profile?.full_name || user.email}</span>
              <Button variant="outline" size="sm" className="border-border" onClick={signOut}>
                <LogOut className="mr-1 h-4 w-4" /> Sair
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden border-accent text-accent hover:bg-accent hover:text-accent-foreground md:inline-flex">
                Entrar
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
                Admin
              </Link>
            )}
            {user ? (
              <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => { signOut(); setMobileOpen(false); }}>
                <LogOut className="mr-1 h-4 w-4" /> Sair
              </Button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" className="mt-2 w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  Entrar
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
