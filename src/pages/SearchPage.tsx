import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { JurisprudenceCard } from "@/components/JurisprudenceCard";
import { ArticleCard } from "@/components/ArticleCard";
import { mockNews, mockJurisprudence, mockArticles, categories } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const q = query.toLowerCase();

  const matchNews = mockNews.filter(
    (n) =>
      (!selectedCategory || n.category === selectedCategory) &&
      (n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q)))
  );

  const matchJuris = mockJurisprudence.filter(
    (j) =>
      (!selectedCategory || j.category === selectedCategory) &&
      (j.title.toLowerCase().includes(q) ||
        j.summary.toLowerCase().includes(q) ||
        j.court.toLowerCase().includes(q) ||
        j.tags.some((t) => t.toLowerCase().includes(q)))
  );

  const matchArticles = mockArticles.filter(
    (a) =>
      (!selectedCategory || a.category === selectedCategory) &&
      (a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)))
  );

  const totalResults = matchNews.length + matchJuris.length + matchArticles.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl font-bold text-foreground">Busca Inteligente</h1>
            <p className="mt-1 text-muted-foreground">
              Digite termos como "ICMS energia STJ" ou "dano moral transporte"
            </p>
          </motion.div>

          <div className="mt-6 flex gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar notícias, jurisprudência, artigos..."
                className="h-12 pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Badge
              variant={selectedCategory === null ? "default" : "secondary"}
              className={`cursor-pointer ${
                selectedCategory === null
                  ? "bg-accent text-accent-foreground"
                  : ""
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              Todas
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={selectedCategory === cat ? "default" : "secondary"}
                className={`cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {query && (
            <p className="mt-4 text-sm text-muted-foreground">
              {totalResults} resultado{totalResults !== 1 ? "s" : ""} encontrado{totalResults !== 1 ? "s" : ""}
            </p>
          )}

          <div className="mt-6 space-y-8">
            {matchJuris.length > 0 && (
              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">Jurisprudência</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {matchJuris.map((item) => (
                    <JurisprudenceCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}

            {matchNews.length > 0 && (
              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">Notícias</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {matchNews.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}

            {matchArticles.length > 0 && (
              <section>
                <h2 className="mb-3 font-display text-xl font-semibold text-foreground">Artigos</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {matchArticles.map((item) => (
                    <ArticleCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}

            {query && totalResults === 0 && (
              <div className="py-16 text-center">
                <p className="font-display text-xl text-foreground">Nenhum resultado encontrado</p>
                <p className="mt-2 text-muted-foreground">Tente termos diferentes ou remova os filtros.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
