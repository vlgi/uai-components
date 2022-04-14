module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    '@storybook/addon-a11y',
    '@storybook/preset-scss',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
    'creevey',
  ],
  "framework": "@storybook/svelte",
  "svelteOptions": {
    "preprocess": require("svelte-preprocess")()
  },
  webpackFinal: async (config) => {
    // =========== Edit sass rule ============ //
    /**
     * @type { {test: RegExp, use: {loader: string, options: any}[]} }
     */
    const sass = config.module.rules.find(e => e.test.test(".scss"));

    sass.use.splice(2, 0, {
      loader: "resolve-url-loader",
    });
    if (sass.use[3].options) {
      sass.use[3].options.sourceMap = true;
    } else {
      sass.use[3].options = { sourceMap: true };
    }

    // Return the altered config
    return config;
  },
  core: {
    builder: 'webpack5',
  },
}
