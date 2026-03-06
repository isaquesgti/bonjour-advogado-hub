import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Notícias", href: "/dashboard?tab=news" },
  { label: "Jurisprudência", href: "/dashboard?tab=jurisprudence" },
  { label: "Artigos", href: "/dashboard?tab=articles" },
  { label: "Busca", href: "/search" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

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
                location.pathname === item.href
                  ? "text-accent"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/search">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden border-accent text-accent hover:bg-accent hover:text-accent-foreground md:inline-flex">
              Entrar
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
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
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="mt-2 w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                Entrar
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
