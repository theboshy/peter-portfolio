import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Rocket, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import {
  containerStyles,
  contentStyles,
  illustrationStyles,
  headingStyles,
  messageStyles,
  buttonStyles,
  languageSelectorStyles,
} from "./ErrorPage.styles";

interface ErrorPageProps {
  error?: Error;
  resetError?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, resetError }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackHome = () => {
    if (resetError) resetError();
    navigate("/");
  };

  return (
    <div className={containerStyles()}>
      <div className={languageSelectorStyles()}>
        <LanguageSelector />
      </div>

      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-space-black bg-[length:20px_20px]" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Rocket
          className="absolute top-1/4 left-1/4 text-neon-green/20 w-16 h-16 animate-float"
          style={{ animationDelay: "-2s" }}
        />
        <AlertCircle
          className="absolute bottom-1/4 right-1/4 text-neon-green/20 w-12 h-12 animate-float"
          style={{ animationDelay: "-1s" }}
        />
      </div>

      <div className={contentStyles()}>
        <div className={illustrationStyles()}>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertCircle className="w-24 h-24 text-neon-green" />
          </div>
        </div>

        <h1 className={headingStyles()}>{t("error:title")}</h1>
        <p className={messageStyles()}>
          {error?.message || t("error:message")}
        </p>

        <button onClick={handleBackHome} className={buttonStyles()}>
          <Home className="w-5 h-5" />
          {t("error:backButton")}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
