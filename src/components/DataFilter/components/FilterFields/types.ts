import type { dataArray } from "slim-select/dist/data";
import type { EPickerType } from "../formfields/Datepicker/types";
import type { TMask } from "../formfields/Input/types";

import type { TValue as TInputRangeValue } from "../formfields/InputRange/types";
import type { TValue as TDatepickerRangeValue } from "../formfields/DatepickerRange/types";

export enum EFieldType {
  datepicker="datepicker",
  datepickerRange="datepickerRange",
  input="input",
  inputRange="inputRange",
  select="select",
}

export type TCommonConfig = {
  key: string, // name
  label: string,
  fieldType: EFieldType
}

export type TDatepickerConfig = TCommonConfig & {
  fieldType: EFieldType.datepicker,
  pickerType: EPickerType,
}

export type TDatepickerRangeConfig = TCommonConfig & {
  fieldType: EFieldType.datepickerRange,
  pickerType: EPickerType,
}

export type TInputConfig = TCommonConfig & {
  fieldType: EFieldType.input,
  mask: TMask,
  unmask?: (v: string)=> string,
}

export type TInputRangeConfig = TCommonConfig & {
  fieldType: EFieldType.inputRange,
  mask: TMask,
  unmask?: (v: string)=> string,
}

export type TSelectConfig = TCommonConfig & {
  fieldType: EFieldType.select,
  options: dataArray,
  multiple: boolean,
  limit?: number,
}

export type TConfig =
 | TDatepickerConfig
 | TDatepickerRangeConfig
 | TInputConfig
 | TInputRangeConfig
 | TSelectConfig;

export type TFieldsValues = TInputRangeValue | TDatepickerRangeValue | string | string[] | null;

export type TSelectedValue = {
  key: string,
  fieldType: EFieldType,
  value: TFieldsValues,
}

export type TSelectedConfigs = TConfig & {
  value: TFieldsValues,
}
