export function actionWatchSize(node: HTMLElement): SvelteActionReturnType {
  let ticking = false;
  let lastBorderBoxSize: ResizeObserverSize;

  /**
   * Throttles the resize observer callback to avoid creating performance issues. This was
   * inspired by scroll event throttling.
   * https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#scroll_event_throttling
   *
   * @param {ResizeObserverEntry} entry One entry of an ResizeObserver
   */
  function handleResize(entry: ResizeObserverEntry) {
    const borderBoxSize = entry.borderBoxSize as ResizeObserverSize | ResizeObserverSize[];
    lastBorderBoxSize = Array.isArray(borderBoxSize) ? borderBoxSize[0] : borderBoxSize;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        /**
         * Dispatches a actionResize event on the node the action was used. The details contains the
         * new border box size of the element.
         */
        entry.target.dispatchEvent(new CustomEvent("actionResize", {
          detail: lastBorderBoxSize,
        }));
        ticking = false;
      });

      ticking = true;
    }
  }

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach(handleResize);
  });

  resizeObserver.observe(node);

  return {
    destroy() {
      resizeObserver.disconnect();
    },
  };
}
