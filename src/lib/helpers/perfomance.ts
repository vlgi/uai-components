/**
 * The throttle function checks the current time and compares it
 * to the last time the function was called,
 * if the difference is greater than the wait time,
 * the original function is called and the time is updated.
 *
 * @param fn
 * is the function that we want to limit the rate of calls to.
 * @param waitTime
 * time period in milliseconds that we want to limit the rate of calls to the function to.
 * @returns
 * Returns the function that we want to execute
 */

export function throttle<T extends (...args: unknown[]) => unknown>(fn: T, waitTime: number): T {
  let timer: NodeJS.Timeout | string | number | undefined = null;
  let lastExec = null;

  function returnFn(...args): void {
    if (!lastExec) {
      fn.apply(args);
      lastExec = Date.now();
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (Date.now() - lastExec >= waitTime) {
          fn.apply(args);
          lastExec = Date.now();
        }
      }, waitTime - (Date.now() - lastExec));
    }
  }
  return returnFn as T;
}
