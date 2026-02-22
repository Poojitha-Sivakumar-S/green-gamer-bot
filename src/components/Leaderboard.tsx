import { useGame } from "@/context/GameContext";
import { Crown } from "lucide-react";

const Leaderboard = () => {
  const { leaderboard } = useGame();

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
        <Crown className="w-5 h-5 text-eco-gold" />
        Leaderboard
      </h3>
      <div className="space-y-2">
        {leaderboard.map((entry, i) => (
          <div
            key={entry.name}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              i === 0 ? "bg-eco-gold/10 border border-eco-gold/20" : "hover:bg-muted/50"
            }`}
          >
            <span className="text-lg font-display font-bold w-6 text-center text-muted-foreground">
              {i === 0 ? "👑" : i + 1}
            </span>
            <span className="text-xl">{entry.avatar}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground truncate">
                {entry.name}
              </p>
              <p className="text-xs text-muted-foreground">
                Level {entry.level}
              </p>
            </div>
            <span className="font-display font-bold text-sm text-primary">
              {entry.points} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
