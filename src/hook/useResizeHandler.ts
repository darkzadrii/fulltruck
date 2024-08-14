import { useCallback, useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1280;

function useResizeHandler(callback?: () => void, onMount = true) {
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width < MOBILE_BREAKPOINT;
  const isTablet = width >= MOBILE_BREAKPOINT && width < DESKTOP_BREAKPOINT;
  const isDesktop = width >= DESKTOP_BREAKPOINT;

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
    callback && callback();
  }, [callback]);

  useEffect(() => {
    if (onMount) {
      handleResize();
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize, onMount]);

  return { isMobile, isTablet, isDesktop, width };
}

export default useResizeHandler;
