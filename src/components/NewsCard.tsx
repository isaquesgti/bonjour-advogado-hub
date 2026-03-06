import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { NewsItem } from "@/data/mockData";
import { Calendar, ExternalLink } from "lucide-react";

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <Card className="group cursor-pointer border-border transition-all hover:border-accent/30 hover:shadow-gold">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-accent/10 text-accent text-xs font-medium">
            {item.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(item.date).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-tight text-foreground group-hover:text-accent transition-colors">
          {item.title}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            {item.source} <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
