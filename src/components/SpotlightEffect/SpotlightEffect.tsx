import React, { useEffect, useRef } from 'react';
import { useSpotlight } from './useSpotlight';
import { spotlightStyles, spotlightGradientStyles } from './SpotlightEffect.styles';

interface SpotlightEffectProps {
  size?: number;
  color?: string;
  opacity?: number;
  isEnabled?: boolean;
  blur?: number;
}

const SpotlightEffect: React.FC<SpotlightEffectProps> = ({
  size = 300,
  color = '#238636',
  opacity = 0.15,
  isEnabled = true,
  blur = 100
}) => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const {
    isActive,
    position,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave
  } = useSpotlight();

  useEffect(() => {
    if (!isEnabled) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isEnabled, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  if (!isEnabled) return null;

  return (
    <div className={spotlightStyles({ isActive })} style={{ zIndex: 20 }}>
      <div
        ref={spotlightRef}
        className={spotlightGradientStyles()}
        style={{
          left: position.x,
          top: position.y,
          width: size * 2,
          height: size * 2,
          background: `radial-gradient(circle at center, 
            ${color} 0%, 
            ${color}00 70%)`,
          opacity,
          filter: `blur(${blur}px)`,
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};

export default React.memo(SpotlightEffect);