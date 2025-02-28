import { tv } from "tailwind-variants";

export const heroStyles = tv({
  base: [
    "relative min-h-screen flex items-center justify-center overflow-hidden",
    'before:content-[""] before:absolute before:inset-0 before:bg-space-black/70',
    'after:content-[""] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,rgba(35,134,54,0.15)_0%,transparent_60%)]',
  ],
});

export const buttonContainerStyles = tv({
  base: "flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-delay-2 relative z-10 my-10",
});

export const primaryButtonStyles = tv({
  base: [
    "group relative",
    "px-8 py-4",
    "bg-neon-green text-white rounded-full",
    "overflow-hidden",
    "transition-transform duration-300 ease-out hover:scale-[1.02]",
    "focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:ring-offset-2 focus:ring-offset-space-black",
  ],
});

export const secondaryButtonStyles = tv({
  base: [
    "group relative",
    "px-8 py-4",
    "border border-neon-green text-neon-green rounded-full",
    "overflow-hidden",
    "transition-transform duration-300 ease-out hover:scale-[1.02]",
    "focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:ring-offset-2 focus:ring-offset-space-black",
  ],
});

export const starLayerStyles = tv({
  base: [
    "absolute inset-0",
    "opacity-40",
    'after:content-[""] after:absolute after:inset-0',
    "after:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_1px,transparent_1px)]",
    "after:bg-space-black after:bg-[length:20px_20px]",
  ],
});
