import { Trophy, Coins } from "lucide-react";
import { CyberButton } from "@/components/CyberButton";
import { GlassPanel } from "@/components/GlassPanel";
import { AvatarCircle } from "@/components/AvatarCircle";
import type { Player } from "@shared/schema";

interface MenuScreenProps {
  player: Player;
  onStartGame: () => void;
  onOpenShop: (type: "items" | "avatars") => void;
  onOpenLeaderboard: () => void;
  onLogout: () => void;
}

export function MenuScreen({
  player,
  onStartGame,
  onOpenShop,
  onOpenLeaderboard,
  onLogout,
}: MenuScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <GlassPanel className="w-full max-w-lg text-center" neonBorder="green">
        <AvatarCircle icon={player.avatarIcon} size="lg" className="mx-auto mb-4" />
        
        <h1 className="font-display text-4xl font-bold text-foreground mb-2">
          {player.username}
        </h1>
        
        <div className="flex justify-between items-center mb-6 border-b border-[#333] pb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#ffd700]" />
            <span className="text-muted-foreground">TOP:</span>
            <span className="text-[#ffd700] font-bold" data-testid="text-high-score">
              {player.highScore}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#00f3ff]" />
            <span className="text-muted-foreground">CASH:</span>
            <span className="text-[#00f3ff] font-bold" data-testid="text-money">
              {player.money} $
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <CyberButton 
            variant="green" 
            onClick={onStartGame}
            data-testid="button-start-game"
          >
            BẮT ĐẦU NHIỆM VỤ
          </CyberButton>

          <div className="grid grid-cols-2 gap-3">
            <CyberButton 
              variant="gold" 
              onClick={() => onOpenShop("items")}
              data-testid="button-shop-items"
            >
              MUA ĐỒ
            </CyberButton>
            <CyberButton 
              variant="gold" 
              onClick={() => onOpenShop("avatars")}
              data-testid="button-shop-avatars"
            >
              ĐỔI SKIN
            </CyberButton>
          </div>

          <CyberButton 
            variant="blue" 
            onClick={onOpenLeaderboard}
            data-testid="button-leaderboard"
          >
            BẢNG XẾP HẠNG
          </CyberButton>

          <CyberButton 
            variant="red" 
            onClick={onLogout}
            data-testid="button-logout"
          >
            ĐĂNG XUẤT
          </CyberButton>
        </div>
      </GlassPanel>
    </div>
  );
}