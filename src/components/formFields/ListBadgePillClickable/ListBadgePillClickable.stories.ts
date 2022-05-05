import type { ArgType } from "@storybook/addons";
import ListBadgePillClickable from "./ListBadgePillClickable.svelte";
import Wrapper from "./ListBadgePillClickableWrapper.svelte";

export default {
  title: "Components/FormFields/ListBadgePillClickable",
  component: ListBadgePillClickable,
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
        options: ["dark", "light"],
      },
    },
    direction: {
      table: { category: "properties" },
      control: {
        type: "select",
        options: ["row", "column"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Wrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

const badgeItems = [
  {
    value: "firstItem",
    checked: false,
    label: "Item 1",
  },
  {
    value: "secondItem",
    checked: false,
    label: "Item 2",
  },
  {
    value: "thirdItem",
    checked: false,
    label: "Item 3",
  },
];

const badgeItems2 = [
  {
    value: "firstItem",
    checked: true,
    label: "Item 1",
  },
  {
    value: "secondItem",
    checked: false,
    label: "Item 2",
  },
  {
    value: "thirdItem",
    checked: false,
    label: "Item 3",
  },
  {
    value: "forthItem",
    checked: true,
    label: "Item 4",
  },
  {
    value: "fifthItem",
    checked: false,
    label: "Item 5",
  },
];

export const Default = Template({
  badgeItems,
});

export const Column = Template({
  direction: "column",
  badgeItems,
});

export const WithIcons = Template({
  iconPosition: "both",
  badgeItems,
});

export const Invalid = Template({
  required: true,
  forceInvalid: true,
  iconPosition: "left",
  min: 5,
  badgeItems,
});

export const Custom: any = Template({
  iconPosition: "right",
  badgeStyle: "light",
  badgeItems: badgeItems2,
  style: "--szot-badge-pill-background-color: linear-gradient("
  + "90deg, "
  + "#f0ad42 1.3%, "
  + "#fe5da3 46.64%, "
  + "#a00bea 100%);"
  + "background-color: #202020;",
});

Custom.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<script lang="ts">
  import ListBadgePillClickable from "./ListBadgePillClickable.svelte";

  const badgeItems = [
    {
      value: "firstItem",
      checked: true,
      label: "Item 1",
    },
    {
      value: "secondItem",
      checked: false,
      label: "Item 2",
    },
    {
      value: "thirdItem",
      checked: false,
      label: "Item 3",
    },
    {
      value: "forthItem",
      checked: true,
      label: "Item 4",
    },
    {
      value: "fifthItem",
      checked: false,
      label: "Item 5",
    },
  ];
</script>
<div
  style="--szot-badge-pill-background-color:
    linear-gradient(90deg, #f0ad42 1.3%, #fe5da3 46.64%, #a00bea 100%);"
  >
  <ListBadgePillClickable
    badgeStyle="right"
    iconPosition="left"
    {badgeItems}
  />
</div>
`,
    },
  },
};
