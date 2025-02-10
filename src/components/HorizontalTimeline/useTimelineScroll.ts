import React, { useCallback, useRef, RefObject } from 'react';

interface ScrollState {
  isScrolling: boolean;
  animationFrameId: number | null;
}

export const useTimelineScroll = (
  containerRef: RefObject<HTMLDivElement>,
  scrollContainerRef: RefObject<HTMLDivElement>
) => {
  const scrollState = useRef<ScrollState>({
    isScrolling: false,
    animationFrameId: null
  });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || !scrollContainerRef.current) return;

    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Calculate relative cursor position (0 to 1)
    const relativeX = (e.clientX - rect.left) / rect.width;
    
    // Calculate maximum scroll distance
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    
    // Calculate scroll speed based on distance from center
    // Center point is 0.5 (50% of width)
    const distanceFromCenter = relativeX - 0.5;
    
    // Create a dead zone in the center (±5% from center)
    const deadZone = 0.05;
    
    // Calculate scroll speed with easing
    let scrollSpeed = 0;
    
    if (Math.abs(distanceFromCenter) > deadZone) {
      // Normalize the distance to account for dead zone
      const normalizedDistance = (Math.abs(distanceFromCenter) - deadZone) / (0.5 - deadZone);
      // Apply easing function (cubic) for smoother acceleration
      const easedSpeed = Math.pow(normalizedDistance, 3);
      // Set direction based on which side of center we're on
      scrollSpeed = (distanceFromCenter > 0 ? 1 : -1) * easedSpeed * 15; // Adjust multiplier for speed
    }

    // Cancel any existing animation
    if (scrollState.current.animationFrameId !== null) {
      cancelAnimationFrame(scrollState.current.animationFrameId);
    }

    // Only start animation if we have a non-zero scroll speed
    if (scrollSpeed !== 0) {
      const animate = () => {
        if (!scrollContainer) return;
        
        const currentScroll = scrollContainer.scrollLeft;
        const newScroll = Math.max(0, Math.min(maxScroll, currentScroll + scrollSpeed));
        
        if (newScroll !== currentScroll) {
          scrollContainer.scrollLeft = newScroll;
          scrollState.current.animationFrameId = requestAnimationFrame(animate);
        }
      };

      scrollState.current.isScrolling = true;
      scrollState.current.animationFrameId = requestAnimationFrame(animate);
    } else {
      // Stop animation if in dead zone
      scrollState.current.isScrolling = false;
      if (scrollState.current.animationFrameId !== null) {
        cancelAnimationFrame(scrollState.current.animationFrameId);
        scrollState.current.animationFrameId = null;
      }
    }
  }, [containerRef, scrollContainerRef]);

  // Cleanup function to cancel any ongoing animations
  const cleanup = useCallback(() => {
    if (scrollState.current.animationFrameId !== null) {
      cancelAnimationFrame(scrollState.current.animationFrameId);
      scrollState.current.animationFrameId = null;
    }
    scrollState.current.isScrolling = false;
  }, []);

  return {
    handleMouseMove,
    cleanup
  };
};