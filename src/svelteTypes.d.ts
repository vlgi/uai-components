declare type SvelteActionReturnType = void | {
  update?: (args: unknown) => void;
  destroy?: () => void;
};

/** this is not global is only available for components using svelte-dnd-action lib */
declare type Item = import("svelte-dnd-action").Item;
declare type DndEvent<ItemType = Item> = import("svelte-dnd-action").DndEvent<ItemType>;
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onconsider?: (event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }) => void;
    onfinalize?: (event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }) => void;
  }
}
