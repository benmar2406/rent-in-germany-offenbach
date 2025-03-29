import { writable } from 'svelte/store';

const intersectionObserver = (elementToObserve) => {
  const isVisible = writable(false);

  if (elementToObserve) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.set(true);
        observer.disconnect(); // Remove this if you want it to toggle on/off
      }
    });

    observer.observe(elementToObserve);

    return {
      isVisible,
      destroy: () => observer.disconnect()
    };
  }

  return { isVisible }; // fallback
};

export default intersectionObserver;
