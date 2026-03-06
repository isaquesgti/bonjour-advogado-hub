import { Scale } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-accent" />
              <span className="font-display text-lg font-bold text-primary-foreground">
                Bonjour <span className="text-accent">Advogado</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-primary-foreground/60">
              Sua plataforma jurídica inteligente. Informação de qualidade para advogados exigentes.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-primary-foreground">Conteúdo</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/dashboard" className="hover:text-accent transition-colors">Notícias</Link></li>
              <li><Link to="/dashboard" className="hover:text-accent transition-colors">Jurisprudência</Link></li>
              <li><Link to="/dashboard" className="hover:text-accent transition-colors">Artigos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-primary-foreground">Plataforma</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/search" className="hover:text-accent transition-colors">Busca Inteligente</Link></li>
              <li><span className="cursor-default">Boletim Diário</span></li>
              <li><span className="cursor-default">API para Escritórios</span></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-primary-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><span className="cursor-default">Termos de Uso</span></li>
              <li><span className="cursor-default">Política de Privacidade</span></li>
              <li><span className="cursor-default">Contato</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Bonjour Advogado. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
