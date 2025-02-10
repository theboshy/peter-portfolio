import { tv } from 'tailwind-variants';

export const sectionStyles = tv({
  base: 'py-24 relative scroll-mt-20'
});

export const containerStyles = tv({
  base: 'rounded-3xl overflow-hidden relative'
});

export const formInputStyles = tv({
  base: 'w-full px-4 py-3 rounded-lg bg-white/5 border focus:border-neon-green focus:ring-1 focus:ring-neon-green outline-none transition-colors',
  variants: {
    hasError: {
      true: 'border-red-500',
      false: 'border-white/10'
    }
  }
});

export const socialLinkStyles = tv({
  base: 'p-3 rounded-full bg-white/5 hover:bg-neon-green/20 text-gray-400 hover:text-neon-green transition-all duration-300 group'
});

export const submitButtonStyles = tv({
  base: 'w-full px-8 py-4 bg-neon-green text-white rounded-lg font-medium hover:bg-neon-green/90 transition-all flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed'
});