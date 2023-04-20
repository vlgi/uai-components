import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import Icon from "./Icon.svelte";
import Wrapper from "./IconWrapper.svelte";

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    onClick: { action: "onClick" },
  },
  parameters: {
    // skip all screen test for this stories
    creevey: {
      skip: true,
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Wrapper,
    props,
    on: {
      click: action("onClick"),
    },
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  iconName: "mdi:cellphone",
});

export const Custom: any = Template({
  iconName: "ic:baseline-apple",
  style:
      "--szot-icon-font-size: 80px;"
      + "--szot-icon-color: red;",
});

Custom.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
  <script lang="ts">
    import Icon from "./Icon.svelte";
  </script>

  <div style="--szot-icon-font-size: 80px;
    --szot-icon-color: red;" >
    <Icon iconName={"ic:baseline-apple"} />
  </div>
  `,
    },
  },
};
