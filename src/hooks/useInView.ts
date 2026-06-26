import { useEffect, useState, useRef } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Unobserve after firing once to save performance
        observer.unobserve(el);
      }
    }, {
      rootMargin: "0px",
      threshold: 0.15,
      ...options,
    });

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [options]);

  return { ref, isVisible };
}
