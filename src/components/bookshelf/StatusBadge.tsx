import { Badge } from "@/components/ui/badge";
import type { ReadingStatusValue } from "@/domain/value-objects/ReadingStatus";

interface StatusBadgeProps {
  status: ReadingStatusValue;
}

const STATUS_CONFIG: Record<
  ReadingStatusValue,
  { label: string; variant: "success" | "info" | "warning" | "muted" }
> = {
  read: { label: "✓ Read", variant: "success" },
  reading: { label: "📖 Reading", variant: "info" },
  "want-to-read": { label: "⭐ Want to Read", variant: "warning" },
  abandoned: { label: "✗ Abandoned", variant: "muted" },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
