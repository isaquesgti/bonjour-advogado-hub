import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/NewsCard";
import { JurisprudenceCard } from "@/components/JurisprudenceCard";
import { ArticleCard } from "@/components/ArticleCard";
import { mockNews, mockJurisprudence, mockArticles, categories } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Scale, BookOpen, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredNews = selectedCategory
    ? mockNews.filter((n) => n.category === selectedCategory)
    : mockNews;
  const filteredJuris = selectedCategory
    ? mockJurisprudence.filter((j) => j.category === selectedCategory)
    : mockJurisprudence;
  const filteredArticles = selectedCategory
    ? mockArticles.filter((a) => a.category === selectedCategory)
    : mockArticles;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {[
              { icon: Newspaper, label: "Notícias Hoje", value: "24" },
              { icon: Scale, label: "Jurisprudência", value: "156" },
              { icon: BookOpen, label: "Artigos", value: "38" },
              { icon: TrendingUp, label: "Atualizações", value: "1.2k" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <stat.icon className="h-4 w-4 text-accent" />
                  <span className="text-xs font-medium">{stat.label}</span>
                </div>
                <p className="mt-1 font-display text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Category filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? "default" : "secondary"}
              className={`cursor-pointer ${
                selectedCategory === null
                  ? "bg-accent text-accent-foreground hover:bg-gold-dark"
                  : "hover:bg-secondary"
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
                    ? "bg-accent text-accent-foreground hover:bg-gold-dark"
                    : "hover:bg-secondary"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="news" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="news" className="data-[state=active]:bg-card data-[state=active]:text-accent">
                <Newspaper className="mr-2 h-4 w-4" /> Notícias
              </TabsTrigger>
              <TabsTrigger value="jurisprudence" className="data-[state=active]:bg-card data-[state=active]:text-accent">
                <Scale className="mr-2 h-4 w-4" /> Jurisprudência
              </TabsTrigger>
              <TabsTrigger value="articles" className="data-[state=active]:bg-card data-[state=active]:text-accent">
                <BookOpen className="mr-2 h-4 w-4" /> Artigos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="news">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredNews.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NewsCard item={item} />
                  </motion.div>
                ))}
              </div>
              {filteredNews.length === 0 && (
                <p className="py-12 text-center text-muted-foreground">Nenhuma notícia encontrada nesta categoria.</p>
              )}
            </TabsContent>

            <TabsContent value="jurisprudence">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredJuris.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <JurisprudenceCard item={item} />
                  </motion.div>
                ))}
              </div>
              {filteredJuris.length === 0 && (
                <p className="py-12 text-center text-muted-foreground">Nenhuma jurisprudência encontrada nesta categoria.</p>
              )}
            </TabsContent>

            <TabsContent value="articles">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredArticles.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ArticleCard item={item} />
                  </motion.div>
                ))}
              </div>
              {filteredArticles.length === 0 && (
                <p className="py-12 text-center text-muted-foreground">Nenhum artigo encontrado nesta categoria.</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
