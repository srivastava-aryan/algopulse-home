import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref to attach to any element, and a boolean that flips to true
 * once that element scrolls into view. Used to drive the fade-up reveal
 * animation on each section without re-triggering on every scroll.
 *
 * If you already have a useReveal hook from the AI PR Reviewer landing page,
 * use that one instead and skip this file, the API here matches: const
 * [ref, visible] = useReveal();
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
