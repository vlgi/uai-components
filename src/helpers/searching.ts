import Fuse from "fuse.js";

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
