/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import ThemeExample from "./ThemeExample.svelte";
import ThemeColors from "./components/Colors/Colors.svelte";
import ThemeSizes from "./components/Sizes/Sizes.svelte";
import ThemeFonts from "./components/Fonts/Fonts.svelte"
import ThemeSpacings from "./components/Spacings/Spacings.svelte";
import ThemeSurfaces from "./components/Surfaces/Surfaces.svelte";

export default {
  title: "Theme",
  component: ThemeExample,
  parameters: {
    // skip all screen test for button stories
    creevey: {
      skip: true,
    },
    // disabled
    storyshots: false,
  },
};

export const Intro = () => ({
  Component: ThemeExample,
});

export const Colors = () => ({
  Component: ThemeColors,
});

export const Sizes = () => ({
  Component: ThemeSizes,
});

export const Fonts = () => ({
  Component: ThemeFonts,
});

export const Spacings = () => ({
  Component: ThemeSpacings,
});

export const Surfaces = () => ({
  Component: ThemeSurfaces,
});
