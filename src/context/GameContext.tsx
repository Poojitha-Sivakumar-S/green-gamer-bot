import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type WasteType = "Plastic" | "Metal" | "Glass" | "Paper" | "Organic" | "E-Waste";

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  condition: string;
}

interface ActivityLog {
  id: number;
  wasteType: WasteType;
  pointsEarned: number;
  date: Date;
}

interface LeaderboardEntry {
  name: string;
  points: number;
  level: number;
  avatar: string;
}

interface GameState {
  userName: string;
  totalPoints: number;
  streak: number;
  activityLog: ActivityLog[];
  badges: Badge[];
  leaderboard: LeaderboardEntry[];
  lastPrediction: { wasteType: WasteType; points: number; fact: string } | null;
}

interface GameContextType extends GameState {
  classifyWaste: (imageFile: File) => void;
  getLevel: () => { level: number; title: string; progress: number };
}

const WASTE_FACTS: Record<WasteType, string[]> = {
  Plastic: [
    "Plastic takes around 450 years to decompose.",
    "Only 9% of all plastic ever made has been recycled.",
    "1 million plastic bottles are bought every minute worldwide.",
  ],
  Metal: [
    "Recycling one aluminum can saves enough energy to run a TV for 3 hours.",
    "Aluminum can be recycled indefinitely without losing quality.",
    "Steel is the most recycled material on the planet.",
  ],
  Glass: [
    "Glass is 100% recyclable and can be recycled endlessly.",
    "Recycling glass reduces air pollution by 20%.",
    "A glass bottle takes 4,000 years to decompose.",
  ],
  Paper: [
    "Recycling 1 ton of paper saves 17 trees.",
    "Paper can be recycled up to 7 times.",
    "It takes 24 trees to make 1 ton of newspaper.",
  ],
  Organic: [
    "Organic waste in landfills produces methane, a potent greenhouse gas.",
    "Composting can reduce waste by up to 30%.",
    "Food waste accounts for 8% of global greenhouse gas emissions.",
  ],
  "E-Waste": [
    "Only 17% of e-waste is properly recycled worldwide.",
    "E-waste contains valuable metals like gold, silver, and platinum.",
    "One ton of circuit boards has more gold than 17 tons of gold ore.",
  ],
};

const BIN_MAP: Record<WasteType, { color: string; bin: string }> = {
  Plastic: { color: "Blue", bin: "Blue Bin" },
  Metal: { color: "Yellow", bin: "Yellow Bin" },
  Glass: { color: "Green", bin: "Green Bin" },
  Paper: { color: "White", bin: "White Bin" },
  Organic: { color: "Brown", bin: "Brown Bin" },
  "E-Waste": { color: "Red", bin: "E-Waste Collection" },
};

const LEVEL_TITLES = [
  "Beginner Recycler",
  "Eco Warrior",
  "Recycling Champion",
  "Planet Protector",
  "Eco Legend",
];

const INITIAL_BADGES: Badge[] = [
  { id: "first", name: "First Step", icon: "🌱", description: "Classify your first item", unlocked: false, condition: "1+ classification" },
  { id: "plastic-pro", name: "Plastic Pro", icon: "♻️", description: "Reach 50 points", unlocked: false, condition: "50+ points" },
  { id: "streak-star", name: "Consistency Star", icon: "⭐", description: "5 correct in a row", unlocked: false, condition: "5+ streak" },
  { id: "eco-master", name: "Eco Master", icon: "🏆", description: "Reach 200 points", unlocked: false, condition: "200+ points" },
  { id: "centurion", name: "Centurion", icon: "💯", description: "Reach 100 points", unlocked: false, condition: "100+ points" },
  { id: "dedicated", name: "Dedicated Hero", icon: "🔥", description: "10 items classified", unlocked: false, condition: "10+ items" },
];

const FAKE_LEADERBOARD: LeaderboardEntry[] = [
  { name: "EcoWarrior99", points: 350, level: 4, avatar: "🦸" },
  { name: "GreenQueen", points: 280, level: 3, avatar: "👸" },
  { name: "RecycleKing", points: 220, level: 3, avatar: "🤴" },
  { name: "PlanetSaver", points: 180, level: 2, avatar: "🌍" },
  { name: "TrashHero", points: 120, level: 2, avatar: "💪" },
];

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be inside GameProvider");
  return ctx;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>({
    userName: "You",
    totalPoints: 0,
    streak: 0,
    activityLog: [],
    badges: INITIAL_BADGES,
    leaderboard: FAKE_LEADERBOARD,
    lastPrediction: null,
  });

  const getLevel = useCallback(() => {
    const lvl = Math.min(Math.floor(state.totalPoints / 50), LEVEL_TITLES.length - 1);
    const progress = (state.totalPoints % 50) / 50;
    return { level: lvl, title: LEVEL_TITLES[lvl], progress };
  }, [state.totalPoints]);

  const classifyWaste = useCallback((_imageFile: File) => {
    const types: WasteType[] = ["Plastic", "Metal", "Glass", "Paper", "Organic", "E-Waste"];
    const wasteType = types[Math.floor(Math.random() * types.length)];
    const facts = WASTE_FACTS[wasteType];
    const fact = facts[Math.floor(Math.random() * facts.length)];

    let points = 10;
    const newStreak = state.streak + 1;
    if (newStreak % 5 === 0) points += 20;

    setState((prev) => {
      const newTotal = prev.totalPoints + points;
      const newLog: ActivityLog = {
        id: Date.now(),
        wasteType,
        pointsEarned: points,
        date: new Date(),
      };
      const newBadges = prev.badges.map((b) => {
        if (b.id === "first" && !b.unlocked) return { ...b, unlocked: true };
        if (b.id === "plastic-pro" && newTotal >= 50) return { ...b, unlocked: true };
        if (b.id === "centurion" && newTotal >= 100) return { ...b, unlocked: true };
        if (b.id === "eco-master" && newTotal >= 200) return { ...b, unlocked: true };
        if (b.id === "streak-star" && newStreak >= 5) return { ...b, unlocked: true };
        if (b.id === "dedicated" && prev.activityLog.length + 1 >= 10) return { ...b, unlocked: true };
        return b;
      });

      const updatedLeaderboard = [
        ...prev.leaderboard,
        { name: prev.userName, points: newTotal, level: Math.floor(newTotal / 50), avatar: "🌿" },
      ]
        .reduce<LeaderboardEntry[]>((acc, e) => {
          const existing = acc.find((a) => a.name === e.name);
          if (existing) {
            existing.points = Math.max(existing.points, e.points);
            existing.level = Math.max(existing.level, e.level);
            return acc;
          }
          return [...acc, e];
        }, [])
        .sort((a, b) => b.points - a.points)
        .slice(0, 6);

      return {
        ...prev,
        totalPoints: newTotal,
        streak: newStreak,
        activityLog: [...prev.activityLog, newLog],
        badges: newBadges,
        leaderboard: updatedLeaderboard,
        lastPrediction: { wasteType, points, fact },
      };
    });
  }, [state.streak, state.totalPoints]);

  return (
    <GameContext.Provider value={{ ...state, classifyWaste, getLevel }}>
      {children}
    </GameContext.Provider>
  );
};

export { BIN_MAP, LEVEL_TITLES };
