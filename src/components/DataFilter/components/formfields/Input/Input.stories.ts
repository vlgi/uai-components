import type { ArgType } from "@storybook/addons";
import Input from "./Input.svelte";
import InputView from "./InputView.svelte";

export default {
  title: "Internal Documentation/Components/DataFilter/Formfields/Input",
  component: Input,
  parameters: {
    // skip all screen test
    creevey: {
      skip: true,
    },
    // disabled because I make the tests in a jest file
    storyshots: false,
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
    Component: Input,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  name: "name",
  label: "My Input",
  value: "initial value",
  mask: "number",
});

// used for snapshot tests
const ShowCaseTemplate = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: InputView,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Numeric = ShowCaseTemplate({
  value: "1000000000",
  mask: "number",
});

export const Percentage = ShowCaseTemplate({
  value: "1234,654654",
  mask: "percentage",
});

export const Money = ShowCaseTemplate({
  value: "123456789,23456789",
  mask: "money",
});

export const CleaveJs = ShowCaseTemplate({
  value: "12345678990",
  mask: {
    delimiters: [".", ".", "-"],
    blocks: [3, 3, 3, 2],
    uppercase: true,
  },
});
