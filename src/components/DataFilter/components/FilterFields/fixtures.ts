import { TConfig, EFieldType } from "./types";
import { EPickerType } from "../formfields/Datepicker/types";

const selectOptions = [
  { text: "Foo", value: "Foo-value" },
  { text: "Lorem", value: "Lorem-value" },
  { text: "Test", value: "Test-value" },
];

export const allCommonConfigs: TConfig[] = [
  // Datepickers
  {
    fieldType: EFieldType.datepicker,
    key: "datetime",
    label: "Datetime",
    pickerType: EPickerType.datetime,
  },
  {
    fieldType: EFieldType.datepicker,
    key: "date",
    label: "Date",
    pickerType: EPickerType.date,
  },
  {
    fieldType: EFieldType.datepicker,
    key: "time",
    label: "Time",
    pickerType: EPickerType.time,
  },
  {
    fieldType: EFieldType.datepicker,
    key: "month",
    label: "Month",
    pickerType: EPickerType.month,
  },

  // Datepickers range
  {
    fieldType: EFieldType.datepickerRange,
    key: "datetime-range",
    label: "Datetime Range",
    pickerType: EPickerType.datetime,
  },
  {
    fieldType: EFieldType.datepickerRange,
    key: "date-range",
    label: "Date Range",
    pickerType: EPickerType.date,
  },
  {
    fieldType: EFieldType.datepickerRange,
    key: "time-range",
    label: "Time Range",
    pickerType: EPickerType.time,
  },
  {
    fieldType: EFieldType.datepickerRange,
    key: "month-range",
    label: "Month Range",
    pickerType: EPickerType.month,
  },

  // Input picker
  {
    fieldType: EFieldType.input,
    key: "input-money",
    label: "Input Money",
    mask: "money",
  },
  {
    fieldType: EFieldType.input,
    key: "input-percentage",
    label: "Input Percentage",
    mask: "percentage",
  },
  {
    fieldType: EFieldType.input,
    key: "input-number",
    label: "Input Number",
    mask: "number",
  },

  // Input picker range
  {
    fieldType: EFieldType.inputRange,
    key: "input-money-range",
    label: "Input Money Range",
    mask: "money",
  },
  {
    fieldType: EFieldType.inputRange,
    key: "input-percentage-range",
    label: "Input Percentage Range",
    mask: "percentage",
  },
  {
    fieldType: EFieldType.inputRange,
    key: "input-number-range",
    label: "Input Number Range",
    mask: "number",
  },

  // select
  {
    fieldType: EFieldType.select,
    key: "single-select",
    label: "Single Select",
    options: selectOptions,
    multiple: false,
  },
  {
    fieldType: EFieldType.select,
    key: "multiple-select",
    label: "Multiple Select",
    options: selectOptions,
    multiple: true,
  },
];
