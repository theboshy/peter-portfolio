import React, { useEffect } from "react";
import {
  Terminal,
  Minimize2,
  Code2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useConsole } from "./useConsole";
import {
  consoleStyles,
  headerStyles,
  contentStyles,
  historyContainerStyles,
  inputContainerStyles,
  inputStyles,
  toggleButtonStyles,
} from "./CommandConsole.styles";

const CommandConsole: React.FC = () => {
  const { t } = useTranslation();
  const {
    isExpanded,
    isActive,
    input,
    history,
    inputRef,
    consoleRef,
    historyRef,
    isMobile,
    isScrolling,
    handleMinimize,
    handleConsoleClick,
    handleToggleConsole,
    handleInputChange,
    handleKeyPress,
    scrollToBottom,
  } = useConsole();

  useEffect(() => {
    if (isExpanded && !isScrolling) {
      scrollToBottom();
    }
  }, [history, isExpanded, isScrolling, scrollToBottom]);

  return (
    <>
      <div
        ref={consoleRef}
        onClick={handleConsoleClick}
        className={consoleStyles({ isExpanded, isActive, isMobile })}
        data-expanded={isExpanded}
      >
        <div
          className={headerStyles({ isMobile })}
          data-expanded={isExpanded}
          onClick={handleToggleConsole}
        >
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-neon-green" />
            <span className="font-mono text-sm text-gray-400">
              {t("console:title")}
            </span>
          </div>
          {isMobile ? (
            <button
              onClick={handleToggleConsole}
              className="text-gray-400 p-2"
              aria-label={
                isExpanded
                  ? t("common:console.minimize")
                  : t("common:console.expand")
              }
            >
              {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>
          ) : (
            <button
              onClick={handleMinimize}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={t("common:console.minimize")}
            >
              <Minimize2 size={16} />
            </button>
          )}
        </div>

        <div className={contentStyles({ isExpanded })}>
          <div ref={historyRef} className={historyContainerStyles()}>
            {history.map((line, i) => (
              <div key={i} className="mb-1">
                {typeof line === "string" ? (
                  <span
                    className={
                      line.startsWith(">") ? "text-neon-green" : "text-gray-300"
                    }
                  >
                    {line}
                  </span>
                ) : (
                  line
                )}
              </div>
            ))}
          </div>

          <div className={inputContainerStyles()}>
            <div className="flex items-center gap-2">
              <span className="text-neon-green">$</span>
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className={inputStyles()}
                placeholder={t("common:console.placeholder")}
                rows={1}
              />
            </div>
          </div>
        </div>
      </div>

      {!isMobile && !isExpanded && (
        <button
          onClick={handleToggleConsole}
          className={toggleButtonStyles()}
          aria-label={t("common:console.toggle")}
        >
          <Terminal size={20} className="text-neon-green" />
        </button>
      )}
    </>
  );
};

export default React.memo(CommandConsole);
