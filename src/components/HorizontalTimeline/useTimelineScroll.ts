import React, { useCallback, useRef, RefObject, useEffect } from "react";

interface ScrollState {
  isScrolling: boolean;
  animationFrameId: number | null;
}

export const useTimelineScroll = (
  containerRef: RefObject<HTMLDivElement>,
  scrollContainerRef: RefObject<HTMLDivElement>,
) => {
  const scrollState = useRef<ScrollState>({
    isScrolling: false,
    animationFrameId: null,
  });

  const isMobile = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth < 768;
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (
        !containerRef.current ||
        !scrollContainerRef.current ||
        isMobile.current
      )
        return;

      const container = containerRef.current;
      const scrollContainer = scrollContainerRef.current;
      const rect = container.getBoundingClientRect();

      const relativeX = (e.clientX - rect.left) / rect.width;

      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;

      const distanceFromCenter = relativeX - 0.5;

      const deadZone = 0.05;

      let scrollSpeed = 0;

      if (Math.abs(distanceFromCenter) > deadZone) {
        const normalizedDistance =
          (Math.abs(distanceFromCenter) - deadZone) / (0.5 - deadZone);
        const easedSpeed = Math.pow(normalizedDistance, 3);
        scrollSpeed = (distanceFromCenter > 0 ? 1 : -1) * easedSpeed * 15; // Adjust multiplier for speed
      }

      if (scrollState.current.animationFrameId !== null) {
        cancelAnimationFrame(scrollState.current.animationFrameId);
      }

      if (scrollSpeed !== 0) {
        const animate = () => {
          if (!scrollContainer) return;

          const currentScroll = scrollContainer.scrollLeft;
          const newScroll = Math.max(
            0,
            Math.min(maxScroll, currentScroll + scrollSpeed),
          );

          if (newScroll !== currentScroll) {
            scrollContainer.scrollLeft = newScroll;
            scrollState.current.animationFrameId =
              requestAnimationFrame(animate);
          }
        };

        scrollState.current.isScrolling = true;
        scrollState.current.animationFrameId = requestAnimationFrame(animate);
      } else {
        scrollState.current.isScrolling = false;
        if (scrollState.current.animationFrameId !== null) {
          cancelAnimationFrame(scrollState.current.animationFrameId);
          scrollState.current.animationFrameId = null;
        }
      }
    },
    [containerRef, scrollContainerRef],
  );

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!scrollContainerRef.current) return;
      isDragging.current = true;
      startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft.current = scrollContainerRef.current.scrollLeft;
    },
    [scrollContainerRef],
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleDragMove = useCallback(
    (e: React.MouseEvent) => {
      if (
        !isDragging.current ||
        !scrollContainerRef.current ||
        !isMobile.current
      )
        return;
      e.preventDefault();
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX.current) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    },
    [scrollContainerRef],
  );

  const cleanup = useCallback(() => {
    if (scrollState.current.animationFrameId !== null) {
      cancelAnimationFrame(scrollState.current.animationFrameId);
      scrollState.current.animationFrameId = null;
    }
    scrollState.current.isScrolling = false;
    isDragging.current = false;
  }, []);

  return {
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleDragMove,
    cleanup,
    isMobile: isMobile.current,
  };
};
