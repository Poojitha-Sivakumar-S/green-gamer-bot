import { useGame } from "@/context/GameContext";
import { Leaf, Flame, Trophy, Star } from "lucide-react";

const StatsCards = () => {
  const { totalPoints, streak, activityLog, getLevel } = useGame();
  const { title, progress } = getLevel();

  const stats = [
    {
      label: "Green Points",
      value: totalPoints,
      icon: <Leaf className="w-5 h-5" />,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Current Level",
      value: title,
      icon: <Trophy className="w-5 h-5" />,
      color: "text-eco-gold",
      bg: "bg-eco-gold/10",
      sub: (
        <div className="w-full h-1.5 bg-muted rounded-full mt-1.5">
          <div
            className="h-full rounded-full gold-gradient transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      ),
    },
    {
      label: "Streak",
      value: `🔥 ${streak}`,
      icon: <Flame className="w-5 h-5" />,
      color: "text-eco-amber",
      bg: "bg-eco-amber/10",
    },
    {
      label: "Items Classified",
      value: activityLog.length,
      icon: <Star className="w-5 h-5" />,
      color: "text-eco-sky",
      bg: "bg-eco-sky/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="glass-card rounded-xl p-4 animate-slide-up"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`${s.bg} ${s.color} p-1.5 rounded-lg`}>{s.icon}</span>
            <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
          </div>
          <p className={`text-xl font-display font-bold ${s.color}`}>{s.value}</p>
          {s.sub}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
