import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: "green" | "blue" | "pink" | "gold";
  showLabel?: boolean;
  label?: string;
  height?: "sm" | "md" | "lg";
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = "green",
  showLabel = false,
  label,
  height = "md",
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantColors = {
    green: "bg-[#00ff9d]",
    blue: "bg-[#00f3ff]",
    pink: "bg-[#ff0055]",
    gold: "bg-[#ffd700]",
  };

  const heightStyles = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">{label}</span>
          <span className="text-foreground">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-[#333] rounded-sm overflow-hidden", heightStyles[height])}>
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out",
            variantColors[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}