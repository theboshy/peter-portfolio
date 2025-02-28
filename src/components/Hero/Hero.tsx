import React, { useRef } from "react";
import { Code, Sparkles } from "lucide-react";
import { useHeroSpotlight } from "./useHeroSpotlight";
import { heroStyles, starLayerStyles } from "./Hero.styles";
import type { HeroProps } from "#commons/types/common.ts";
import AboutSection from "#components/AboutSection";

const Hero: React.FC<HeroProps> = ({ isDark = true }) => {
  const heroRef = useRef<HTMLElement>(null);
  const { spotlightStyle } = useHeroSpotlight(heroRef, {
    size: 100,
    color: isDark ? "#238636" : "#30363D",
    opacity: 0.3,
    blur: 100,
    enabled: isDark,
  });

  return (
    <section
      ref={heroRef}
      className={`${heroStyles()} pt-16 sm:pt-24 md:pt-32 lg:pt-40`}
    >
      <div className={starLayerStyles()} />

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={spotlightStyle}
        />
      </div>

      <BackgroundEffects />
      <AboutSection />
      <ScrollIndicator />
    </section>
  );
};

const BackgroundEffects: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-[20%] animate-float-slow">
      <Code className="text-neon-green/20 w-12 h-12" />
    </div>
    <div className="absolute bottom-32 right-[15%] animate-float-slower">
      <Sparkles className="text-neon-green/20 w-16 h-16" />
    </div>
  </div>
);

const ScrollIndicator: React.FC = () => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
    <div className="w-6 h-10 border-2 border-tech-gray rounded-full flex items-start justify-center p-2">
      <div className="w-1 h-3 bg-neon-green rounded-full animate-scroll" />
    </div>
  </div>
);

export default React.memo(Hero);
