import { tv } from "tailwind-variants";

export const timelineStyles = tv({
  base: "py-24 relative bg-space-black",
});

export const headerStyles = tv({
  base: "max-w-3xl mx-auto text-center mb-16",
});

export const timelineCardStyles = tv({
  base: [
    "relative group/card w-[400px]",
    "transition-transform duration-300 hover:scale-105",
    "hover:z-10",
  ],
});

export const cardContentStyles = tv({
  base: [
    "bg-tech-gray/30 backdrop-blur-sm rounded-xl p-6",
    "border border-white/10 hover:border-neon-green/30",
    "transition-all duration-300",
    "group-hover/card:shadow-[0_8px_30px_rgba(35,134,54,0.2)]",
    "relative overflow-hidden",
  ],
});
