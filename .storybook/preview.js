// import global css to be applied to all stories
import "../src/ionic-components";
import "../src/styles/global.scss";

import customViewports from './viewports'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: "white",
    values: [
      {
        name: "black",
        value: "#000000",
      },
      {
        name: "white",
        value: "#ffffff",
      },
      {
        name: "grey",
        value: "#888888",
      },
      {
        name: "gradient",
        value: `linear-gradient(90deg, rgba(238,174,174,1) 0%, rgba(233,179,148,1) 4%, rgba(238,216,174,1) 8%, rgba(233,231,148,1) 12%, rgba(202,238,174,1) 16%, rgba(173,233,148,1) 20%, rgba(174,238,185,1) 24%, rgba(148,233,189,1) 28%, rgba(174,238,232,1) 32%, rgba(148,233,232,1) 36%, rgba(174,217,238,1) 40%, rgba(148,161,233,1) 44%, rgba(189,174,238,1) 48%, rgba(161,148,233,1) 52%, rgba(210,174,238,1) 56%, rgba(229,148,233,1) 60%, rgba(238,174,226,1) 64%, rgba(233,148,177,1) 68%, rgba(238,174,174,1) 72%, rgba(233,169,148,1) 76%, rgba(238,207,174,1) 80%, rgba(233,211,148,1) 84%, rgba(234,238,174,1) 88%, rgba(208,233,148,1) 92%, rgba(198,238,174,1) 96%, rgba(148,233,153,1) 100%)`,
      },
    ],
  },
  viewport: {
    viewports: customViewports,
  },
  storyshots: false,
}
