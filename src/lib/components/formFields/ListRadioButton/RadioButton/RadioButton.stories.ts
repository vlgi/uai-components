import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import RadioButton from "./RadioButton.svelte";
import RadioButtonWrapper from "./RadioButtonWrapper.svelte";

export default {
  title: "Components/FormFields/RadioButton",
  component: RadioButton,
  argTypes: {
    onClick: { action: "on:click" },
    radioStyleType: {
      control: {
        type: "select",
        options: ["filled", "notFilled", "badge-pill"],
      },
    },
    iconPosition: {
      control: {
        type: "select",
        options: ["left", "right", "both", "none"],
      },
    },
    badgeStyle: {
      control: {
        type: "select",
        options: ["dark", "light", "primary", "secondary"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: RadioButtonWrapper,
    props,
    on: {
      click: action("on:click"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  name: "default",
  value: "default",
  group: "",
});

export const Filled = Template({
  radioStyleType: "filled",
  name: "filled",
  value: "filled",
  group: "filled",
});

export const Labeled = Template({
  label: "Item",
  name: "labeled",
  value: "labeled",
  group: "labeled",
});

export const Badge = Template({
  label: "Item",
  name: "labeled",
  value: "labeled",
  group: "",
  radioStyleType: "badge-pill",
});

export const EnableUncheck = Template({
  name: "default",
  value: "default",
  group: "",
  enableUncheck: true,
});

export const LargeLabeled = Template({
  label: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  name: "labeled",
  value: "labeled",
  group: "",
});

export const CustomBadgePillExample: any = Template({
  name: "badge-pill",
  radioStyleType: "badge-pill",
  badgeStyle: "primary",
  label: "label",
  value: "labeled",
  group: "",
  iconPosition: "both",
  style: "--szot-radio-badge-pill-background: #678;"
  + "--szot-radio-badge-pill-icon-color: purple;"
  + "--szot-radio-badge-pill-label-color: purple;"
  + "--szot-radio-badge-pill-border-color: purple;"
  + "--szot-radio-badge-pill-selected-icon-color: purple;"
  + "--szot-radio-badge-pill-selected-label-color: white;"
  + "--szot-radio-badge-pill-selected-border-color: purple;"
  + "--szot-radio-badge-pill-height: 3rem;",
});
