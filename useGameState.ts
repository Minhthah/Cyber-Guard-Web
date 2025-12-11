import { useState, useCallback, useEffect, useRef } from "react";
import type { GameState, ScamScenario, Player } from "@shared/schema";
import { scamScenarios, typingCommands } from "@shared/gameData";

const MAX_LEVEL = 10;
const BASE_TIME = 20;
const CORRECT_SCORE = 100;
const WRONG_HP_LOSS = 25;
const MONEY_PER_CORRECT = 50;
const TYPING_TIME = 5;

export function useGameState(player: Player | null) {
  const [gameState, setGameState] = useState<GameState>({
    playerId: "",
    playerName: "",
    currentLevel: 1,
    maxLevel: MAX_LEVEL,
    score: 0,
    money: 0,
    hp: 100,
    inventory: [],
    currentScenario: null,
    isTypingGame: false,
    typingCommand: null,
    typingTimeLeft: TYPING_TIME,
    gameStatus: "menu",
  });

  const [timeLeft, setTimeLeft] = useState(BASE_TIME);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomScenario = useCallback((level: number): ScamScenario => {
    const difficultyRange = Math.min(level + 2, 10);
    const eligibleScenarios = scamScenarios.filter(
      (s) => s.difficulty <= difficultyRange && s.difficulty >= Math.max(1, level - 2)
    );
    const randomIndex = Math.floor(Math.random() * eligibleScenarios.length);
    return eligibleScenarios[randomIndex] || scamScenarios[0];
  }, []);

  const getRandomTypingCommand = useCallback((level: number): string => {
    const difficultyRange = Math.min(level + 2, 10);
    const eligibleCommands = typingCommands.filter(
      (c) => c.difficulty <= difficultyRange && c.difficulty >= Math.max(1, level - 3)
    );
    const randomIndex = Math.floor(Math.random() * eligibleCommands.length);
    return eligibleCommands[randomIndex]?.command || "sudo kill virus";
  }, []);

  const startGame = useCallback(() => {
    if (!player) return;
    
    const scenario = getRandomScenario(1);
    setGameState({
      playerId: player.id,
      playerName: player.username,
      currentLevel: 1,
      maxLevel: MAX_LEVEL,
      score: 0,
      money: 0,
      hp: 100,
      inventory: player.ownedItems || [],
      currentScenario: scenario,
      isTypingGame: false,
      typingCommand: null,
      typingTimeLeft: TYPING_TIME,
      gameStatus: "playing",
    });
    setTimeLeft(BASE_TIME);
  }, [player, getRandomScenario]);

  const triggerTypingGame = useCallback(() => {
    const command = getRandomTypingCommand(gameState.currentLevel);
    setGameState((prev) => ({
      ...prev,
      isTypingGame: true,
      typingCommand: command,
      typingTimeLeft: TYPING_TIME,
    }));
  }, [gameState.currentLevel, getRandomTypingCommand]);

  const completeTypingGame = useCallback((success: boolean) => {
    setGameState((prev) => {
      const newHp = success ? prev.hp : Math.max(0, prev.hp - 15);
      const newScore = success ? prev.score + 50 : prev.score;
      
      return {
        ...prev,
        isTypingGame: false,
        typingCommand: null,
        typingTimeLeft: TYPING_TIME,
        hp: newHp,
        score: newScore,
        gameStatus: newHp <= 0 ? "lost" : prev.gameStatus,
      };
    });
  }, []);

  const answer = useCallback((isScamAnswer: boolean) => {
    if (!gameState.currentScenario || gameState.gameStatus !== "playing") return null;

    const isCorrect = gameState.currentScenario.isScam === isScamAnswer;
    
    setGameState((prev) => {
      const newScore = isCorrect ? prev.score + CORRECT_SCORE : prev.score;
      const newMoney = isCorrect ? prev.money + MONEY_PER_CORRECT : prev.money;
      const newHp = isCorrect ? prev.hp : Math.max(0, prev.hp - WRONG_HP_LOSS);
      const newLevel = isCorrect ? prev.currentLevel + 1 : prev.currentLevel;
      
      if (newHp <= 0) {
        return {
          ...prev,
          hp: 0,
          score: newScore,
          money: newMoney,
          gameStatus: "lost",
        };
      }
      
      if (newLevel > MAX_LEVEL) {
        return {
          ...prev,
          score: newScore,
          money: newMoney,
          gameStatus: "won",
        };
      }

      const shouldTriggerTyping = isCorrect && Math.random() < 0.3;
      
      return {
        ...prev,
        score: newScore,
        money: newMoney,
        hp: newHp,
        currentLevel: newLevel,
        currentScenario: shouldTriggerTyping ? prev.currentScenario : getRandomScenario(newLevel),
        isTypingGame: shouldTriggerTyping,
        typingCommand: shouldTriggerTyping ? getRandomTypingCommand(newLevel) : null,
        typingTimeLeft: TYPING_TIME,
      };
    });

    setTimeLeft(BASE_TIME);
    
    return {
      isCorrect,
      explanation: gameState.currentScenario.explanation,
    };
  }, [gameState.currentScenario, gameState.gameStatus, getRandomScenario, getRandomTypingCommand]);

  const endGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: "menu",
      currentScenario: null,
    }));
  }, []);

  useEffect(() => {
    if (gameState.gameStatus === "playing" && !gameState.isTypingGame) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            setGameState((state) => ({
              ...state,
              hp: Math.max(0, state.hp - 10),
              gameStatus: state.hp - 10 <= 0 ? "lost" : state.gameStatus,
            }));
            return BASE_TIME;
          }
          return prev - 0.1;
        });
      }, 100);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState.gameStatus, gameState.isTypingGame]);

  useEffect(() => {
    if (gameState.isTypingGame) {
      typingTimerRef.current = setInterval(() => {
        setGameState((prev) => {
          const newTime = prev.typingTimeLeft - 0.1;
          if (newTime <= 0) {
            const newHp = Math.max(0, prev.hp - 15);
            return {
              ...prev,
              isTypingGame: false,
              typingCommand: null,
              typingTimeLeft: TYPING_TIME,
              hp: newHp,
              gameStatus: newHp <= 0 ? "lost" : prev.gameStatus,
              currentScenario: getRandomScenario(prev.currentLevel),
            };
          }
          return { ...prev, typingTimeLeft: newTime };
        });
      }, 100);
    }

    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, [gameState.isTypingGame, getRandomScenario]);

  return {
    gameState,
    timeLeft,
    startGame,
    answer,
    endGame,
    triggerTypingGame,
    completeTypingGame,
    timePercentage: (timeLeft / BASE_TIME) * 100,
  };
}