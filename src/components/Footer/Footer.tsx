import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { SocialLink } from '#types/common';
import {
  footerStyles,
  containerStyles,
  terminalTextStyles,
  socialLinksStyles,
  socialLinkStyles
} from './Footer.styles';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className={footerStyles()}>
      <div className="container mx-auto px-4">
        <div className={containerStyles()}>
          <TerminalText />
          <SocialLinks links={getSocialLinks(t)} />
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
      <span className="text-neon-green">$</span> echo "{t('footer:connect')}"
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
      <span className="text-neon-green">status:</span> {t('footer:status')}
    </div>
  );
};

const getSocialLinks = (t: (key: string) => string): SocialLink[] => [
  { icon: Github, href: 'https://github.com', label: t('common:social.github') },
  { icon: Linkedin, href: 'https://linkedin.com', label: t('common:social.linkedin') },
  { icon: Mail, href: 'mailto:contact@example.com', label: t('common:social.email') }
];

export default React.memo(Footer);