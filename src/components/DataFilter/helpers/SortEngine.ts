import orderby from "lodash.orderby";
import {
  TRecordCollection, TCollectionMetadata, EData, getMetadata,
} from "./record-collection/record-collection";

export type TSortOption = {
  key: string,
  order: "asc" | "desc"
}
export type TSortOptions = TSortOption[]

export default class SortEngine {
  #metadata: TCollectionMetadata

  #data: TRecordCollection

  #sortOptions: TSortOptions

  constructor(data: TRecordCollection) {
    this.#data = data;
    this.#metadata = getMetadata(data);
  }

  set sortOptions(sortOptions: TSortOptions) {
    this.#validateOptions(sortOptions);
    this.#sortOptions = sortOptions;
  }

  get sortOptions(): TSortOptions {
    return this.#sortOptions;
  }

  /**
   * Sort the data based on the sortOptions attribute.
   * NOTE: this method return a new array, but not does a deep copy
   */
  getSorted(): TRecordCollection {
    const columns = this.#sortOptions.map((x) => x.key);
    const order = this.#sortOptions.map((x) => x.order);
    return orderby(this.#data, columns, order);
  }

  #validateOptions(sortOptions: TSortOptions): void {
    const invalid = [];
    const validTypes = Object.values(EData);

    sortOptions.forEach((option) => {
      if (!validTypes.includes(this.#metadata[option.key])) {
        invalid.push(option.key);
      }
    });

    if (invalid.length > 0) {
      throw new Error(`invalid column types for sort: ${invalid.join("; ")};`);
    }
  }
}
