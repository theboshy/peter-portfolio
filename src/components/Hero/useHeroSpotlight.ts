import { useEffect, useRef, useState, RefObject } from "react";

interface SpotlightOptions {
  size: number;
  color: string;
  opacity: number;
  blur: number;
  enabled: boolean;
}

interface SpotlightStyle {
  width: string;
  height: string;
  transform: string;
  background: string;
  opacity: number;
  filter: string;
  mixBlendMode: "screen";
  display: string;
}

export const useHeroSpotlight = (
  containerRef: RefObject<HTMLElement>,
  options: SpotlightOptions,
) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isWithinBoundsRef = useRef(false);

  useEffect(() => {
    if (!options.enabled || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is within container bounds
      const isWithinBounds =
        x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      if (isWithinBounds) {
        if (!isWithinBoundsRef.current) {
          isWithinBoundsRef.current = true;
          setIsActive(true);
        }
        setPosition({ x, y });
      } else if (isWithinBoundsRef.current) {
        isWithinBoundsRef.current = false;
        setIsActive(false);
      }
    };

    const handleMouseLeave = () => {
      isWithinBoundsRef.current = false;
      setIsActive(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, options.enabled]);

  const spotlightStyle: SpotlightStyle = {
    width: `${options.size * 2}px`,
    height: `${options.size * 2}px`,
    transform: `translate(${position.x - options.size}px, ${position.y - options.size}px)`,
    background: `radial-gradient(circle at center, ${options.color} 0%, ${options.color}00 70%)`,
    opacity: isActive ? options.opacity : 0,
    filter: `blur(${options.blur}px)`,
    mixBlendMode: "screen",
    display: options.enabled ? "block" : "none",
  };

  return { spotlightStyle };
};
