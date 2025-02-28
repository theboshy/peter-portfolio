import { useRef, useEffect } from "react";

export const useParallax = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { parallaxRef };
};
