import { tv } from 'tailwind-variants';

export const sectionStyles = tv({
  base: 'relative py-16 mt-8' // Added mt-8 for top margin and reduced py-24 to py-16
});

export const headerStyles = tv({
  base: 'max-w-3xl mx-auto text-center mb-12' // Reduced from mb-16 to mb-12
});

export const cardStyles = tv({
  base: [
    'group p-8 rounded-2xl',
    'bg-gradient-to-br from-tech-gray/50 to-tech-gray/30',
    'backdrop-blur-sm border border-white/10',
    'hover:border-neon-green/30 transition-all duration-300'
  ]
});

export const iconContainerStyles = tv({
  base: 'p-3 rounded-xl bg-neon-green/10 text-neon-green'
});

export const skillTagStyles = tv({
  base: 'px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10'
});