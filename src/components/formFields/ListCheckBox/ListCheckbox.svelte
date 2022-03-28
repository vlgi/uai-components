<script lang="ts">
  import {
    onMount, getContext, hasContext, onDestroy,
} from "svelte";
  import Checkbox from "./Checkbox/Checkbox.svelte";
  import type { TFormContext } from "../../Form/types";

  type TCheckboxProps = {
    value: unknown;
    label?: string;
    checked?: boolean;
  };

  type TCheckboxStyleType = "filled" | "notFilled";

  export let name = "checkbox-list";
  /**
   * The listName property for this element
   * @type {string}
   */
  export let listName = "";
  /**
   * The checkboxStyleType property for this element
   * @type {string}
   */
  export let checkboxStyleType: TCheckboxStyleType = "notFilled";

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
  ) => undefined | string | boolean = () => true; //eslint-disable-line

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

  let invalid = forceInvalid;
  // const helper = false;
  let eMsg = "";
  let wrapperElement: HTMLElement;

  const isInsideContext = hasContext("FormContext");
  const { setFieldValue, addFieldToContext, removeFieldFromContext } = isInsideContext && getContext<TFormContext>("FormContext");

  function checkStatus(answer: undefined | string | boolean) {
    if (answer === true || answer === undefined) {
      isValid = true;
      invalid = !isValid;
    } else if (answer === false) {
      isValid = false;
      invalid = !isValid;
      eMsg = errorMsg;
    } else if (typeof answer === "string") {
      isValid = false;
      invalid = !isValid;
      eMsg = answer;
    }
  }

  function validation() {
    isValid = true;
    if (forceInvalid) {
      isValid = false;
    } else if (required) {
      isValid = Array.isArray(value) && value.length >= min;
    } else {
      checkStatus(validationFn(value));
    }
    invalid = !isValid;
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
    validation();
  }

  $: if (forceInvalid) validation();

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (inputElement && isInsideContext) {
    setFieldValue(name, value, isValid);
  }

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(
        name,
        value,
        isValid,
        required,
        wrapperElement,
        validation,
      );
    }
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });
</script>

<div class="list-checkbox-box">
  <span class="checkbox-title" class:invalid>{listName}</span>
  <ul class="list-checkbox" class:invalid>
    {#each checkboxItems as checkbox, i}
      <li>
        <Checkbox
          {name}
          {checkboxStyleType}
          id="{name}-{i}"
          bind:value={checkbox.value}
          label={checkbox.label}
          bind:checked={checkbox.checked}
          on:checkItem={setChecked}
          aria-required={required}
          {required}
        />
      </li>
    {/each}
    <p class="error" class:error-show={!isValid}>
      {#if required}
        É necessário selecionar {min} {min <= 1 ? "valor" : "valores"}.
      {:else}
        Valor inválido.
      {/if}
    </p>
  </ul>
</div>

<style lang="scss">
  @use "src/styles/mixins" as m;
  .list-checkbox-box {
    --checkbox-label-color: var(--szot-checkbox-label, var(--theme-primary-txt));
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
