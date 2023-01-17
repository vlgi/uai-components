import Fuse from "fuse.js";

export const sleep = (t: number): Promise<void> => new Promise((r) => setTimeout(r, t));

export const tick = (): Promise<void> => sleep(0);

// {
//   item: T;
//   matches: {
//     indices: number[][];
//     key: string;
//     value: string;
//   }[];
//   refIndex: number;
//   score: number;
// }[]

export function fuzzySearch<T>(
  list: T[],
  pattern: string,
  keys: string[],
  threshold = 0.3,
): unknown[] {
  const all = JSON.parse(JSON.stringify(list)) as T[];
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold,
    useExtendedSearch: true,
    keys: [...keys],
  };
  const fuse = new Fuse(all, options);
  return fuse.search(pattern);
}

export function clickOutside(node: HTMLElement): unknown {
  const handleClick = (e) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!node.contains(e.target)) {
      node.dispatchEvent(new CustomEvent("outclick"));
    }
  };
  document.addEventListener("click", handleClick, true);
  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}

export function throttle<T extends(...args: unknown[])=> unknown>(fn: T, waitTime: number): T {
  let timer = null;
  let lastExec = null;

  function returnFn(...args): void {
    if (!lastExec) {
      fn.apply(args);
      lastExec = Date.now();
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if ((Date.now() - lastExec) >= waitTime) {
          fn.apply(args);
          lastExec = Date.now();
        }
      }, waitTime - (Date.now() - lastExec));
    }
  }
  return returnFn as T;
}
