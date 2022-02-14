import type { ArgType } from "@storybook/addons";
import DatePicker from "./DatePicker.svelte";
import DatePickerWrapper from "./DatePickerWrapperForTest.svelte";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
  argTypes: {
    presentation: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["date", "date-time", "month", "month-year", "time", "time-date", "year"],
      },
    },
    inputStyle: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["primary", "secondary", "dark", "light"],
      },
    },
    border: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["bottom", "outline"],
      },
    },
    iconPosition: {
      table: { category: "visual properties" },
      control: {
        type: "select",
        options: ["left", "right"],
      },
    },
    icon: { table: { category: "visual properties" } },
    doneText: { table: { category: "visual properties" } },
    cancelText: { table: { category: "visual properties" } },
    formatDate: { table: { category: "visual properties" } },

    errorMsg: { table: { category: "validation properties" } },
    validationFn: { table: { category: "validation properties" } },
    forceInvalid: { table: { category: "validation properties" } },
    isValid: { table: { category: "validation properties" } },
    required: { table: { category: "validation properties" } },

    helperText: { table: { category: "other properties" } },
    value: { table: { category: "other properties" } },
    label: { table: { category: "other properties" } },
    type: { table: { category: "other properties" } },
    name: { table: { category: "other properties" } },
    disabled: { table: { category: "other properties" } },
    readonly: { table: { category: "other properties" } },
    inputElement: { table: { category: "other properties" } },
    inputAttributes: { table: { category: "other properties" } },
    output: { table: { category: "other properties" } },
    max: { table: { category: "other properties" } },
    min: { table: { category: "other properties" } },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: DatePickerWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  label: "Data de Nascimento",
});

export const CustomExample = Template({
  label: "Data de Entrada",
  inputStyle: "secondary",
  border: "bottom",
});
