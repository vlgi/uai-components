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
  core: {
    builder: 'webpack5',
  },
}