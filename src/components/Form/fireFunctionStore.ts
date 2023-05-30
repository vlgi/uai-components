import { writable } from "svelte/store";
import type { TFireSubmit } from "./types";

// The key is the Form id
type TFireFunctionStore = {
  [key: string]: TFireSubmit
}

export default writable<TFireFunctionStore>({});
