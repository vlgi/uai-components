import type { ArgType } from "@storybook/addons";
import InputRange from "./InputRange.svelte";

export default {
  title: "Internal Documentation/Components/DataFilter/Formfields/Input Range",
  component: InputRange,
  parameters: {
    // skip all screen test
    creevey: {
      skip: true,
    },
  },
  argTypes: {
    mask: {
      options: [
        "number",
        "money",
        "percentage",
      ],
      control: {
        type: "select",
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: InputRange,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  name: "name",
  label: "My Input",
  value: {
    from: "123456789",
    to: "123456789",
  },
  mask: "number",
});

export const Invalid = Template({
  name: "name",
  label: "My Input",
  value: {
    from: "1234567891111",
    to: "123456789",
  },
  mask: "number",
});

export const Empty = Template({
  name: "name",
  label: "My Input",
  mask: "number",
});
