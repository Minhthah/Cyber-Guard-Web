import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { 
  Shield, AlertTriangle, CheckCircle, ShoppingCart, 
  Trophy, Trash2, Play, User, Terminal, Search,
  ShieldCheck, Bot, Swords, Clock, Lightbulb, Coins,
  Scan, ShieldHalf, type LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  "shield-half": ShieldHalf,
  "shield-check": ShieldCheck,
  "alert-triangle": AlertTriangle,
  "check-circle": CheckCircle,
  "shopping-cart": ShoppingCart,
  trophy: Trophy,
  trash: Trash2,
  play: Play,
  user: User,
  terminal: Terminal,
  search: Search,
  bot: Bot,
  swords: Swords,
  clock: Clock,
  lightbulb: Lightbulb,
  coins: Coins,
  scan: Scan,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || User;
}

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blue" | "red" | "green" | "gold";
  icon?: LucideIcon;
  fullWidth?: boolean;
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = "blue", icon: Icon, fullWidth = true, children, ...props }, ref) => {
    const variantStyles = {
      blue: "border-[#00f3ff] text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black hover:shadow-[0_0_20px_#00f3ff]",
      red: "border-[#ff0055] text-[#ff0055] hover:bg-[#ff0055] hover:text-white hover:shadow-[0_0_20px_#ff0055]",
      green: "border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black hover:shadow-[0_0_20px_#00ff9d]",
      gold: "border-[#ffd700] text-[#ffd700] hover:bg-[#ffd700] hover:text-black hover:shadow-[0_0_20px_#ffd700]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "bg-transparent border-2 py-3 px-4 font-bold uppercase flex items-center justify-center gap-2 transition-all duration-200 rounded-sm",
          variantStyles[variant],
          fullWidth && "w-full",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none",
          className
        )}
        {...props}
      >
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </button>
    );
  }
);

CyberButton.displayName = "CyberButton";