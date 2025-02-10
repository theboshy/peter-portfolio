import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useSpotlight = () => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({
      x: e.clientX,
      y: e.clientY
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
  }, []);

  return {
    isActive,
    position,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave
  };
};