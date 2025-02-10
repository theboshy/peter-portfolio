import { tv } from 'tailwind-variants';

export const sectionStyles = tv({
  base: 'py-24 relative'
});

export const headerStyles = tv({
  base: 'max-w-3xl mx-auto text-center mb-16'
});

export const projectCardStyles = tv({
  base: 'group rounded-2xl overflow-hidden bg-tech-gray/30 backdrop-blur-sm border border-white/10 hover:border-neon-green/30 transition-all duration-300'
});

export const imageContainerStyles = tv({
  base: 'relative aspect-video overflow-hidden'
});

export const imageStyles = tv({
  base: 'w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500'
});

export const linkStyles = tv({
  base: 'inline-flex items-center text-sm text-neon-green hover:text-neon-green/80 transition-colors'
});