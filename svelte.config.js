import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import scssAliases from "./scripts/scssAliases.js";
import aliases from "./aliases.config.js";

/** @type {import('@sveltejs/kit').Config} */
export default {
  /**
   * Consult https://svelte.dev/docs#compile-time-svelte-preprocess
   * for more information about preprocessors.
   */
  preprocess: [
    preprocess({
      scss: {
        importer: [
          // Bad typecast, but this feature doesn't seem deprecated, only the type
          scssAliases(aliases),
        ],
      },
    }),
  ],

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: aliases,
  },
};
