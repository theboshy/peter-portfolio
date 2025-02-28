import { useRef, useCallback } from "react";

export const useParticles = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const createParticle = useCallback(
    (x: number, y: number, color: string, duration: number) => {
      const particle = document.createElement("div");
      particle.className = "particle opacity-0";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = "4px";
      particle.style.height = "4px";
      particle.style.borderRadius = "50%";
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${color}`;
      particle.style.transition = "opacity 300ms ease-out";

      particlesRef.current?.appendChild(particle);

      particle.style.opacity = "1";
      particle.style.animation = `fadeOut ${duration}ms ease-out forwards, sparkle ${duration / 2}ms ease-in-out infinite`;

      setTimeout(() => {
        if (particle.parentNode === particlesRef.current) {
          particlesRef.current?.removeChild(particle);
        }
      }, duration);
    },
    [],
  );

  const handleScrollToContact = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const button = e.currentTarget;
      const contactSection = document.getElementById("contact-section");

      if (!contactSection) return;

      const buttonRect = button.getBoundingClientRect();
      const targetRect = contactSection.getBoundingClientRect();
      const startX = buttonRect.left + buttonRect.width / 2;
      const startY = buttonRect.top + buttonRect.height / 2;
      const endY = targetRect.top;

      const initialDelay = 0;
      const duration = 1000;

      button.classList.add("pulse-once");
      await new Promise((resolve) => setTimeout(resolve, initialDelay));
      button.classList.remove("pulse-once");

      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6;
        const x = startX + Math.cos(angle) * 20;
        const y = startY + Math.sin(angle) * 20;

        setTimeout(() => {
          createParticle(
            x,
            y,
            i % 2 === 0 ? "#238636" : "#30363D",
            duration - i * 50,
          );
        }, i * 50);
      }

      const startTime = performance.now();
      const startPosition = window.scrollY;
      const targetPosition = endY + window.scrollY - 80;

      const scroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeInOutCubic = (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const currentPosition =
          startPosition +
          (targetPosition - startPosition) * easeInOutCubic(progress);
        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          if (Math.random() < 0.3) {
            const remainingDuration = duration * (1 - progress);
            createParticle(
              startX + Math.random() * 20 - 10,
              startY + (currentPosition - startPosition),
              Math.random() > 0.5 ? "#238636" : "#30363D",
              remainingDuration,
            );
          }
          requestAnimationFrame(scroll);
        } else {
          isAnimatingRef.current = false;
        }
      };

      requestAnimationFrame(scroll);
    },
    [createParticle],
  );

  return {
    particlesRef,
    createParticle,
    handleScrollToContact,
  };
};
