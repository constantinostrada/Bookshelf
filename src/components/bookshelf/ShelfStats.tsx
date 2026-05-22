import { BookOpen, CheckCircle, Clock, XCircle, Library } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ShelfSummaryDto } from "@/application/dtos/BookDto";

interface ShelfStatsProps {
  summary: ShelfSummaryDto;
}

export function ShelfStats({ summary }: ShelfStatsProps) {
  const stats = [
    {
      label: "Total Books",
      value: summary.total,
      icon: Library,
      colour: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-950",
    },
    {
      label: "Reading",
      value: summary.reading,
      icon: BookOpen,
      colour: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950",
    },
    {
      label: "Finished",
      value: summary.read,
      icon: CheckCircle,
      colour: "text-green-500",
      bg: "bg-green-50 dark:bg-green-950",
    },
    {
      label: "Want to Read",
      value: summary.wantToRead,
      icon: Clock,
      colour: "text-yellow-500",
      bg: "bg-yellow-50 dark:bg-yellow-950",
    },
    {
      label: "Abandoned",
      value: summary.abandoned,
      icon: XCircle,
      colour: "text-gray-400",
      bg: "bg-gray-50 dark:bg-gray-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className={`rounded-lg p-2 ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.colour}`} />
            </div>
            <div>
              <p className="text-2xl font-bold leading-none">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
