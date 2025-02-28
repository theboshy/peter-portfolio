import React from "react";
import { Star, Radio, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParallax } from "./useParallax";
import {
  sectionStyles,
  headerStyles,
  cardStyles,
  imageContainerStyles,
} from "./AboutSection.styles";
import CTAButtons from "#components/CTAButtons/CtaButtons.tsx";
import { useParticles } from "#components/Hero/useParticles.ts";
import { socialLinkStyles } from "#components/ContactSection/ContactSection.styles.ts";
import { socialLinks } from "#commons/constans.ts";

const AboutSection: React.FC = () => {
  const { parallaxRef } = useParallax();
  const { particlesRef, handleScrollToContact } = useParticles();
  return (
    <section className={sectionStyles()}>
      <div
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-50"
      />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto relative">
          <SectionHeader />
          <MainContent parallaxRef={parallaxRef} />
          <ExpertiseGrid />
          <CTAButtons onContactClick={handleScrollToContact} />
        </div>
      </div>
    </section>
  );
};

const SectionHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={headerStyles()}>
      <div className="inline-block">
        <h2 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-4">
          {t("hero:title")}
        </h2>
        <p className="text-gray-400 text-lg">
          {`${t("about:title")}, ${t("about:subtitle")}`}
        </p>
      </div>
    </div>
  );
};

const MainContent: React.FC<{
  parallaxRef: React.RefObject<HTMLDivElement>;
}> = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 items-center mb-16">
    <MissionOverview />
    <ProfileImage />
  </div>
);

const MissionOverview: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-tech-gray rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
        <div className={cardStyles()}>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4">
              {t("about:missionOverview.title")}
            </h3>
            <p className="text-gray-400">
              {t("about:missionOverview.description")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 relative z-10">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target={link.href}
            rel="noopener noreferrer"
            className={socialLinkStyles()}
            aria-label={link.label}
            onClick={() => console.log(link.href)}
          >
            <link.icon size={20} className="group-hover:animate-pulse" />
          </a>
        ))}
      </div>
    </div>
  );
};

const ProfileImage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative group">
      <div className={imageContainerStyles()}>
        <img
          src="https://placehold.co/800x600"
          alt={t("about:missionOverview.title")}
          className="rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
        />
        <GrainOverlay />
      </div>
      <div className="absolute -bottom-4 -right-4 bg-space-black p-3 rounded-full border-2 border-neon-green hidden sm:block">
        <Star className="text-neon-green w-6 h-6" />
      </div>
    </div>
  );
};

const GrainOverlay: React.FC = () => (
  <>
    <div
      className="absolute inset-0 mix-blend-soft-light opacity-40"
      style={{
        backgroundImage: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, white 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
      }}
    />
    <div
      className="absolute inset-0 mix-blend-overlay opacity-50"
      style={{
        backgroundImage: `repeating-radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, white 0px, transparent 1px, transparent 2px)`,
        backgroundSize: "8px 8px",
      }}
    />
  </>
);

const ExpertiseGrid: React.FC = () => {
  const { t } = useTranslation();

  const expertiseItems = [
    {
      icon: Lightbulb,
      title: t("about:expertise.technicalVision.title"),
      description: t("about:expertise.technicalVision.description"),
    },
    {
      icon: Radio,
      title: t("about:expertise.missionControl.title"),
      description: t("about:expertise.missionControl.description"),
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {expertiseItems.map((item, index) => (
        <ExpertiseCard key={index} {...item} />
      ))}
    </div>
  );
};

interface ExpertiseCardProps {
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
}

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="p-6 rounded-lg bg-gradient-to-br from-tech-gray/20 to-transparent border border-tech-gray/30 hover:border-neon-green/50 transition-all duration-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 rounded-lg bg-neon-green/10">
        <Icon className="text-neon-green w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default React.memo(AboutSection);
