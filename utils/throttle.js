export function throttle(fn, delay) {
  let lastCall = 0;
  let timeoutId = null;
  let lastArgs = null;

  return function (...args) {
    const now = Date.now();
    const elapsed = now - lastCall;
    lastArgs = args;

    if (elapsed >= delay) {
      lastCall = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn(...lastArgs);
      }, delay - elapsed);
    }
  };
}
