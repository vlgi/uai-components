import type { Meta, StoryObj } from "@storybook/svelte";
import ThemeColors from "./components/Colors/Colors.svelte";
import ThemeFonts from "./components/Fonts/Fonts.svelte";
import ThemeSpacings from "./components/Spacings/Spacings.svelte";
import ThemeSurfaces from "./components/Surfaces/Surfaces.svelte";
import ThemeScroll from "./components/Scroll/Scroll.svelte";

const meta = {
  title: "Theme",
  component: ThemeColors,
} satisfies Meta<ThemeColors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => ({
    Component: ThemeColors,
  }),
};

export const Fonts: Story = {
  render: () => ({
    Component: ThemeFonts,
  }),
};

export const Spacings: Story = {
  render: () => ({
    Component: ThemeSpacings,
  }),
};

export const Surfaces: Story = {
  render: () => ({
    Component: ThemeSurfaces,
  }),
};

export const Scroll: Story = {
  render: () => ({
    Component: ThemeScroll,
  }),
};
