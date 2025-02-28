import { tv } from "tailwind-variants";

export const footerStyles = tv({
  base: "border-t border-tech-gray py-8",
});

export const containerStyles = tv({
  base: "flex flex-col md:flex-row items-center justify-between gap-4",
});

export const terminalTextStyles = tv({
  base: "font-mono text-tech-gray",
});

export const socialLinksStyles = tv({
  base: "flex items-center space-x-6",
});

export const socialLinkStyles = tv({
  base: "text-tech-gray hover:text-neon-green transition-colors",
});
