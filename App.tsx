import { useState, useCallback, useRef } from "react";
import { useQuery, useMutation, QueryClientProvider } from "@tanstack/react-query";
import { queryClient, apiRequest } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

import { GridBackground } from "@/components/GridBackground";
import { ShopModal } from "@/components/ShopModal";
import { LeaderboardModal } from "@/components/LeaderboardModal";
import { ResultModal } from "@/components/ResultModal";

import { LoginScreen } from "@/pages/LoginScreen";
import { MenuScreen } from "@/pages/MenuScreen";
import { GameScreen } from "@/pages/GameScreen";

import { useGameState } from "@/hooks/useGameState";
import type { Player } from "@shared/schema";

type Screen = "login" | "menu" | "game";
type ModalType = "shop-items" | "shop-avatars" | "leaderboard" | null;

function CyberHeroApp() {
  const { toast } = useToast();
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const scoreSavedRef = useRef(false);

  const { data: player, isLoading: isPlayerLoading, refetch: refetchPlayer } = useQuery<Player>({
    queryKey: ["/api/players", playerId],
    enabled: !!playerId,
  });

  const { gameState, timePercentage, startGame, answer, endGame, completeTypingGame } = useGameState(player || null);

  const loginMutation = useMutation({
    mutationFn: async (username: string) => {
      const res = await apiRequest("POST", "/api/players/login", { username });
      return res.json();
    },
    onSuccess: (data: Player) => {
      setPlayerId(data.id);
      setCurrentScreen("menu");
      queryClient.invalidateQueries({ queryKey: ["/api/players"] });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể đăng nhập. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });

  const purchaseMutation = useMutation({
    mutationFn: async ({ itemId, type }: { itemId: string; type: "item" | "avatar" }) => {
      const res = await apiRequest("POST", `/api/players/${playerId}/purchase`, { itemId, type });
      return res.json();
    },
    onSuccess: () => {
      refetchPlayer();
      toast({
        title: "Thành công!",
        description: "Bạn đã mua vật phẩm thành công.",
      });
    },
    onError: () => {
      toast({
        title: "Lỗi",
        description: "Không thể mua vật phẩm.",
        variant: "destructive",
      });
    },
  });

  const equipAvatarMutation = useMutation({
    mutationFn: async (avatarId: string) => {
      const res = await apiRequest("POST", `/api/players/${playerId}/avatar`, { avatarId });
      return res.json();
    },
    onSuccess: () => {
      refetchPlayer();
      toast({
        title: "Thành công!",
        description: "Đã đổi avatar.",
      });
    },
  });

  const saveScoreMutation = useMutation({
    mutationFn: async ({ score, money, level }: { score: number; money: number; level: number }) => {
      const res = await apiRequest("POST", `/api/players/${playerId}/score`, { score, money, level });
      return res.json();
    },
    onSuccess: (data: { isNewHighScore: boolean }) => {
      setIsNewHighScore(data.isNewHighScore);
      refetchPlayer();
      queryClient.invalidateQueries({ queryKey: ["/api/leaderboard"] });
    },
  });

  const saveScore = useCallback(() => {
    if (scoreSavedRef.current || saveScoreMutation.isPending) return;
    scoreSavedRef.current = true;
    saveScoreMutation.mutate({
      score: gameState.score,
      money: gameState.money,
      level: gameState.currentLevel,
    });
    setShowResult(true);
  }, [gameState, saveScoreMutation]);

  const handleLogin = useCallback((username: string) => {
    loginMutation.mutate(username);
  }, [loginMutation]);

  const handleStartGame = useCallback(() => {
    setCurrentScreen("game");
    setShowResult(false);
    scoreSavedRef.current = false;
    setIsNewHighScore(false);
    startGame();
  }, [startGame]);

  const handleAnswer = useCallback((isScam: boolean) => {
    const result = answer(isScam);
    return result;
  }, [answer]);

  const handleEndGame = useCallback(() => {
    if (gameState.score > 0 && !scoreSavedRef.current) {
      saveScore();
    }
    endGame();
    setCurrentScreen("menu");
  }, [endGame, gameState.score, saveScore]);

  const handleTypingComplete = useCallback((success: boolean) => {
    completeTypingGame(success);
  }, [completeTypingGame]);

  const handleLogout = useCallback(() => {
    setPlayerId(null);
    setCurrentScreen("login");
  }, []);

  const handlePurchase = useCallback((itemId: string) => {
    const type = itemId.startsWith("avatar-") ? "avatar" : "item";
    purchaseMutation.mutate({ itemId, type });
  }, [purchaseMutation]);

  const handleEquipAvatar = useCallback((avatarId: string) => {
    equipAvatarMutation.mutate(avatarId);
  }, [equipAvatarMutation]);

  const handlePlayAgain = useCallback(() => {
    setShowResult(false);
    scoreSavedRef.current = false;
    setIsNewHighScore(false);
    startGame();
  }, [startGame]);

  const handleGoToMenu = useCallback(() => {
    setShowResult(false);
    endGame();
    setCurrentScreen("menu");
  }, [endGame]);

  if ((gameState.gameStatus === "won" || gameState.gameStatus === "lost") && !scoreSavedRef.current && currentScreen === "game") {
    saveScore();
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      <GridBackground />
      
      <div className="relative z-10">
        {currentScreen === "login" && (
          <LoginScreen 
            onLogin={handleLogin} 
            isLoading={loginMutation.isPending}
          />
        )}

        {currentScreen === "menu" && player && (
          <MenuScreen
            player={player}
            onStartGame={handleStartGame}
            onOpenShop={(type) => setActiveModal(type === "items" ? "shop-items" : "shop-avatars")}
            onOpenLeaderboard={() => setActiveModal("leaderboard")}
            onLogout={handleLogout}
          />
        )}

        {currentScreen === "game" && (
          <GameScreen
            gameState={gameState}
            timePercentage={timePercentage}
            onAnswer={handleAnswer}
            onTypingComplete={handleTypingComplete}
            onEndGame={handleEndGame}
          />
        )}
      </div>

      {activeModal === "shop-items" && player && (
        <ShopModal
          type="items"
          player={player}
          onClose={() => setActiveModal(null)}
          onPurchase={handlePurchase}
          onEquipAvatar={handleEquipAvatar}
        />
      )}

      {activeModal === "shop-avatars" && player && (
        <ShopModal
          type="avatars"
          player={player}
          onClose={() => setActiveModal(null)}
          onPurchase={handlePurchase}
          onEquipAvatar={handleEquipAvatar}
        />
      )}

      {activeModal === "leaderboard" && (
        <LeaderboardModal onClose={() => setActiveModal(null)} />
      )}

      {showResult && (gameState.gameStatus === "won" || gameState.gameStatus === "lost") && (
        <ResultModal
          gameState={gameState}
          isNewHighScore={isNewHighScore}
          onPlayAgain={handlePlayAgain}
          onGoToMenu={handleGoToMenu}
        />
      )}

      {isPlayerLoading && currentScreen !== "login" && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="text-[#00f3ff] animate-pulse">Đang tải...</div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CyberHeroApp />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
