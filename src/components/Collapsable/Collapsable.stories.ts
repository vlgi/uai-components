import { bounceOut } from "svelte/easing";
import type { ArgType } from "@storybook/addons";
import Collapsable from "./Collapsable.svelte";
import CollapsableExample from "./CollapsableExample.svelte";
import CollapsableWrapper from "./CollapsableWrapper.svelte";

export default {
  title: "Components/Collapsable",
  component: Collapsable,
  argTypes: {
    style: {
      control: {
        type: "text",
      },
    },
    collapsableStyle: {
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
      },
    },
    collapsableStyleType: {
      control: {
        type: "select",
        options: ["filled", "outline", "not-filled"],
      },
    },
    contentBackground: {
      control: {
        type: "boolean",
      },
    },
    expanded: {
      control: {
        type: "boolean",
      },
    },
  },
};

const TemplateSingle = (_args: ArgType, code?: string) => {
  const ret = ({ ...props }) => ({
    Component: CollapsableWrapper,
    props,
  });
  ret.args = _args;
  if (code) {
    ret.parameters = {
      docs: {
        source: {
          language: "html",
          code,
        },
      },
    };
  }
  return ret;
};
const Template = (_args: ArgType, code?: string) => {
  const ret = ({ ...props }) => ({
    Component: CollapsableExample,
    props,
  });
  ret.args = _args;
  if (code) {
    ret.parameters = {
      docs: {
        source: {
          language: "html",
          code,
        },
      },
    };
  }
  return ret;
};

export const Default = TemplateSingle({
  contentBackground: false,
  expanded: false,
});

export const ContentBackground = TemplateSingle({
  title: "My Collapsable",
  contentBackground: true,
  expanded: false,
});

export const DifferentAnimation = TemplateSingle({
  title: "My Collapsable",
  contentBackground: true,
  expanded: false,
  expansionTransitionParams: {
    duration: 1000,
    delay: 500,
    easing: bounceOut,
  },
});

export const CustomExample = TemplateSingle({
  title: "My Collapsable",
  contentBackground: true,
  expanded: false,
  collapsableStyleType: "outline",
  style: `
  --szot-collapsable-border-width: 10px;
  --szot-collapsable-border-color: linear-gradient(to right, red, blue, green);
  --szot-collapsable-color: linear-gradient(to right, red, blue, green);
  --szot-collapsable-content-border-width: 5px;
  --szot-collapsable-content-border-color: linear-gradient(to bottom left, red, orange, yellow, green, blue, indigo, violet);
  --szot-collapsable-content-color: linear-gradient(to bottom left, red, orange, yellow, green, blue, indigo, violet);
  --szot-collapsable-icon-color: linear-gradient(to top, magenta, yellow, cyan);
  `,
});

export const Accordion = Template({}, `
<script lang="ts">
  import Collapsable from "./Collapsable.svelte";
</script>

<Collapsable title="My Collapsable Item 1" group="my-group">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. A non accusamus cum qui omnis hic vitae accusantium dignissimos, labore totam fugiat illo quaerat tenetur inventore dolorum ullam distinctio nihil tempore!
</Collapsable>

<Collapsable title="My Collapsable Item 2" group="my-group">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. A non accusamus cum qui omnis hic vitae accusantium dignissimos, labore totam fugiat illo quaerat tenetur inventore dolorum ullam distinctio nihil tempore!
</Collapsable>

<Collapsable title="My Collapsable Item 3" group="my-group">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. A non accusamus cum qui omnis hic vitae accusantium dignissimos, labore totam fugiat illo quaerat tenetur inventore dolorum ullam distinctio nihil tempore!
</Collapsable>

<Collapsable title="My Collapsable Item 4" group="my-group">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. A non accusamus cum qui omnis hic vitae accusantium dignissimos, labore totam fugiat illo quaerat tenetur inventore dolorum ullam distinctio nihil tempore!
</Collapsable>

<Collapsable title="My Collapsable Item 5" group="my-group">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. A non accusamus cum qui omnis hic vitae accusantium dignissimos, labore totam fugiat illo quaerat tenetur inventore dolorum ullam distinctio nihil tempore!
</Collapsable>
`);
