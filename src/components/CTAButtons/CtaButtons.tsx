import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import {
  buttonContainerStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
} from "./CTAButtons.styles.ts";

interface CTAButtonsProps {
  onContactClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({ onContactClick }) => {
  const { t } = useTranslation();

  return (
    <div className={buttonContainerStyles()}>
      <a href="#projects" className={primaryButtonStyles()}>
        <span className="relative z-10 flex items-center">
          {t("hero:cta.projects")}
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </span>
      </a>

      <a
        href="#contact-section"
        onClick={onContactClick}
        className={secondaryButtonStyles()}
      >
        <span className="relative z-10 flex items-center">
          {t("hero:cta.contact")}
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-neon-green/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </a>
    </div>
  );
};

export default React.memo(CTAButtons);
