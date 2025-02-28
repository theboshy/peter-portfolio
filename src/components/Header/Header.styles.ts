import { tv } from "tailwind-variants";

export const headerStyles = tv({
  base: ["fixed top-0 left-0 right-0 z-50", "transition-colors duration-300"],
  variants: {
    isDark: {
      true: "bg-space-black/80",
      false: "bg-white/80",
    },
  },
});

export const navStyles = tv({
  base: [
    "flex items-center justify-between h-20",
    "transition-colors duration-300",
  ],
  variants: {
    isDark: {
      true: "text-white",
      false: "text-gray-900",
    },
  },
});

export const linkStyles = tv({
  base: "transition-colors",
  variants: {
    isDark: {
      true: "text-gray-400 hover:text-white",
      false: "text-gray-600 hover:text-gray-900",
    },
  },
});

export const desktopNavStyles = tv({
  base: [
    "hidden md:flex items-center space-x-8",
    "transition-transform duration-300",
  ],
});
