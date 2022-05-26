import type {
  TRecordCollection,
  TCollectionMetadata,
  TData,
} from "./record-collection/record-collection";
import { EData, getMetadata } from "./record-collection/record-collection";

export enum EFilterType {
  value,
  range,
  regex,
}

export type TFilterCommonsOptions = {
  type: EFilterType,
  key: string,
}

export type TFilterByValueOption = TFilterCommonsOptions & {
  type: EFilterType.value,
  values: TData[],
}

export type TFilterByRangeOption = TFilterCommonsOptions & {
  type: EFilterType.range,
  startValue: TData,
  endValue: TData
}

export type TFilterByRegexOption = TFilterCommonsOptions & {
  type: EFilterType.regex,
  value: string
}

export type TFilterOption = TFilterByValueOption | TFilterByRangeOption | TFilterByRegexOption

export type TFilterOptions = TFilterOption[]

export type TColumnValueOptions = TData[]

export type TColumnRangeOptions = void

export type TColumnRegexOptions = void

export type TColumnOptions = TColumnValueOptions | TColumnRangeOptions | TColumnRegexOptions

export default class FilterEngine {
  #data: TRecordCollection

  #metadata: TCollectionMetadata

  #filterOptions: TFilterOptions

  constructor(data: TRecordCollection) {
    this.#data = data;
    this.#metadata = getMetadata(data);
  }

  set filterOptions(filterOptions: TFilterOptions) {
    this.#validateOptions(filterOptions);
    this.#filterOptions = filterOptions;
  }

  get filterOptions(): TFilterOptions {
    return this.#filterOptions;
  }

  /**
   * Filter the data based on the filterOptions attribute.
   * NOTE: this method return a new array, but not does a deep copy
   */
  getFiltered(): TRecordCollection {
    let ret = this.#data;

    this.#filterOptions.forEach((filter: TFilterOption) => {
      const dataType = this.#metadata[filter.key];
      const filterType = filter.type;
      let reg: RegExp;

      switch (filterType) {
      case EFilterType.range:
        ret = ret.filter((r) => (
          r[filter.key] >= filter.startValue
          && r[filter.key] <= filter.endValue
        ));
        break;
      case EFilterType.regex:
        reg = new RegExp(filter.value);
        ret = ret.filter((r) => reg.test((r[filter.key] as string)));
        break;
      case EFilterType.value:
        if (dataType === EData.Date) {
          const filterValues = filter.values.map((x: Date) => (
            x?.getTime() || (x as undefined | null)
          ));

          ret = ret.filter((r) => {
            const value = (r[filter.key] as Date);
            return filterValues.includes(value?.getTime() || (value as undefined | null));
          });
        } else {
          ret = ret.filter((r) => filter.values.includes((r[filter.key] as TData)));
        }
        break;
      default:
      }
    });

    return ret;
  }

  /**
   * Get options for the given column at the given filter type.
   * If filter type is value, return unique values at data object
   * If filter type is any other, return void
   */
  // eslint-disable-next-line consistent-return
  getColumnOptions(columnKey: string, filterType: EFilterType): TColumnOptions {
    const columnType = this.#metadata[columnKey];

    if (!this.#hasValidColumnType(columnKey)) {
      throw new Error(`the column ${columnKey} can't be filtered`);
    } else if (!this.#hasValidFilterAndColumnTypesRule(columnKey, filterType)) {
      throw new Error(`the column ${columnKey} can't be used with ${EFilterType[filterType]} filter type`);
    }

    if (filterType === EFilterType.value) {
      if (columnType === EData.Date) {
        const unique = [...new Set(this.#data.map((r) => {
          const value = (r[columnKey] as Date);
          return value?.getTime() || (value as undefined | null);
        }))];
        return unique.map((x) => (x ? new Date(x) : x));
      }
      return [...new Set(this.#data.map((r) => (r[columnKey] as TData)))];
    }
  }

  #validateOptions(filterOptions: TFilterOptions): void {
    const invalidByTypes = [];
    const invalidByRules = [];

    filterOptions.forEach((option) => {
      // validate if selected filters don't filter an invalid column type
      if (!this.#hasValidColumnType(option.key)) {
        invalidByTypes.push(option.key);

      // validate if selected filters type isn't applied to invalid column type
      // like string can't be range filter type
      } else if (!this.#hasValidFilterAndColumnTypesRule(option.key, option.type)) {
        invalidByRules.push(option.key);
      }
    });

    if (invalidByTypes.length > 0) {
      throw new Error(`invalid column types for filter: ${invalidByTypes.join("; ")};`);
    } else if (invalidByRules.length > 0) {
      throw new Error(`invalid use of filter type for the columns: ${invalidByRules.join("; ")};`);
    }
  }

  #hasValidColumnType(columnKey: string): boolean {
    const validTypes = Object.values(EData);
    if (!validTypes.includes(this.#metadata[columnKey])) {
      return false;
    }
    return true;
  }

  #hasValidFilterAndColumnTypesRule(columnKey: string, filterType: EFilterType): boolean {
    const validMap = {
      // filterType: allowedDataTypes
      [EFilterType.value]: [EData.Date, EData.boolean, EData.number, EData.string],
      [EFilterType.range]: [EData.Date, EData.number],
      [EFilterType.regex]: [EData.string],
    };
    const columnType = this.#metadata[columnKey];
    if (!validMap[filterType].includes(columnType)) {
      return false;
    }
    return true;
  }
}
