import React, { useState, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemeProps } from '#types/common.ts';
import {
  headerStyles,
  navStyles,
  linkStyles,
  desktopNavStyles
} from './Header.styles';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import HamburgerMenu from './HamburgerMenu';

type HeaderProps = ThemeProps

const Header: React.FC<HeaderProps> = ({ isDark, setIsDark }) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const navLinks = [
    { href: '#expertise', label: t('common:navigation.expertise') },
    { href: '#projects', label: t('common:navigation.projects') },
    { href: '#contact', label: t('common:navigation.contact') }
  ];

  return (
    <header className={headerStyles({ isDark })}>
      <div className="absolute inset-0 backdrop-blur-md" />
      <div className="container mx-auto px-4 relative">
        <nav className={navStyles({ isDark })}>
          <a href="#" className="text-xl font-bold z-50">
            peter_portfolio<span className="text-neon-green">.</span>
          </a>

          {/* Mobile Menu */}
          <HamburgerMenu
            isOpen={isMenuOpen}
            isDark={isDark}
            setIsDark={setIsDark}
            onToggle={toggleMenu}
            onClose={closeMenu}
            navLinks={navLinks}
          />
          
          {/* Desktop Navigation */}
          <div className={desktopNavStyles()}>
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={linkStyles({ isDark })}
              >
                {label}
              </a>
            ))}
            <LanguageSelector />
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label={t('common:theme.toggle')}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default React.memo(Header);