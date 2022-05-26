import type { ArgType } from "@storybook/addons";
import Datepicker from "./Datepicker.svelte";
import DatepickerView from "./DatepickerView.svelte";
import { EPickerType } from "./types";

export default {
  title: "Internal Documentation/Components/DataFilter/Formfields/Datepicker",
  component: Datepicker,
  parameters: {
    // skip all screen test
    creevey: {
      skip: true,
    },
  },
  argTypes: {
    pickerType: {
      options: Object.values(EPickerType),
      control: {
        type: "select",
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Datepicker,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  label: "My Picker Label",
  name: "my-picker-name",
  pickerType: EPickerType.datetime,
  value: "2000-01-13T11:50",
});

// used for snapshot tests
const ShowCaseTemplate = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: DatepickerView,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Datetime = ShowCaseTemplate({
  pickerType: EPickerType.datetime,
  value: "2000-01-13T11:50",
});

export const Date = ShowCaseTemplate({
  pickerType: EPickerType.date,
  value: "2000-01-13",
});

export const Month = ShowCaseTemplate({
  pickerType: EPickerType.month,
  value: "2000-01",
});

export const Time = ShowCaseTemplate({
  pickerType: EPickerType.time,
  value: "11:50",
});
