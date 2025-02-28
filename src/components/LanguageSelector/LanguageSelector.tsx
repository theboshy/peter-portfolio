import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", label: t("common:language.en") },
    { code: "es-CO", label: t("common:language.es-CO") },
  ];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="relative group">
      <button
        className="p-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
        aria-label={t("common:language.select")}
      >
        <Languages size={20} />
        <span className="text-sm">
          {languages.find((lang) => lang.code === i18n.language)?.label}
        </span>
      </button>

      <div className="absolute right-0 mt-2 py-2 w-48 bg-space-black rounded-lg shadow-xl border border-tech-gray/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map(({ code, label }) => (
          <button
            key={code}
            onClick={() => handleLanguageChange(code)}
            className={`w-full px-4 py-2 text-left hover:bg-white/5 transition-colors ${
              i18n.language === code ? "text-neon-green" : "text-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
