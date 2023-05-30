import type { StorybookConfig } from "@storybook/sveltekit";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      // https://storybook.js.org/docs/react/writing-docs/mdx#lack-of-github-flavored-markdown-gfm
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: "@storybook/sveltekit",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};
export default config;
