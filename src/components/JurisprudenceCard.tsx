import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { JurisprudenceItem } from "@/data/mockData";
import { Calendar, Sparkles, Landmark } from "lucide-react";

interface JurisprudenceCardProps {
  item: JurisprudenceItem;
}

export function JurisprudenceCard({ item }: JurisprudenceCardProps) {
  return (
    <Card className="group cursor-pointer border-border transition-all hover:border-accent/30 hover:shadow-gold">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-accent/10 text-accent text-xs font-medium">
              {item.category}
            </Badge>
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Landmark className="h-3 w-3" /> {item.court}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(item.date).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-tight text-foreground group-hover:text-accent transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-muted-foreground">{item.caseNumber}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
        <div className="rounded-lg bg-accent/5 border border-accent/10 p-3">
          <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-accent">
            <Sparkles className="h-3 w-3" /> Resumo IA
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{item.aiSummary}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
