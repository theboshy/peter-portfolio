import { tv } from 'tailwind-variants';

export const heroStyles = tv({
  base: 'relative min-h-screen flex items-center justify-center overflow-hidden'
});

export const titleStyles = tv({
  base: 'text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-neon-green bg-clip-text text-transparent animate-fade-in'
});

export const descriptionStyles = tv({
  base: 'text-xl md:text-2xl text-tech-gray mb-12 animate-fade-in-delay'
});

export const buttonContainerStyles = tv({
  base: 'flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-delay-2'
});

export const primaryButtonStyles = tv({
  base: [
    'group relative',
    'px-8 py-4',
    'bg-neon-green text-white rounded-full',
    'overflow-hidden',
    'transition-transform duration-300 ease-out hover:scale-[1.02]',
    'focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:ring-offset-2 focus:ring-offset-space-black'
  ]
});

export const secondaryButtonStyles = tv({
  base: [
    'group relative',
    'px-8 py-4',
    'border border-neon-green text-neon-green rounded-full',
    'overflow-hidden',
    'transition-transform duration-300 ease-out hover:scale-[1.02]',
    'focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:ring-offset-2 focus:ring-offset-space-black'
  ]
});