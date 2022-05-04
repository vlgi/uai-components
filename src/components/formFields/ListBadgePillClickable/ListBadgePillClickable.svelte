<script lang="ts">
  import {
    getContext,
    hasContext,
    setContext,
    onMount,
    onDestroy,
  } from "svelte";
  import BadgePillClickable from "./BadgePillClickable/BadgePillClickable.svelte";
  import type { TFormContext } from "../../Form/types";

  type TBadgeProps = {
    value: string;
    label?: string;
  };

  type TIconPosition = "left" | "right" | "both" | "none";
  type TBadgeStyle = "light" | "dark";

  export let name;
  /**
   * The title property for this element
   * @type {string}
   */
  export let title = "";

  /**
   * All possible options that can be selected
   * @type {array}
   */
  export let checkboxItems: TBadgeProps[] = [];

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
   * The value for the badge element (readonly)
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
   * Set the position of the X icon in the styled badge
   */
  export let iconPosition: TIconPosition = "none";

  /**
   * Set the style of the label, border and icon in the badge
   */
  export let badgeStyle: TBadgeStyle = "dark";

  let eMsg = "";
  let wrapperElement: HTMLElement;

  const isInsideContext = hasContext("FormContext");
  let addedToContext = false;
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
      eMsg = errorMsg;
    } else if (required) {
      isValid = Array.isArray(values)
      && values.length >= min
      && (max !== null ? values.length <= max : true);
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
      addFieldToContext(
        name,
        values,
        isValid,
        required,
        wrapperElement,
        validation,
        forceValue,
      );
    }
  });

  onDestroy(() => {
    if (addedToContext) {
      removeFieldFromContext(name);
    }
  });

  function setChecked(ev: CustomEvent) {
    eMsg = "";
    const x = ev.detail as string;
    if (values.includes(x)) {
      values = values.filter((item) => item !== x);
    } else {
      values = values.concat(x);
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

<div class="list-badge-wrapper" bind:this={wrapperElement}>
  <span class="badge-title" class:invalid={!isValid}>{title}</span>
  <ul class="list-badge" class:invalid={!isValid}>
    {#each checkboxItems as checkbox, i}
      <li>
        <BadgePillClickable
          name="{name}-{i}"
          id="{name}-{i}"
          label={checkbox.label}
          value={checkbox.value}
          checked={values.includes(checkbox.value)}
          {iconPosition}
          {badgeStyle}
          on:checkItem={setChecked}
        />
      </li>
    {/each}
    <p class="error" class:error-show={!isValid}>
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
  </ul>
</div>

<style lang="scss">
  @use "src/styles/mixins" as m;
  @use "src/styles/variables" as v;
  .list-badge-wrapper {
    --badge-pill-label-color: var(
      --szot-badge-pill-label-color,
      var(--theme-dark-txt)
    );

    .invalid {
      --szot-badge-pill-color: var(--theme-error);
      --szot-badge-pill-label-color: var(--theme-error);

      &.badge-title {
        @include m.text-color(var(--theme-error));
      }
    }

    .badge-title {
      @include m.text-color(var(--badge-pill-label-color));
    }

    .list-badge {
      list-style: none;
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
