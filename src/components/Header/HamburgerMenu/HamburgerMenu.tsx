import React, { useRef, useEffect } from 'react';
import { X, Sun, Moon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../LanguageSelector/LanguageSelector';
import {
  hamburgerStyles,
  hamburgerLineStyles,
  mobileMenuStyles,
  mobileNavLinkStyles,
  closeButtonStyles
} from './HamburgerMenu.styles';

interface HamburgerMenuProps {
  isOpen: boolean;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  onToggle: () => void;
  onClose: () => void;
  navLinks: Array<{ href: string; label: string }>;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  isDark,
  setIsDark,
  onToggle,
  onClose,
  navLinks
}) => {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && hamburgerRef.current) {
        const target = event.target as Node;
        const isMenuClick = menuRef.current.contains(target);
        const isHamburgerClick = hamburgerRef.current.contains(target);
        
        if (!isMenuClick && !isHamburgerClick) {
          onClose();
        }
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Hamburger Button */}
      <div 
        ref={hamburgerRef}
        className={hamburgerStyles()} 
        onClick={onToggle}
        role="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <span 
          className={hamburgerLineStyles({ 
            isOpen,
            position: 'top',
            state: isOpen ? 'topOpen' : 'closed'
          })}
        />
        <span 
          className={hamburgerLineStyles({ 
            isOpen,
            position: 'middle',
            state: isOpen ? 'middleOpen' : 'closed'
          })}
        />
        <span 
          className={hamburgerLineStyles({ 
            isOpen,
            position: 'bottom',
            state: isOpen ? 'bottomOpen' : 'closed'
          })}
        />
      </div>

      {/* Mobile Menu */}
      <div 
        ref={menuRef}
        className={mobileMenuStyles({ isOpen })}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={closeButtonStyles()}
          aria-label="Close navigation menu"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center space-y-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={mobileNavLinkStyles()}
              onClick={onClose}
            >
              {label}
            </a>
          ))}
          <div className="flex items-center space-x-6 mt-8">
            <LanguageSelector />
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-white/80 hover:text-white transition-colors"
              aria-label={t('common:theme.toggle')}
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(HamburgerMenu);