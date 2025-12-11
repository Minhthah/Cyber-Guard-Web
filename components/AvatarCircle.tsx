import { 
  User, Terminal, Search, ShieldCheck, Bot, Swords, 
  type LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

const avatarIcons: Record<string, LucideIcon> = {
  user: User,
  terminal: Terminal,
  search: Search,
  "shield-check": ShieldCheck,
  bot: Bot,
  swords: Swords,
};

interface AvatarCircleProps {
  icon: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AvatarCircle({ icon, size = "md", className }: AvatarCircleProps) {
  const Icon = avatarIcons[icon] || User;
  
  const sizeStyles = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div
      className={cn(
        "rounded-full border-[3px] border-[#00ff9d] flex items-center justify-center bg-black",
        sizeStyles[size],
        className
      )}
    >
      <Icon className={cn("text-[#00ff9d]", iconSizes[size])} />
    </div>
  );
}