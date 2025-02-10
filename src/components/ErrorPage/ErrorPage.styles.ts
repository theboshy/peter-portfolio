import { tv } from 'tailwind-variants';

export const containerStyles = tv({
    base: [
        'min-h-screen flex items-center justify-center p-4',
        'bg-space-black relative overflow-hidden',
        'before:content-[""] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,rgba(35,134,54,0.15)_0%,transparent_60%)]'
    ]
});

export const contentStyles = tv({
    base: [
        'relative z-10 max-w-2xl mx-auto text-center',
        'animate-fade-in'
    ]
});

export const illustrationStyles = tv({
    base: [
        'relative w-64 h-64 mx-auto mb-8',
        'before:content-[""] before:absolute before:inset-0',
        'before:bg-neon-green/20 before:rounded-full before:animate-pulse-glow',
        'after:content-[""] after:absolute after:inset-8',
        'after:border-2 after:border-neon-green/30 after:rounded-full after:animate-spin-slow'
    ]
});

export const headingStyles = tv({
    base: 'text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-neon-green bg-clip-text text-transparent'
});

export const messageStyles = tv({
    base: 'text-xl text-gray-300 mb-8'
});

export const buttonStyles = tv({
    base: [
        'inline-flex items-center gap-2 px-8 py-4',
        'bg-neon-green text-white rounded-full',
        'transition-all duration-300',
        'hover:bg-neon-green/90 hover:scale-105',
        'focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:ring-offset-2 focus:ring-offset-space-black'
    ]
});

export const suggestedLinksStyles = tv({
    base: 'mt-8 flex flex-wrap justify-center gap-4'
});

export const linkStyles = tv({
    base: [
        'px-4 py-2 rounded-full',
        'border border-tech-gray/30',
        'text-gray-300 hover:text-white',
        'transition-all duration-300',
        'hover:border-neon-green/30 hover:bg-neon-green/10'
    ]
});

export const languageSelectorStyles = tv({
    base: [
        'fixed top-4 right-4 z-20',
        'animate-fade-in'
    ]
});
