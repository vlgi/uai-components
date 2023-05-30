import type { ArgType } from "@storybook/addons";
import Badge from "./Badge.svelte";
import BadgeWrapper from "./BadgeWrapperForTest.svelte";

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    badgeStyle: {
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
      },
    },
    badgeStyleType: {
      control: {
        type: "select",
        options: ["filled", "outline", "not-filled"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: BadgeWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Theme = Template({
  style: "",
  labelSlot: "Badge",
  badgeStyle: "dark",
});

export const Border = Template({
  labelSlot: "Badge",
  badgeStyle: "light",
  badgeStyleType: "outline",
});

export const CustomExample: any = Template({
  labelSlot: "New",
  style: "--szot-badge-color:#FFFFFF;"
          + "--szot-badge-background-color:linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);",
});
CustomExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<script lang="ts">
  import Badge from "./Badge.svelte";
</script>
<div 
  style="--szot-badge-color="#FFFFFF;
  --szot-badge-background-color="linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
  >
  <Badge 
    New
  </Badge>
</div>
`,
    },
  },
};
