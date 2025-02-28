import { tv } from "tailwind-variants";

export const consoleStyles = tv({
  base: [
    "fixed z-10 bg-space-black/95 backdrop-blur-md border border-tech-gray/30 shadow-2xl transition-all duration-300",
    "md:bottom-20 md:right-4 md:w-96",
  ],
  variants: {
    isExpanded: {
      true: "translate-y-0 opacity-100",
      false: "md:translate-y-[200%] md:opacity-0 md:pointer-events-none",
    },
    isActive: {
      true: "ring-2 ring-neon-green/50",
      false: "",
    },
    isMobile: {
      true: [
        "left-4 right-4 bottom-4",
        "h-12 data-[expanded=true]:h-[40vh]",
        "rounded-lg",
        "shadow-lg",
      ],
      false: "rounded-lg",
    },
  },
});

export const headerStyles = tv({
  base: [
    "flex items-center justify-between px-4",
    "border-b border-tech-gray/30",
    "transition-all duration-300",
  ],
  variants: {
    isMobile: {
      true: ["h-10", "data-[expanded=true]:h-12"],
      false: "h-12",
    },
  },
});

export const contentStyles = tv({
  base: ["transition-all duration-300", "md:block"],
  variants: {
    isExpanded: {
      true: "block",
      false: "hidden",
    },
  },
});

export const historyContainerStyles = tv({
  base: [
    "font-mono text-sm p-4",
    "overflow-y-hidden",
    "relative",
    "md:h-64",
    "h-[calc(40vh-6rem)]",
  ],
});

export const inputContainerStyles = tv({
  base: ["p-2 border-t border-tech-gray/30", "transition-all duration-300"],
});

export const inputStyles = tv({
  base: [
    "bg-transparent text-white border-none outline-none",
    "w-full font-mono text-sm",
    "placeholder-gray-500",
    "md:h-8",
    "min-h-[2rem]",
    "max-h-20",
    "resize-none",
  ],
});

export const toggleButtonStyles = tv({
  base: [
    "fixed bottom-4 right-4 p-3 rounded-full",
    "bg-space-black/95 backdrop-blur-md",
    "border border-tech-gray/30",
    "shadow-lg",
    "transition-all duration-300",
    "hover:border-neon-green/30",
    "md:block",
    "hidden",
  ],
});
