<script lang="ts">
  import { setContext, createEventDispatcher } from "svelte";
  import type {
    TAddFieldToContext,
    TSetFieldValue,
    TRemoveFieldFromContext,
    TFireSubmit,
  } from "./types";
  import { tick } from "$helpers/utils";
  import fireFunctionStore from "./fireFunctionStore";

  type TFieldData = {
    isValid: boolean;
    isRequired: boolean;
    htmlElement: HTMLElement;
    value?: unknown;
    forceValidation: ()=> void;
    setValue: (value: unknown)=> void;
  };

  // All fields values (readonly)
  export let values: Record<string, unknown> = {};

  // True if all fields are valid (readonly)
  export let isAllValid: boolean | null = null;

  /**
   * Enable form to be auto saved on local storage.
   * To reset the store call: `localStorage.removeItem("<your-storageKey>")`;
   */
  export let saveOnStorage = false;

  // key that storage will have. Required if saveOnStorage is enabled
  export let storageKey = "";

  /**
   * Set an unique id to be able to trigger the form submission flow
   * using the Button component outside the Form context.
   * See the Form docs for more.
   */
  export let id = "";

  let fieldsData: Record<string, TFieldData> = {};
  const dispatcher = createEventDispatcher();

  const savedValues = JSON.parse(localStorage.getItem(storageKey) || "{}") as Record<string, unknown>;

  /**
   * Context functions
   */
  export const fireSubmit: TFireSubmit = async () => {
    // force all fields validate
    Object.values(fieldsData).forEach((fData) => fData.forceValidation());

    await tick();

    // if some is invalid don't dispatch the event, and scroll to first invalid field
    if (!Object.values(fieldsData).every((fData) => fData.isValid)) {
      const firstInvalidEl = Object.values(fieldsData).find(
        (fData) => !fData.isValid,
      ).htmlElement;
      firstInvalidEl.scrollIntoView();
      return;
    }

    /**
     * fired when submit button is clicked and all fields is valid.
     * At detail we pass the variable "values".
     */
    dispatcher("submit", values);
  };

  const setFieldValue: TSetFieldValue = (fieldName, value, isvalid) => {
    if (fieldsData[fieldName] === undefined) {
      throw new Error("This field was not added to the context yet.");
    }

    fieldsData[fieldName].value = value;
    fieldsData[fieldName].isValid = isvalid;
  };

  const addFieldToContext: TAddFieldToContext = (
    fieldName,
    value,
    isValid,
    isRequired,
    htmlElement,
    forceValidation,
    setValue,
  ) => {
    let fieldValue = value;

    if (Object.keys(savedValues).includes(fieldName)) {
      const oldValue = savedValues[fieldName];
      fieldValue = oldValue;
      if (setValue) setValue(oldValue);
    }

    fieldsData[fieldName] = {
      isValid,
      isRequired,
      htmlElement,
      value: fieldValue,
      forceValidation,
      setValue,
    };
  };

  const removeFieldFromContext: TRemoveFieldFromContext = (
    fieldName: string,
  ) => {
    delete fieldsData[fieldName];
    // force update
    fieldsData = fieldsData;
  };

  $: values = Object.fromEntries(
    Object.entries(fieldsData).map(([k, v]) => [k, v.value]),
  );

  $: if (saveOnStorage) {
    localStorage.setItem(storageKey, JSON.stringify(values));
  }

  $: isAllValid = Object.values(fieldsData).every((v: TFieldData) => v.isValid);

  setContext("FormContext", {
    setFieldValue,
    addFieldToContext,
    removeFieldFromContext,
    fireSubmit,
  });

  if (id !== "") {
    // disable lint because they doesn't work with store accessed with $
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    $fireFunctionStore[id] = fireSubmit;
  }
</script>

<div role="form">
  <!-- Enter as many form fields as you want. But remember they must be our custom form fields.  -->
  <slot />
</div>

<style>
  div {
    display: contents;
  }
</style>
