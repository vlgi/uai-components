import type { ArgType } from "@storybook/addons";
import Dropdown from "./Dropdown.svelte";
import DropdownTest from "./DropdownTest.svelte";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    dropdownAlignment: {
      control: {
        type: "select",
        options: [
          "leftTop",
          "leftBottom",
          "rightTop",
          "rightBottom",
          "topLeft",
          "topRight",
          "bottomLeft",
          "bottomRight",
        ],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: DropdownTest,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default: any = Template({
  triggerId: "Default",
  dropdownAlignment: "bottomRight",
  opened: true,
});

Default.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<script lang="ts">
  import Dropdown from "./Dropdown.svelte";
  import Button from "../formFields/Button/Button.svelte";
</script>

<div class="button-wrapper" id="demo-dropdown">
  <Button>Open</Button>
</div>

<Dropdown targetId="demo-dropdown">
  <span class="item">Item 1</span>
  <span class="item">Item 2</span>
  <span class="item">Item 3 Long text</span>
  <span class="item">Item 4</span>
  <span class="item">Item 5 Long Long Long text</span>
</Dropdown>

<style lang="scss">
  .item {
    display: block;
  }

  .button-wrapper {
    width: fit-content;
    height: fit-content;
  }
</style>
      `,
    },
  },
};

export const OpenClose = Template({
  triggerId: "OpenClose",
  dropdownAlignment: "bottomRight",
  opened: false,
});

export const RightAlignment = Template({
  triggerId: "RightAlignment",
  dropdownAlignment: "rightTop",
  opened: true,
});

export const LeftAlignment = Template({
  triggerId: "LeftAlignment",
  dropdownAlignment: "leftTop",
  opened: true,
});

export const BottomAlignment = Template({
  triggerId: "BottomAlignment",
  dropdownAlignment: "rightTop",
  triggerStyle: "top:290px; left:0",
  opened: true,
});

export const RightAlignmentWithAutoAdjust = Template({
  triggerId: "RightAlignmentWithAutoAdjust",
  dropdownAlignment: "rightTop",
  triggerStyle: "top:0; left:250px",
  opened: true,
});

export const largeScroll = Template({
  triggerId: "largeScroll",
  dropdownAlignment: "rightTop",
  triggerStyle: "top:100vw; left:100vw",
  scrollStyle: "width:250vw; height:250vh",
  containerStyle: "width:calc(100vw - 120px); height:calc(99vh - 120px); margin: 50px",
  opened: true,
});
