import { SocialLink } from "./types/common.ts";
import {
  Award,
  Briefcase,
  Github,
  GraduationCap,
  Linkedin,
  Rocket,
  Trophy,
  Twitter as x,
} from "lucide-react";

export const socialLinks: SocialLink[] = [
  { icon: Github, href: "https://github.com/theboshy", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/peter-lobo/",
    label: "LinkedIn",
  },
  { icon: x, href: "https://twitter.com", label: "Twitter" },
];

export const linkedInProjectsLink =
  "https://www.linkedin.com/in/peter-lobo/details/projects/";

export const trajectoryIcons = {
  achievement: Trophy,
  education: GraduationCap,
  career: Briefcase,
  project: Rocket,
  award: Award,
};

export const trajectoryColors: Record<string, string> = {
  achievement: "text-purple-500",
  education: "text-blue-500",
  career: "text-neon-green",
  project: "text-amber-500",
  award: "text-rose-500",
};

export const nodeColors: Record<string, string> = {
  achievement: "bg-purple-500",
  education: "bg-blue-500",
  career: "bg-neon-green",
  project: "bg-amber-500",
  award: "bg-rose-500",
};
