import { Trophy, Skull, Coins, Star, RotateCcw, Home } from "lucide-react";
import { CyberButton } from "@/components/CyberButton";
import type { GameState } from "@shared/schema";

interface ResultModalProps {
  gameState: GameState;
  isNewHighScore: boolean;
  onPlayAgain: () => void;
  onGoToMenu: () => void;
}

export function ResultModal({ gameState, isNewHighScore, onPlayAgain, onGoToMenu }: ResultModalProps) {
  const isWin = gameState.gameStatus === "won";

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md bg-cyber-panel border-2 border-[#00f3ff] rounded-sm overflow-hidden">
        <div className="p-8 text-center">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isWin ? "bg-[#00ff9d]/20" : "bg-[#ff0055]/20"
          }`}>
            {isWin ? (
              <Trophy className="w-12 h-12 text-[#ffd700]" />
            ) : (
              <Skull className="w-12 h-12 text-[#ff0055]" />
            )}
          </div>

          <h1 className={`font-display text-4xl font-bold mb-2 ${
            isWin ? "text-[#00ff9d] neon-glow-green" : "text-[#ff0055] neon-glow-pink"
          }`}>
            {isWin ? "CHIẾN THẮNG!" : "THẤT BẠI!"}
          </h1>

          {isNewHighScore && (
            <div className="inline-block px-4 py-1 bg-[#ffd700]/20 border border-[#ffd700] rounded-full mb-4">
              <span className="text-[#ffd700] text-sm font-bold">KỶ LỤC MỚI!</span>
            </div>
          )}

          <p className="text-muted-foreground mb-6">
            {isWin 
              ? "Bạn đã hoàn thành tất cả các nhiệm vụ!" 
              : "Đừng nản chí, hãy thử lại!"}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-[#111] rounded-sm">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star className="w-5 h-5 text-[#00f3ff]" />
                <span className="text-muted-foreground text-sm">ĐIỂM</span>
              </div>
              <span className="text-2xl font-bold text-[#00f3ff]" data-testid="text-result-score">
                {gameState.score}
              </span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Coins className="w-5 h-5 text-[#ffd700]" />
                <span className="text-muted-foreground text-sm">TIỀN</span>
              </div>
              <span className="text-2xl font-bold text-[#ffd700]" data-testid="text-result-money">
                +{gameState.money}$
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <CyberButton 
              variant="green" 
              icon={RotateCcw}
              onClick={onPlayAgain}
              data-testid="button-play-again"
            >
              CHƠI LẠI
            </CyberButton>
            <CyberButton 
              variant="blue" 
              icon={Home}
              onClick={onGoToMenu}
              data-testid="button-go-menu"
            >
              VỀ MENU
            </CyberButton>
          </div>
        </div>
      </div>
    </div>
  );
}