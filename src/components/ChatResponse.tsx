import { useGame, BIN_MAP } from "@/context/GameContext";
import { Bot, Recycle, Lightbulb, Award } from "lucide-react";

const ChatResponse = () => {
  const { lastPrediction, getLevel } = useGame();
  const { title } = getLevel();

  if (!lastPrediction) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          AI Chatbot
        </h3>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
          <div className="w-10 h-10 rounded-full eco-gradient flex items-center justify-center text-primary-foreground text-lg">
            🤖
          </div>
          <p className="text-sm text-muted-foreground">
            Upload a waste image and I'll classify it for you! 🌍
          </p>
        </div>
      </div>
    );
  }

  const { wasteType, points, fact } = lastPrediction;
  const bin = BIN_MAP[wasteType];

  return (
    <div className="glass-card rounded-2xl p-6 animate-pop-in">
      <h3 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
        <Bot className="w-5 h-5 text-primary" />
        AI Chatbot
      </h3>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full eco-gradient flex items-center justify-center text-primary-foreground text-lg shrink-0">
            🤖
          </div>
          <div className="flex-1 space-y-3">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Recycle className="w-4 h-4 text-primary" />
                <span className="font-display font-semibold text-sm text-primary">
                  Detected: {wasteType}
                </span>
              </div>
              <p className="text-sm text-foreground">
                Great job! This is <strong>{wasteType}</strong>. Dispose in the{" "}
                <span className="font-semibold text-primary">{bin.bin}</span>.
              </p>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg gold-gradient/10 bg-eco-gold/10 border border-eco-gold/20">
              <Award className="w-4 h-4 text-eco-gold" />
              <span className="text-sm font-semibold text-eco-amber">
                +{points} Green Points 🌱
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                Level: {title}
              </span>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-lg bg-eco-sky/10 border border-eco-sky/20">
              <Lightbulb className="w-4 h-4 text-eco-sky mt-0.5" />
              <p className="text-xs text-muted-foreground">{fact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatResponse;
