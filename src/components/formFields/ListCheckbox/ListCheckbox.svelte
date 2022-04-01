<script lang="ts">
  import { getContext, hasContext, setContext } from "svelte";
  import Checkbox from "./Checkbox/Checkbox.svelte";
  import type { TFormContext, TAddFieldToContext } from "../../Form/types";

  type TCheckboxProps = {
    value: string;
    label?: string;
    checked?: boolean;
  };

  export let name = "checkbox-list";
  /**
   * The listName property for this element
   * @type {string}
   */
  export let listName = "";

  /**
   * All possible options that can be selected
   * @type {array}
   */
  export let checkboxItems: TCheckboxProps[] = [];

  /** Enter a message in case it is invalid */
  export let errorMsg = "";

  /**
   * Pass the function to validation.
   * Return true/undefined if valid,
   * or a string to show the error, or false to show the "errorMsg" props.
   */
  export let validationFn: (
    value: Array<string>
  )=> undefined | string | boolean = () => true;

  /** if you want to force invalid, change it to true */
  export let forceInvalid = false;

  /** shows if the component is valid (readonly) */
  export let isValid = true;

  /**
   * The input element (readonly)
   * @type {HTMLInputElement}
   * */
  export let inputElement: HTMLInputElement | null = null;

  export let value = [];
  export let required = false;
  export let min = 1;
  export let max = 10;

  let eMsg = "";
  let addedToContext = false;

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue,
    addFieldToContext,
    removeFieldFromContext,
    fireSubmit,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  function checkStatus(answer: undefined | string | boolean) {
    if (answer === true || answer === undefined) {
      isValid = true;
    } else if (answer === false) {
      isValid = false;
      eMsg = errorMsg;
    } else if (typeof answer === "string") {
      isValid = false;
      eMsg = answer;
    }
  }

  function validation() {
    isValid = true;
    if (forceInvalid) {
      isValid = false;
      eMsg = "Há um erro nos campos selecionados.";
    } else if (required) {
      isValid = Array.isArray(value) && value.length >= min;
    } else {
      checkStatus(validationFn(value));
    }
  }

  // Create an overriding add context function
  const addFieldToContextOverride: TAddFieldToContext = (
    _fieldName: string,
    _value: unknown,
    _isValid: boolean,
    _isRequired: boolean,
    _htmlElement: HTMLElement,
  ) => {
    addFieldToContext(
      _fieldName,
      _value,
      isValid,
      required,
      _htmlElement,
      validation,
    );
    addedToContext = true;
  };

  // Override the context with our proxy
  if (isInsideContext) {
    setContext<TFormContext>("FormContext", {
      setFieldValue: () => undefined,
      addFieldToContext: addFieldToContextOverride,
      removeFieldFromContext,
      fireSubmit,
    });
  }

  function setChecked(ev: CustomEvent) {
    eMsg = "";
    inputElement = ev.detail as HTMLInputElement;
    const x = (ev.detail as HTMLInputElement).value;
    if (value.includes(x)) {
      value = value.filter((item) => item !== x);
    } else {
      value = value.concat(x);
    }
    value = value.sort();
  }

  $: if (value.length >= 1) validation();

  $: if (forceInvalid) validation();

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (inputElement && isInsideContext) {
    setFieldValue(name, value, isValid);
  }

  // Update form state correctly
  $: if (addedToContext) setFieldValue(name, value, isValid);
</script>

<div class="list-checkbox-box">
  <span class="checkbox-title" class:invalid={!isValid}>{listName}</span>
  <ul class="list-checkbox" class:invalid={!isValid}>
    {#each checkboxItems as checkbox, i}
      <li>
        <Checkbox
          {name}
          id="{name}-{i}"
          label={checkbox.label}
          bind:value={checkbox.value}
          bind:checked={checkbox.checked}
          on:checkItem={setChecked}
          required={false}
        />
      </li>
    {/each}
    <p class="error" class:error-show={!isValid}>
      {#if required}
        {#if value.length > max}
          Você deve selecionar no máximo {max} {max <= 1 ? "opção" : "opções"}.
        {:else}
          É necessário selecionar {min} {min <= 1 ? "opção" : "opções"}.
        {/if}
      {:else}
        {eMsg}
      {/if}
    </p>
  </ul>
</div>

<style lang="scss">
  @use "src/styles/mixins" as m;
  .list-checkbox-box {
    --checkbox-label-color: var(
      --szot-checkbox-label,
      var(--theme-primary-txt)
    );
    box-sizing: border-box;

    .checkbox-title {
      color: var(--checkbox-label-color);
    }
    .list-checkbox {
      list-style: none;
    }
    .invalid {
      --szot-checkbox-color: var(--theme-error);
      --szot-checkbox-label: var(--theme-error);
      color: var(--theme-error);
    }

    .error {
      @include m.form-field-error-text();
      display: none;
      opacity: 0;
      transition: opacity 0.2s linear, bottom 0.2s;
    }
    .error-show {
      display: inherit;
      @include m.form-field-error-text();
    }
  }
</style>
