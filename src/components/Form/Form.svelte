<script lang="ts">
  import { setContext, createEventDispatcher } from "svelte";
  import type {
    TAddFieldToContext, TSetFieldValue, TRemoveFieldFromContext, TFireSubmit, TFormContext,
  } from "./types";

  type TFieldData = {
    isValid: boolean,
    isRequired: boolean,
    htmlElement: HTMLElement,
    value?: unknown,
  }

  // All fields values (readonly)
  export let values: Record<string, unknown> = {};

  // True if all fields are valid (readonly)
  export let isAllValid: boolean|null = null;

  const fieldsData: Record<string, TFieldData> = {};
  const dispatcher = createEventDispatcher();

  /**
   * Context functions
  */

  const setFieldValue: TSetFieldValue = (fieldName, value, isvalid) => {
    if (fieldsData[fieldName] === undefined) {
      throw new Error("This field was not added to the context yet.");
    }

    fieldsData[fieldName].value = value;
    fieldsData[fieldName].isValid = isvalid;
  };

  const addFieldToContext: TAddFieldToContext = (
    fieldName, value, isValid, isRequired, htmlElement,
  ) => {
    fieldsData[fieldName] = {
      isValid,
      isRequired,
      htmlElement,
      value,
    };
  };

  const removeFieldFromContext: TRemoveFieldFromContext = (fieldName: string) => {
    delete fieldsData[fieldName];
  };

  const fireSubmit: TFireSubmit = () => {
    // fired when submit button is clicked. At detail we pass the variables: values and isAllValid
    dispatcher("submit", {
      values,
      isAllValid,
    });
  };

  $: values = Object.fromEntries(
    Object.entries(fieldsData)
      .map(([k, v]) => [k, v.value]),
  );

  $: isAllValid = Object.values(fieldsData).every((v: TFieldData) => v.isValid);

  const formContextObj: TFormContext = {
    setFieldValue,
    addFieldToContext,
    removeFieldFromContext,
    fireSubmit,
  };
  setContext("FormContext", formContextObj);
</script>

<form on:submit|preventDefault>
  <!-- Enter as many form fields as you want. But remember they must be our custom form fields.  -->
  <slot></slot>
</form>

<style lang="scss">
</style>
