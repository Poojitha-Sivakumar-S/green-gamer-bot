import heroBg from "@/assets/hero-bg.jpg";
import { Recycle } from "lucide-react";

const HeroBanner = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-6">
      <img
        src={heroBg}
        alt="Recycle Hero background"
        className="w-full h-48 md:h-56 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-eco-deep/90 via-eco-forest/70 to-transparent flex items-center">
        <div className="px-6 md:px-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full eco-gradient flex items-center justify-center eco-glow-shadow">
              <Recycle className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">
              Recycle Hero
            </h1>
          </div>
          <p className="text-sm md:text-base text-primary-foreground/80 max-w-md">
            Upload waste images, earn points, and save the planet — one item at a time! 🌍
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
