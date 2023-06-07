import type { Meta } from "@storybook/svelte";
import type { StoryObj, TemplateObj } from "$types/storybook";
import RangeSlider from "./RangeSlider.svelte";
import RangeSliderExample from "./RangeSliderExample.svelte";

const meta = {
  title: "Components/form fields/RangeSlider",
  component: RangeSlider,
  tags: ["autodocs"], // enable auto docs
} satisfies Meta<RangeSlider>;

export default meta;

type Template = TemplateObj<typeof meta, RangeSliderExample>;
type Story = StoryObj<typeof meta, RangeSliderExample>;

const template = {
  render: (args) => ({
    Component: RangeSliderExample,
    props: args,
  }),
  args: {},
} satisfies Template;

export const Default: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "default",
    max: 100,
    min: 0,
    value: 70,
  },
};

export const ForceInvalid: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "few-value",
    max: 40,
    min: 0,
    value: 3,
    forceInvalid: true,
    errorMsg: "Erro",
  },
};

export const FewValues: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "few-value",
    max: 5,
    min: 0,
    value: 3,
  },
};

export const CustomExample: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "custom",
    max: 50,
    min: 1,
    value: 10,
    style:
      "--szot-range-slider-background-color-filled: linear-gradient(90deg, #fe5da3, #a00bea);" +
      "--szot-range-slider-background-color: #aaa;" +
      "--szot-range-slider-thumb-background-color: #333;" +
      "--szot-range-slider-height: 20px;" +
      "--szot-range-slider-thumb-border: 3px solid white;",
  },
};

export const CustomExampleFull: Story = {
  ...template,
  args: {
    ...template.args,
    // args for this specific story here
    name: "custom",
    max: 50,
    min: 1,
    value: 50,
    style:
      "--szot-range-slider-background-color-filled: linear-gradient(90deg, #fe5da3, #a00bea);" +
      "--szot-range-slider-background-color: #aaa;" +
      "--szot-range-slider-thumb-background-color: #333;" +
      "--szot-range-slider-height: 20px;",
  },
};
