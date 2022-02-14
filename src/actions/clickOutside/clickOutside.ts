export function actionOutClick(node: HTMLElement): SvelteActionReturnType {
  const handleClick = (event: Event) => {
    if (!node.contains(event.target as HTMLElement)) {
      node.dispatchEvent(new CustomEvent("actionOutClick"));
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}
