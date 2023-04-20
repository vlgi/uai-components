import { addCollection } from "@iconify/svelte";
import type { IconifyJSON } from "@iconify/svelte";

export function addIcons(icons: IconifyJSON[]): void {
  icons.forEach((i) => addCollection(i));
}
