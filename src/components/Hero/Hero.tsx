import React, { useRef } from 'react';
import { ArrowRight, Code, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParticles } from './useParticles';
import { useHeroSpotlight } from './useHeroSpotlight';
import {
  heroStyles,
  titleStyles,
  descriptionStyles,
  buttonContainerStyles,
  primaryButtonStyles,
  secondaryButtonStyles
} from './Hero.styles';
import type { HeroProps } from '#types/common';

const Hero: React.FC<HeroProps> = ({ isDark = true }) => {
  const heroRef = useRef<HTMLElement>(null);
  const { particlesRef, handleScrollToContact } = useParticles();
  const { spotlightStyle } = useHeroSpotlight(heroRef, {
    size: 300,
    color: isDark ? '#238636' : '#30363D',
    opacity: 0.15,
    blur: 100,
    enabled: isDark
  });

  return (
    <section ref={heroRef} className={`${heroStyles()} relative overflow-hidden`}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={spotlightStyle}
        />
      </div>

      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-50" />
      <BackgroundEffects />
      <Content onContactClick={handleScrollToContact} />
      <ScrollIndicator />
    </section>
  );
};

const BackgroundEffects: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-[20%] animate-float-slow">
      <Code className="text-neon-green/20 w-12 h-12" />
    </div>
    <div className="absolute bottom-32 right-[15%] animate-float-slower">
      <Sparkles className="text-neon-green/20 w-16 h-16" />
    </div>
  </div>
);

interface ContentProps {
  onContactClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Content: React.FC<ContentProps> = ({ onContactClick }) => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className={titleStyles()}>
          {t('hero:title')}
        </h1>
        <p className={descriptionStyles()}>
          {t('hero:description')}
        </p>
        <CTAButtons onContactClick={onContactClick} />
      </div>
    </div>
  );
};

interface CTAButtonsProps {
  onContactClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({ onContactClick }) => {
  const { t } = useTranslation();
  
  return (
    <div className={buttonContainerStyles()}>
      <a
        href="#projects"
        className={primaryButtonStyles()}
      >
        <span className="relative z-10 flex items-center">
          {t('hero:cta.projects')}
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </span>
      </a>
      
      <a
        href="#contact-section"
        onClick={onContactClick}
        className={secondaryButtonStyles()}
      >
        <span className="relative z-10 flex items-center">
          {t('hero:cta.contact')}
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-neon-green/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </a>
    </div>
  );
};

const ScrollIndicator: React.FC = () => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <div className="w-6 h-10 border-2 border-tech-gray rounded-full flex items-start justify-center p-2">
      <div className="w-1 h-3 bg-neon-green rounded-full animate-scroll" />
    </div>
  </div>
);

export default React.memo(Hero);