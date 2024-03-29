<script lang="ts">
  import { getContext, hasContext, setContext, onMount, onDestroy } from "svelte";
  import Checkbox from "./Checkbox/Checkbox.svelte";
  import type { TFormContext } from "../../Form/types";

  type TCheckboxProps = {
    value: string;
    label?: string;
  };
  type TCheckboxStyleType = "checkbox-input" | "switch" | "badge-pill";
  type TIconPosition = "left" | "right" | "both" | "none";
  type TBadgeStyle = "light" | "dark" | "primary" | "secondary";
  type TDirection = "column" | "row";

  export let name: string;
  /**
   * The title property for this element
   */
  export let title = "";

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
  export let validationFn: (value: Array<string>) => undefined | string | boolean = () => true;

  /** if you want to force invalid, change it to true */
  export let forceInvalid = false;

  /** shows if the component is valid (readonly) */
  export let isValid = true;

  /**
   * The values of checked items. Defines which checkboxes starts checked
   * by receiving a list of item names
   * @type {Array<string>}
   */
  export let values: Array<string> = [];
  /**
   * If true, user should mark at least 1 item, defined by "min" property.
   */
  export let required = false;
  /**
   * Min checked items, must be used with "required"
   */
  export let min = 1;
  /**
   * Max checked items, must be used with "required"
   * @type {number}
   */
  export let max: number = null;

  /**
   * Set the position of the X icon in the styled badge pill
   */
  export let iconPosition: TIconPosition = "none";

  /**
   * Set the style of the label, border and icon in the badge pill
   */
  export let badgeStyle: TBadgeStyle = "dark";

  /**
   * The styletype text for this element
   * @type {string}
   */
  export let styleType: TCheckboxStyleType = "checkbox-input";

  /**
   * Set if the badges will be displayed in a row or a column
   */
  export let direction: TDirection = "column";

  let eMsg = "";
  let wrapperElement: HTMLElement;

  const isInsideContext = hasContext("FormContext");
  let addedToContext = false;
  const { setFieldValue, addFieldToContext, removeFieldFromContext, fireSubmit } =
    isInsideContext && getContext<TFormContext>("FormContext");

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
      eMsg = errorMsg;
    } else if (required) {
      isValid =
        Array.isArray(values) &&
        values.length >= min &&
        (max !== null ? values.length <= max : true);
    } else {
      checkStatus(validationFn(values));
    }
  }

  // function to form context force input value
  function forceValue(_value: unknown) {
    values = _value as Array<string>;
  }

  // Override the context with our proxy
  if (isInsideContext) {
    setContext<TFormContext>("FormContext", {
      setFieldValue: () => undefined,
      addFieldToContext: () => undefined,
      removeFieldFromContext: () => undefined,
      fireSubmit,
    });
    addedToContext = hasContext("FormContext");
  }

  onMount(() => {
    if (addedToContext) {
      addFieldToContext(name, values, isValid, required, wrapperElement, validation, forceValue);
    }
  });

  onDestroy(() => {
    if (addedToContext) {
      removeFieldFromContext(name);
    }
  });

  function setChecked(ev: CustomEvent<{ value: string | boolean; checked: boolean }>) {
    eMsg = ""; // reset the error message

    const { checked, value } = ev.detail;
    if (checked) {
      values = values.concat(String(value));
    } else {
      values = values.filter((item) => item !== value);
    }
    values = values.sort();
  }

  $: if (values.length >= 1) validation();

  $: if (forceInvalid) validation();

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (wrapperElement && addedToContext) {
    setFieldValue(name, values, isValid);
  }
</script>

<div
  class="list-checkbox-wrapper"
  bind:this={wrapperElement}
>
  <span
    class="checkbox-title"
    class:invalid={!isValid}>{title}</span
  >
  <ul
    class="list-checkbox {direction}"
    class:invalid={!isValid}
  >
    {#each checkboxItems as checkbox, i}
      <li>
        <Checkbox
          name="{name}-{i}"
          id="{name}-{i}"
          label={checkbox.label}
          value={checkbox.value}
          checked={values.includes(checkbox.value)}
          {iconPosition}
          {badgeStyle}
          {styleType}
          on:checkItem={setChecked}
          on:checkItem
        />
      </li>
    {/each}
  </ul>
  <p
    class="error"
    class:error-show={!isValid}
  >
    {#if required}
      {#if max !== null && values.length >= max}
        Você deve selecionar no máximo {max} {max <= 1 ? "opção" : "opções"}.
      {:else}
        É necessário selecionar {min} {min <= 1 ? "opção" : "opções"}.
      {/if}
    {:else}
      {eMsg}
    {/if}
  </p>
</div>

<style lang="scss">
  @use "$styles/mixins" as m;
  @use "$styles/variables" as v;
  .list-checkbox-wrapper {
    --checkbox-label-color: var(--uai-checkbox-label-color, var(--theme-dark-txt));

    .invalid {
      --uai-checkbox-color: var(--theme-error);
      --uai-checkbox-label-color: var(--theme-error);
      --uai-checkbox-badge-pill-icon-color: var(--theme-error);
      --uai-checkbox-badge-pill-label-color: var(--theme-error);
      --uai-checkbox-badge-pill-border-color: var(--theme-error);
      --uai-checkbox-badge-pill-selected-icon-color: var(--theme-error);
      --uai-checkbox-badge-pill-selected-label-color: var(--theme-error);
      --uai-checkbox-badge-pill-selected-border-color: var(--theme-error);

      &.checkbox-title {
        @include m.text-color(var(--theme-error));
      }
    }

    .checkbox-title {
      @include m.text-color(var(--checkbox-label-color));
    }

    .list-checkbox {
      display: flex;
      justify-content: var(--uai-list-checkbox-justify-content);
      align-items: var(--uai-list-checkbox-align-items);
      flex-wrap: wrap;
      list-style: none;

      &.row {
        flex-direction: row;
      }

      &.column {
        flex-direction: column;
      }
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
      @include m.text-color(var(--theme-error));
    }
  }
</style>
