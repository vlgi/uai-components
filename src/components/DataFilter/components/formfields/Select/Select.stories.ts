import type { ArgType } from "@storybook/addons";
import Select from "./Select.svelte";
import SelectView from "./SelectView.svelte";

export default {
  title: "Internal Documentation/Components/DataFilter/Formfields/Select",
  component: Select,
  argTypes: {
    options: {
      control: {
        type: "object",
      },
    },
    selected: {
      control: {
        type: "object",
      },
    },
  },
  parameters: {
    // skip all screen test
    creevey: {
      skip: true,
    },
    // disabled because slim-select use random classnames and I don't know how to disable that
    storyshots: false,
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Select,
    props,
  });
  ret.args = _args;
  return ret;
};

const options = [
  { text: "Foo", value: "Foo-value" },
  { text: "Lorem", value: "Lorem-value" },
  { text: "Test", value: "Test-value" },
];

export const Default = Template({
  label: "my-select-label",
  name: "my-select-default",
  multiple: true,
  options,
  selected: [
    "Foo-value",
    "Lorem-value",
  ],
});

// used for snapshot tests
const ShowCaseTemplate = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: SelectView,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Multiple = ShowCaseTemplate({
  multiple: true,
  options,
  selected: [
    "Foo-value",
    "Lorem-value",
  ],
});

export const Single = ShowCaseTemplate({
  multiple: false,
  options,
  selected: [
    "Foo-value",
    "Lorem-value",
  ],
});

export const Limit2 = ShowCaseTemplate({
  multiple: true,
  options,
  limit: 2,
  selected: [
    "Foo-value",
    "Lorem-value",
    "Test-value",
  ],
});

export const Empty = ShowCaseTemplate({
  multiple: true,
});
