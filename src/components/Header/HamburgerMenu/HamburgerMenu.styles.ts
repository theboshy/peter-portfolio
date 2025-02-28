import { tv } from "tailwind-variants";

export const hamburgerStyles = tv({
  base: [
    "relative w-6 h-6 md:hidden",
    "flex flex-col justify-center items-center",
    "cursor-pointer z-50",
  ],
});

export const hamburgerLineStyles = tv({
  base: [
    "absolute w-full h-0.5 bg-current",
    "transition-all duration-300 ease-in-out",
  ],
  variants: {
    isOpen: {
      true: "bg-white",
      false: "",
    },
    position: {
      top: "top-1",
      middle: "top-1/2 -translate-y-1/2",
      bottom: "bottom-1",
    },
    state: {
      closed: "",
      topOpen: "-translate-y-1/2 top-1/2 rotate-45",
      middleOpen: "opacity-0",
      bottomOpen: "-translate-y-1/2 top-1/2 -rotate-45",
    },
  },
});

export const mobileMenuStyles = tv({
  base: [
    "fixed inset-0 z-50 bg-space-black/95 backdrop-blur-md",
    "flex flex-col items-center justify-center",
    "transition-all duration-300 ease-in-out",
    "md:hidden",
  ],
  variants: {
    isOpen: {
      true: "opacity-100 pointer-events-auto translate-y-0",
      false: "opacity-0 pointer-events-none translate-y-4",
    },
  },
});

export const mobileNavLinkStyles = tv({
  base: [
    "text-2xl font-medium text-white/80 hover:text-white",
    "transition-all duration-300 ease-in-out",
    "py-4",
    "relative",
    'after:content-[""] after:absolute after:bottom-2 after:left-0 after:w-0 after:h-0.5',
    "after:bg-neon-green after:transition-all after:duration-300",
    "hover:after:w-full",
  ],
});

export const closeButtonStyles = tv({
  base: [
    "absolute top-6 right-6",
    "p-2 rounded-full",
    "text-white/80 hover:text-white",
    "bg-white/5 hover:bg-white/10",
    "transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-neon-green/50",
  ],
});
