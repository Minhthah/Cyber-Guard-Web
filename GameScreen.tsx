import { useState, useEffect, useRef } from "react";
import { Coins, Star, Heart, Package, AlertTriangle, ShieldCheck, X } from "lucide-react";
import { CyberButton } from "@/components/CyberButton";
import { GlassPanel } from "@/components/GlassPanel";
import { ProgressBar } from "@/components/ProgressBar";
import type { GameState, ScamScenario } from "@shared/schema";
import { shopItems } from "@shared/gameData";

interface GameScreenProps {
  gameState: GameState;
  timePercentage: number;
  onAnswer: (isScam: boolean) => { isCorrect: boolean; explanation: string } | null;
  onTypingComplete: (success: boolean) => void;
  onEndGame: () => void;
}

function ScenarioDisplay({ scenario }: { scenario: ScamScenario }) {
  const typeLabels = {
    email: "EMAIL",
    website: "WEBSITE", 
    sms: "TIN NHẮN SMS",
    call: "CUỘC GỌI",
  };

  const typeColors = {
    email: "text-[#00f3ff]",
    website: "text-[#ff0055]",
    sms: "text-[#00ff9d]",
    call: "text-[#ffd700]",
  };

  return (
    <div className="flex-1 bg-white text-black p-5 overflow-y-auto rounded-sm">
      <div className="mb-4 pb-3 border-b border-gray-200">
        <span className={`font-bold ${typeColors[scenario.type]}`}>
          [{typeLabels[scenario.type]}]
        </span>
        {scenario.sender && (
          <p className="text-sm text-gray-500 mt-1">
            Từ: {scenario.sender}
          </p>
        )}
        {scenario.url && (
          <p className="text-sm text-gray-500 font-mono break-all">
            URL: {scenario.url}
          </p>
        )}
      </div>
      
      <h3 className="font-bold text-lg mb-3">{scenario.title}</h3>
      <div className="whitespace-pre-wrap text-sm leading-relaxed">
        {scenario.content}
      </div>
    </div>
  );
}

function TypingGame({ 
  command, 
  timeLeft, 
  onComplete 
}: { 
  command: string; 
  timeLeft: number; 
  onComplete: (success: boolean) => void;
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (input === command) {
      onComplete(true);
      setInput("");
    }
  }, [input, command, onComplete]);

  return (
    <div className="absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-8 animate-fade-in">
      <AlertTriangle className="w-16 h-16 text-[#ff0055] mb-4 animate-pulse" />
      <h2 className="text-[#ff0055] text-2xl font-bold mb-2">VIRUS DETECTED!</h2>
      <p className="text-muted-foreground mb-6">Gõ lệnh sau để diệt virus:</p>
      
      <div className="font-mono text-2xl text-[#00ff9d] mb-6 neon-glow-green">
        {command}
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-transparent border-b-2 border-[#00f3ff] text-white text-xl text-center w-4/5 max-w-md py-2 focus:outline-none"
        autoComplete="off"
        data-testid="input-typing-command"
      />
      
      <div className="mt-4 text-[#ffd700] font-bold">
        {timeLeft.toFixed(1)}s
      </div>
    </div>
  );
}

