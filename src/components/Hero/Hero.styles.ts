import { tv } from "tailwind-variants";

export const heroStyles = tv({
  base: [
    "relative min-h-screen flex items-center justify-center overflow-hidden",
    'before:content-[""] before:absolute before:inset-0 before:bg-space-black/70',
    'after:content-[""] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,rgba(35,134,54,0.15)_0%,transparent_60%)]',
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
