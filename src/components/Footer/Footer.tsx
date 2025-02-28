import React from "react";
import { useTranslation } from "react-i18next";
import type { SocialLink } from "#commons/types/common.ts";
import {
  footerStyles,
  containerStyles,
  terminalTextStyles,
  socialLinksStyles,
  socialLinkStyles,
} from "./Footer.styles";
import {socialLinks} from "#commons/constans.ts";

const Footer: React.FC = () => {

  return (
    <footer className={footerStyles()}>
      <div className="container mx-auto px-4">
        <div className={containerStyles()}>
          <TerminalText />
          <SocialLinks links={socialLinks} />
          <StatusText />
        </div>
      </div>
    </footer>
  );
};

const TerminalText: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={terminalTextStyles()}>
      <span className="text-neon-green">$</span> echo "{t("footer:connect")}"
    </div>
  );
};

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => (
  <div className={socialLinksStyles()}>
    {links.map((link, index) => (
      <SocialLinkItem key={index} {...link} />
    ))}
  </div>
);

const SocialLinkItem: React.FC<SocialLink> = ({ icon: Icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={socialLinkStyles()}
    aria-label={label}
  >
    <Icon size={24} />
  </a>
);

const StatusText: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={terminalTextStyles()}>
      <span className="text-neon-green">status:</span> {t("footer:status")}
    </div>
  );
};

export default React.memo(Footer);
