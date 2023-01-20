import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import BadgePillClickable from "./BadgePillClickable.svelte";
import Wrapper from "./BadgePillCickableWrapper.svelte";

export default {
  title: "Components/FormFields/BadgePillClickable",
  component: BadgePillClickable,
  argTypes: {
    iconPosition: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["left", "right", "both", "none"],
      },
    },
    badgeStyle: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["dark", "light", "primary", "secondary"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Wrapper,
    props,
    on: {
      checkItem: action("checkItem"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  label: "test",
});

export const Checked = Template({
  label: "test",
  checked: true,
});

export const Invalid = Template({
  label: "test",
  required: true,
  isValid: false,
});

export const LightTheme = Template({
  label: "test",
  checked: true,
  badgeStyle: "light",
});

export const LeftIcon = Template({
  label: "test",
  iconPosition: "left",
});

export const RightIcon = Template({
  label: "test",
  iconPosition: "right",
});

export const LeftRightIcon = Template({
  label: "test",
  iconPosition: "both",
});

export const Custom: any = Template({
  label: "test",
  checked: true,
  iconPosition: "left",
  style: "--szot-badge-pill-background-color: linear-gradient("
    + "90deg, "
    + "#f0ad42 1.3%, "
    + "#fe5da3 46.64%, "
    + "#a00bea 100%);"
    + "--szot-badge-pill-selected-border-color: red;"
    + "--szot-badge-pill-selected-label-color: blue;",
});

Custom.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<script lang="ts">
  import BadgePillClickable from "./BadgePillClickable.svelte";
</script>
<div
  style="--szot-badge-pill-background-color:
    linear-gradient(90deg, #f0ad42 1.3%, #fe5da3 46.64%, #a00bea 100%);"
  >
  <BadgePillClickable
    label="test"
    iconPosition="left"
    checked={true}
  />
</div>
`,
    },
  },
};
