import HeroBanner from "@/components/HeroBanner";
import StatsCards from "@/components/StatsCards";
import ImageUploader from "@/components/ImageUploader";
import ChatResponse from "@/components/ChatResponse";
import Leaderboard from "@/components/Leaderboard";
import BadgeCollection from "@/components/BadgeCollection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <HeroBanner />
        <StatsCards />
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <div className="space-y-6">
            <ImageUploader />
            <ChatResponse />
          </div>
          <div className="space-y-6">
            <Leaderboard />
            <BadgeCollection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
