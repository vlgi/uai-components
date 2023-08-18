import Fuse from "fuse.js";

/**
 * Filter the given array that match the pattern.
 * This module use fuzzy search method powered by the lib fusejs.
 * See more on https://www.fusejs.io/
 *
 * Example:
 * import searching from "./searching.ts"
 * const collection = [{user: {name: "test item 1"}}, {user: {name: "test item 2"}}]
 * searching(collection, "item 1", ["user.name"])
 *
 * @param list array of objects to be filtered
 * @param pattern string to search on the collections
 * @param keys keys of the object that pattern must match
 * @param threshold At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything.
 * @returns array of objects filtered
 */
export default function <T>(
  list: T[],
  pattern: string,
  keys: Array<Fuse.FuseOptionKey<T>>,
  threshold = 0.3
): T[] {
  const all = structuredClone(list);
  const options: Fuse.IFuseOptions<T> = {
    threshold,
    keys,
  };
  const fuse = new Fuse<T>(all, options);
  const result = fuse.search<T>(pattern);
  return result.map((r) => r.item);
}
