import { motion } from "framer-motion";
import { Search, ArrowRight, Scale, Sparkles, Newspaper, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const features = [
  {
    icon: Newspaper,
    title: "Notícias Jurídicas",
    description: "Agregamos as principais fontes de notícias jurídicas do Brasil em um único lugar.",
  },
  {
    icon: Scale,
    title: "Jurisprudência",
    description: "Decisões dos tribunais superiores com resumos em linguagem simples gerados por IA.",
  },
  {
    icon: Sparkles,
    title: "Resumo por IA",
    description: "Inteligência artificial resume decisões complexas em linguagem acessível para advogados.",
  },
  {
    icon: BookOpen,
    title: "Boletim Diário",
    description: "Receba um boletim personalizado com as informações mais relevantes para sua área.",
  },
];

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, hsl(42 52% 54% / 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(42 52% 54% / 0.1) 0%, transparent 50%)"
          }} />
        </div>
        <div className="container relative py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
              Sua inteligência jurídica{" "}
              <span className="text-gradient-gold">começa aqui</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/70 md:text-xl">
              Notícias, jurisprudência e artigos jurídicos agregados e resumidos por IA.
              Tudo que o advogado moderno precisa em uma única plataforma.
            </p>

            <form onSubmit={handleSearch} className="mt-10 flex gap-2 mx-auto max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Busque: ICMS energia STJ, dano moral transporte..."
                  className="h-12 bg-card/10 border-primary-foreground/20 pl-10 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:ring-accent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" className="h-12 bg-accent text-accent-foreground hover:bg-gold-dark px-6">
                Buscar
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-primary-foreground/50">
              <span>Populares:</span>
              {["ICMS energia", "dano moral", "reforma tributária", "teletrabalho"].map((term) => (
                <Link
                  key={term}
                  to={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-primary-foreground/15 px-3 py-1 transition-colors hover:border-accent hover:text-accent"
                >
                  {term}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Tudo que você precisa, em um só lugar
            </h2>
            <p className="mt-3 text-muted-foreground">
              Ferramentas pensadas para o advogado que valoriza seu tempo.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-gold"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-navy py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            Comece a usar <span className="text-gradient-gold">gratuitamente</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/60">
            Crie sua conta e tenha acesso imediato ao boletim jurídico mais completo do Brasil.
          </p>
          <Link to="/login">
            <Button className="mt-8 h-12 bg-accent text-accent-foreground hover:bg-gold-dark px-8 text-base">
              Criar conta gratuita <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
