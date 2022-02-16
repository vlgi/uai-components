declare type SvelteActionReturnType = void | {
  update?: (args: unknown)=> void;
  destroy?: ()=> void;
}
