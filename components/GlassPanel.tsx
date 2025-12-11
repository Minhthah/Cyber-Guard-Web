import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  neonBorder?: "blue" | "green" | "pink" | "gold" | "none";
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, neonBorder = "none", children, ...props }, ref) => {
    const borderColors = {
      blue: "border-[#00f3ff]",
      green: "border-[#00ff9d]",
      pink: "border-[#ff0055]",
      gold: "border-[#ffd700]",
      none: "border-[#333]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "glass-panel rounded-md p-5 flex flex-col relative",
          borderColors[neonBorder],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";