function QuickShopPanel({ inventory, money }: { inventory: string[]; money: number }) {
  const availableItems = shopItems
    .filter(item => item.type === "item" && !inventory.includes(item.id))
    .slice(0, 4);

  return (
    <div className="space-y-2">
      {availableItems.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-4">
          Bạn đã sở hữu tất cả items!
        </p>
      ) : (
        availableItems.map((item) => (
          <div 
            key={item.id}
            className="flex items-center gap-2 p-2 bg-[#111] border border-[#444] rounded-sm text-sm"
          >
            <Coins className="w-4 h-4 text-[#ffd700]" />
            <span className="flex-1 truncate">{item.name}</span>
            <span className={money >= item.price ? "text-[#00ff9d]" : "text-[#ff0055]"}>
              {item.price}$
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export function GameScreen({
  gameState,
  timePercentage,
  onAnswer,
  onTypingComplete,
  onEndGame,
}: GameScreenProps) {
  const [showFeedback, setShowFeedback] = useState<{
    isCorrect: boolean;
    explanation: string;
  } | null>(null);

  const handleAnswer = (isScam: boolean) => {
    const result = onAnswer(isScam);
    if (result) {
      setShowFeedback(result);
      setTimeout(() => setShowFeedback(null), 2500);
    }
  };

  return (
    <div className="h-screen flex flex-col p-4 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <span className="font-display text-lg">
            LEVEL: <span className="text-[#00ff9d]">{gameState.currentLevel}/{gameState.maxLevel}</span>
          </span>
          <button 
            onClick={onEndGame}
            className="text-muted-foreground hover:text-[#ff0055] transition-colors"
            data-testid="button-exit-game"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[#ffd700]" />
            <span className="text-[#ffd700] font-bold" data-testid="text-game-money">
              {gameState.money}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-[#00f3ff]" />
            <span className="text-[#00f3ff] font-bold" data-testid="text-game-score">
              {gameState.score}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_240px] gap-4 flex-1 min-h-0">
        <GlassPanel className="hidden lg:flex">
          <h3 className="text-muted-foreground text-sm mb-3">TRẠNG THÁI</h3>
          
          <div className="flex justify-between text-sm mb-1">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-[#00ff9d]" />
              <span>HP</span>
            </div>
            <span data-testid="text-hp">{gameState.hp}%</span>
          </div>
          <ProgressBar 
            value={gameState.hp} 
            variant={gameState.hp > 50 ? "green" : gameState.hp > 25 ? "gold" : "pink"}
            height="md"
            className="mb-6"
          />

          <h3 className="text-[#ffd700] text-sm mb-3 border-t border-[#333] pt-4">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              BALO
            </div>
          </h3>
          
          {gameState.inventory.length === 0 ? (
            <p className="text-muted-foreground text-xs">Chưa có items</p>
          ) : (
            <div className="space-y-2">
              {gameState.inventory.map((itemId) => {
                const item = shopItems.find(i => i.id === itemId);
                return item ? (
                  <div key={itemId} className="text-sm text-[#00f3ff]">
                    {item.name}
                  </div>
                ) : null;
              })}
            </div>
          )}
        </GlassPanel>

        <GlassPanel className="p-0 overflow-hidden relative">
          <ProgressBar 
            value={timePercentage} 
            variant="pink" 
            height="sm"
            className="rounded-none"
          />
          
          <div className="flex-1 flex flex-col min-h-0 p-4">
            {gameState.currentScenario && (
              <ScenarioDisplay scenario={gameState.currentScenario} />
            )}
          </div>

          {gameState.isTypingGame && gameState.typingCommand && (
            <TypingGame
              command={gameState.typingCommand}
              timeLeft={gameState.typingTimeLeft}
              onComplete={onTypingComplete}
            />
          )}

          {showFeedback && (
            <div className={`absolute bottom-20 left-4 right-4 p-4 rounded-sm animate-slide-up ${
              showFeedback.isCorrect ? "bg-[#00ff9d]/20 border border-[#00ff9d]" : "bg-[#ff0055]/20 border border-[#ff0055]"
            }`}>
              <div className="flex items-start gap-3">
                {showFeedback.isCorrect ? (
                  <ShieldCheck className="w-6 h-6 text-[#00ff9d] flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-[#ff0055] flex-shrink-0" />
                )}
                <div>
                  <p className={`font-bold mb-1 ${showFeedback.isCorrect ? "text-[#00ff9d]" : "text-[#ff0055]"}`}>
                    {showFeedback.isCorrect ? "CHÍNH XÁC!" : "SAI RỒI!"}
                  </p>
                  <p className="text-xs text-foreground/80">{showFeedback.explanation}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 p-4 bg-[#111]">
            <CyberButton 
              variant="red" 
              onClick={() => handleAnswer(true)}
              disabled={gameState.isTypingGame || !!showFeedback}
              data-testid="button-answer-scam"
            >
              <AlertTriangle className="w-5 h-5" />
              LỪA ĐẢO
            </CyberButton>
            <CyberButton 
              variant="green" 
              onClick={() => handleAnswer(false)}
              disabled={gameState.isTypingGame || !!showFeedback}
              data-testid="button-answer-safe"
            >
              <ShieldCheck className="w-5 h-5" />
              AN TOÀN
            </CyberButton>
          </div>
        </GlassPanel>

        <GlassPanel className="hidden lg:flex">
          <h3 className="text-[#ff0055] text-sm mb-3">MUA NHANH</h3>
          <QuickShopPanel inventory={gameState.inventory} money={gameState.money} />
        </GlassPanel>
      </div>
    </div>
  );
}