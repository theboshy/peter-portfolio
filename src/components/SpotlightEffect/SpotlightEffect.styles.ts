import { tv } from 'tailwind-variants';

export const spotlightStyles = tv({
  base: [
    'fixed inset-0 pointer-events-none',
    'transition-opacity duration-300'
  ],
  variants: {
    isActive: {
      true: 'opacity-100',
      false: 'opacity-0'
    }
  }
});

export const spotlightGradientStyles = tv({
  base: [
    'absolute transform -translate-x-1/2 -translate-y-1/2',
    'rounded-full pointer-events-none',
    'transition-all duration-100 ease-out'
  ]
});