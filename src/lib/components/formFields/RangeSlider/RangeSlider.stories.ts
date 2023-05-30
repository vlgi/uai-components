import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import RangeSlider from "./RangeSlider.svelte";
import RangeSliderWrapper from "./RangeSliderWrapper.svelte";

export default {
  title: "Components/FormFields/RangeSlider",
  component: RangeSlider,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: RangeSliderWrapper,
    props,
    on: {
      input: action("on:input"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  name: "default",
  max: 100,
  min: 0,
  value: 70,
});

export const FewValues = Template({
  name: "few-value",
  max: 5,
  min: 0,
  value: 3,
});

export const ForceInvalid = Template({
  name: "few-value",
  max: 40,
  min: 0,
  value: 3,
  forceInvalid: true,
  errorMsg: "Erro",
});

export const CustomExample = Template({
  name: "custom",
  max: 50,
  min: 1,
  value: 10,
  style: "--szot-range-slider-background-color-filled: linear-gradient(90deg, #fe5da3, #a00bea);"
  + "--szot-range-slider-background-color: #aaa;"
  + "--szot-range-slider-thumb-background-color: #333;"
  + "--szot-range-slider-height: 20px;"
  + "--szot-range-slider-thumb-border: 3px solid white;",
});

export const CustomExampleFull = Template({
  name: "custom",
  max: 50,
  min: 1,
  value: 50,
  style: "--szot-range-slider-background-color-filled: linear-gradient(90deg, #fe5da3, #a00bea);"
  + "--szot-range-slider-background-color: #aaa;"
  + "--szot-range-slider-thumb-background-color: #333;"
  + "--szot-range-slider-height: 20px;",
});
