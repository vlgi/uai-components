<script lang="ts">
  import { setContext, createEventDispatcher } from "svelte";
  import type {
    TAddFieldToContext, TSetFieldValue, TRemoveFieldFromContext, TFireSubmit, TFormContext,
  } from "./types";
  import { tick } from "../../helpers/utils";

  type TFieldData = {
    isValid: boolean,
    isRequired: boolean,
    htmlElement: HTMLElement,
    value?: unknown,
    forceValidation: ()=> void,
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
    fieldName, value, isValid, isRequired, htmlElement, forceValidation,
  ) => {
    fieldsData[fieldName] = {
      isValid,
      isRequired,
      htmlElement,
      value,
      forceValidation,
    };
  };

  const removeFieldFromContext: TRemoveFieldFromContext = (fieldName: string) => {
    delete fieldsData[fieldName];
  };

  const fireSubmit: TFireSubmit = async () => {
    // force all fields validate
    Object.values(fieldsData).forEach((fData) => fData.forceValidation());

    await tick();

    // if some is invalid don't dispatch the event
    if (!Object.values(fieldsData).every((fData) => fData.isValid)) return;

    /**
     * fired when submit button is clicked and all fields is valid.
     * At detail we pass the variable "values".
    */
    dispatcher("submit", values);
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

<form on:submit|preventDefault={ () => true }>
  <!-- Enter as many form fields as you want. But remember they must be our custom form fields.  -->
  <slot></slot>
</form>

<style>
  form {
    display: contents;
  }
</style>
