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

  type TMapValueCheck = {
    value: string;
    checked: boolean;
  };

  type TIconPosition = "left" | "right" | "both" | "none";
  type TBadgeStyle = "light" | "dark" | "primary" | "secondary";
  type TDirection = "column" | "row";

  export let name;

  /**
   * All possible options that can be selected
   * @type {array}
   */
  export let badgeItems: TBadgeProps[] = [];

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

  /**
   * Set if the badges will be displayed in a row or a column
   */
  export let direction: TDirection = "row";

  let eMsg = "";
  let wrapperElement: HTMLElement;

  let checkedList: TMapValueCheck[] = badgeItems.map((e) => ({
    value: e.value,
    checked: false,
  }));

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

  $: checkedList = checkedList.map((c) => ({
    value: c.value,
    checked: values.includes(c.value),
  }));
</script>

<div class="list-badge-wrapper display-badges-{direction}" bind:this={wrapperElement}>
  {#each badgeItems as badge, i}
    <div class="badge-container" class:invalid={!isValid}>
      <BadgePillClickable
        name="{name}-{i}"
        id="{name}-{i}"
        label={badge.label}
        value={badge.value}
        bind:checked={checkedList[i].checked}
        {iconPosition}
        {badgeStyle}
        on:checkItem={setChecked}
      />
    </div>
  {/each}
</div>

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

<style lang="scss">
  @use "src/styles/mixins" as m;
  @use "src/styles/variables" as v;
  .list-badge-wrapper {
    display: flex;
    flex-wrap: wrap;

    &.display-badges-row {
      flex-direction: row;
    }

    &.display-badges-column {
      flex-direction: column;
    }

    .invalid {
      --szot-badge-pill-border-color: var(--theme-error);
      --szot-badge-pill-label-color: var(--theme-error);
      --szot-badge-pill-icon-color: var(--theme-error);
    }

    .badge-container {
      width: fit-content;
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
  }
</style>
