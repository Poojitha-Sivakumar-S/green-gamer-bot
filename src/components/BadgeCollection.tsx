import { useGame } from "@/context/GameContext";
import { Medal } from "lucide-react";

const BadgeCollection = () => {
  const { badges } = useGame();

  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
        <Medal className="w-5 h-5 text-eco-gold" />
        Badges
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`flex flex-col items-center p-3 rounded-xl text-center transition-all ${
              badge.unlocked
                ? "bg-eco-gold/10 border border-eco-gold/20 animate-pop-in"
                : "bg-muted/30 opacity-50"
            }`}
          >
            <span className="text-2xl mb-1">{badge.icon}</span>
            <p className="text-xs font-semibold text-foreground">{badge.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {badge.unlocked ? "Unlocked!" : badge.condition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeCollection;
