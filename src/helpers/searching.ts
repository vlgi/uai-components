import Fuse from "fuse.js";

export function fuzzySearch<T>(
  list: T[],
  pattern: string,
  keys: string[],
  threshold = 0.3,
): Fuse.FuseResult<T>[] {
  const all = JSON.parse(JSON.stringify(list)) as T[];
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold,
    useExtendedSearch: true,
    keys,
  };
  const fuse = new Fuse<T>(all, options);
  return fuse.search<T>(pattern);
}
