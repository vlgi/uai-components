function isRegistered(name: string): boolean {
  return document.createElement(name).constructor !== HTMLElement;
}

export function define(
  name: string,
  constructor: CustomElementConstructor,
  options?: ElementDefinitionOptions
): void {
  if (isRegistered(name)) return;
  customElements.define(name, constructor, options);
}
