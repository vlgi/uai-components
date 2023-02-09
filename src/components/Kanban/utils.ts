import type { TCardAttachment } from "./data/types";

// return the first letter of the first and last names
export function returnInitialsNames(name: string): string {
  const splitted = name.split(" ");
  const first = splitted[0].charAt(0);
  const last = splitted[splitted.length - 1].charAt(0);
  return first + last;
}

export function getFilenameFromUrl(url: string): string {
  return url.substring(url.lastIndexOf("/") + 1);
}

export function getCover(atts: TCardAttachment[]): string {
  if (!atts) return "";
  for (let index = 0; index < atts.length; index++) {
    if (atts[index].isCover) return atts[index].url;
  }
  return "";
}
