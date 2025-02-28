import React from "react";
import { LucideIcon } from "lucide-react";

export interface ThemeProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export interface HeroProps {
  isDark?: boolean;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  type: TimelineEntryType;
  achievements: string[];
}

export type TimelineEntryType =
  | "achievement"
  | "education"
  | "career"
  | "project"
  | "award";

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface ExpertiseItem {
  icon: LucideIcon;
  title: string;
  description: string;
  skills: string[];
}

export interface ConsoleCommand {
  name: string;
  description: string;
  handler: () => void;
}

export interface ConsoleState {
  isExpanded: boolean;
  isActive: boolean;
  input: string;
  history: Array<string | React.ReactNode>;
}

export interface StyleProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface AnimationProps {
  delay?: number;
  duration?: number;
  easing?: string;
}

export interface ResponsiveProps {
  isMobile?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
}

export interface EventHandlerProps {
  onClick?: (event: React.MouseEvent) => void;
  onHover?: (event: React.MouseEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
}

export interface BaseComponentProps extends StyleProps, EventHandlerProps {
  id?: string;
  "aria-label"?: string;
  role?: string;
  tabIndex?: number;
}

export interface TranslationKey {
  key: string;
  params?: Record<string, unknown>;
}

export interface SkillTagsProps {
  skills: string[];
}
