function dispatchEvent<T>(node: HTMLElement, eventName: string, detail?: T) {
  node.dispatchEvent(new CustomEvent<T>(eventName, { detail }));
}

type TInfiniteScrollParams = {
  distFromBottom: number,
}
export function infiniteScroll(node: HTMLElement, params: TInfiniteScrollParams): unknown {
  let { distFromBottom } = params;

  // Helps throttle the scroll event
  let ticking = false;
  // Store scroll position to help throttle the event
  let lastScrollTop = 0;
  // Store element scrollable height to help throttle the event
  let lastScrollHeight = 0;

  /**
   * Tries to dispatch the actionLoadMore event when adequate for the infinite
   * scroll.
   * @param {number} scrollTop The number of pixels scrolled from the top of the
   *                           element.
   * @param {number} scrollHeight The number of pixels the element can scroll.
   */
  function tryLoadMoreEvent(scrollTop: number, scrollHeight: number) {
    if (scrollHeight - distFromBottom <= scrollTop) {
      dispatchEvent(node, "actionLoadMore");
    }
  }

  /**
   * Throttles the scroll event to avoid creating performance issues.
   * https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#scroll_event_throttling
   *
   * param {Event} ev The event object sent by the scroll event.
   */
  function handleScroll() {
    lastScrollTop = node.scrollTop;
    lastScrollHeight = node.scrollHeight - node.clientHeight;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        tryLoadMoreEvent(lastScrollTop, lastScrollHeight);
        ticking = false;
      });

      ticking = true;
    }
  }

  node.addEventListener("scroll", handleScroll);

  return {
    update(_params: TInfiniteScrollParams) {
      distFromBottom = _params.distFromBottom;
    },
    destroy() {
      node.removeEventListener("scroll", handleScroll);
    },
  };
}
