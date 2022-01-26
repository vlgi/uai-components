/**
 * Workaround for custom events on native dom elements.
 * https://github.com/sveltejs/language-tools/issues/431#issuecomment-669633413
 * All events must start with "action"
 */
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    [key: `onaction${string}`]: (event: CustomEvent<any> & { target: EventTarget & T })=> any;
  }
}
