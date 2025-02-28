import { SocialLink } from "./types/common.ts";
import { Github, Linkedin, Twitter as x } from "lucide-react";

export const socialLinks: SocialLink[] = [
  { icon: Github, href: "https://github.com/theboshy", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/peter-lobo/",
    label: "LinkedIn",
  },
  { icon: x, href: "https://twitter.com", label: "Twitter" },
];
