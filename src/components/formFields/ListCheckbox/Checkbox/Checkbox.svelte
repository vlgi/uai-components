<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import type { TFormContext } from "../../../Form/types";

  type TCheckboxStyleType = "checkbox-input" | "switch" | "text-switch";

  const dispatch = createEventDispatcher();

  /**
   * The label text for this element
   * @type {string}
   */
  export let label = "";

  /**
   * The name for the checkbox element
   * @type {string}
   */
  export let name: string;

  /**
   * The id for the checkbox element. Default = name
   * @type {string}
   */
  export let id = name;

  /**
   * If received on props, defines if the checkbox is default checked.
   * @type {boolean}
   */
  export let checked = false;

  /**
   * Value returned to the form (if inside a form) on checked=true
   */
  export let value: string | boolean = true;

  /** shows if the component is valid (readonly) */
  export let isValid = true;

  /**
   * The input element (readonly)
   * @type {HTMLInputElement}
   * */
  export let inputElement: HTMLInputElement | null = null;

  /**
   * The styletype text for this element
   * @type {string}
   */
  export let styleType: TCheckboxStyleType = "checkbox-input";

  export let required = false;

  export let checkedText = "";

  export let uncheckedText = "";

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue, addFieldToContext, removeFieldFromContext,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  function validation() {
    isValid = true;
    if (required) {
      isValid = checked;
    }
  }

  function dispatchValue() {
    dispatch("checkItem", value);
  }

  // function to form context force input value
  function forceValue(_value: unknown) {
    checked = (_value as string | boolean) === value;
  }

  $: if (checked) validation();

  // run only after mounted, because setFieldValue, must become after addFieldToContext
  $: if (inputElement && isInsideContext) {
    setFieldValue(name, checked === true ? value : false, true);
  }

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(
        name,
        checked === true ? value : false,
        isValid,
        required,
        inputElement,
        validation,
        forceValue,
      );
    }
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });
</script>

<div class="checkbox style-type-{styleType}" class:invalid={!isValid}>
  <div class="border-{styleType}" class:text-switch={styleType === "text-switch"}>
    <input
      type="checkbox"
      {name}
      {id}
      class={styleType}
      bind:checked
      bind:this={inputElement}
      on:click={() => {
        dispatchValue();
      }}
    />
    {#if styleType === "switch"}
      <span
        class="slider"
        class:checked
        on:click={() => {
          checked = !checked;
          dispatchValue();
        }}
      >
        <span class="slider-checked" />
      </span>
    {/if}
    <label for={id} >
      <div
        class="text-switch__button"
        data-checked={checkedText}
        data-unchecked={uncheckedText}
        class:checked
      />
    </label>
  </div>
  {#if label !== undefined && label !== "" && label !== null}
    <label for={id} class="checkbox-label">
      {label}
    </label>
  {/if}
</div>
<p class="error" class:error-show={!isValid}>
  {#if required}
    Este campo é obrigatório
  {/if}
</p>

<style lang="scss">
  @use "src/styles/mixins" as m;

  .checkbox {
    &.style-type {
      $styles: ("checkbox-input" , "switch" , "text-switch");

      @each $style in $styles {
        &-#{$style} {
          --checkbox-margin: var(--szot-checkbox-margin, 0.3125rem);
          --chackbox-padding: var(--szot-checkbox-padding, 0 0.375em);
          --checkbox-size: var(--szot-checkbox-size, 0.7rem);
          --border-size: var(--szot-checkbox-border-size, 0.15rem);
          --border-radius: var(--szot-checkbox-border-radius, var(--border-size));
          --checkbox-color: var(--szot-checkbox-color, var(--theme-dark-txt));
          --checkbox-label-color: var(
            --szot-checkbox-label-color,
            var(--theme-dark-txt)
          );
        }
      }

      &-switch {
        --switch-background: var(--szot-checkbox-switch-background, #cecece);
        --switch-color: var(--szot-checkbox-switch-color, var(--theme-dark-txt));
        --switch-checked-color: var(
          --szot-checkbox-switch-checked-color,
          var(--switch-color)
        );
        --switch-width: var(--szot-checkbox-switch-width, 3.25rem);
        --switch-height: var(--szot-checkbox-switch-height, 1.5rem);
        --border-radius: 2.125rem;
      }

      &-text-switch {
        --text-switch-background: var(--szot-checkbox-switch-background, #8b8b8b);
        --text-switch-color: var(--szot-checkbox-switch-color, var(--theme-dark-txt));
        --text-switch-checked-color: var(
          --szot-checkbox-switch-checked-color,
          var(--text-switch-color)
        );
        --text-switch-text-color: var(--szot-checkbox-switch-text-color, #FFFFFF);
        --text-switch-width: var(--szot-checkbox-switch-width, 4.275rem);
        --text-switch-height: var(--szot-checkbox-switch-height, 2.25rem);
        --text-switch-border-radius: var(--szot-checkbox-border-radius, 6.25rem);
        --text-switch-gap: var(--szot-checkbox-text-switch-gap, 0rem);
        --text-switch-switch-font-size: var(--szot-checkbox-text-switch-font-size, 0.8rem);
      }
    }

    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    position: relative;
    padding: var(--checkbox-padding);
    margin: var(--checkbox-margin);

    .border-checkbox-input {
      box-sizing: content-box;
      @include m.border(var(--border-size), var(--checkbox-color));
      border-radius: var(--border-radius);
    }

    .checkbox-input {
      /* Remove most all native input styles */
      appearance: none;
      min-width: var(--checkbox-size);
      height: var(--checkbox-size);
      transform: translateY(-0.025em);
      display: grid;
      place-content: center;
    }

    .checkbox-input::before {
      content: "";
      width: calc(var(--checkbox-size) - 0.125em);
      height: calc(var(--checkbox-size) - 0.125em);
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      transform: scale(0);
      transform-origin: bottom left;
      transition: 120ms transform ease-in-out;
      background: var(--checkbox-color);
    }

    .checkbox-input:checked::before {
      transform: scale(1);
    }

    .checkbox-label {
      margin-left: 20px;
      @include m.text-color(var(--checkbox-label-color));
      font-weight: normal;
    }

    .border-switch {
      position: relative;
      display: inline-block;
      width: var(--switch-width);
      height: var(--switch-height);

      input {
        opacity: 0;
        width: 0;
        height: 0;
      }
    }

    .slider {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      transition: 0.4s;

      cursor: pointer;
      background: var(--switch-background);
      border-radius: var(--border-radius);
    }

    .slider:before {
      position: absolute;
      content: "";
      height: calc(1.1 * var(--switch-height));
      width: calc(1.1 * var(--switch-height));
      left: 0;
      bottom: calc(var(--switch-height) * -1 * 0.05);

      background: var(--switch-color);

      transition: 0.4s;
      border-radius: 50%;
    }

    .slider.checked:before {
      transform: translateX(
        calc(var(--switch-width) - 1.1 * var(--switch-height))
      );
    }

    .slider .slider-checked:before {
      position: absolute;
      content: "";
      height: calc(1.1 * var(--switch-height));
      width: calc(1.1 * var(--switch-height));
      bottom: calc(var(--switch-height) * -1 * 0.05);

      transition: 0.4s;
      border-radius: 50%;
      opacity: 0;
    }

    .slider.checked .slider-checked:before {
      background: var(--switch-checked-color);
      opacity: 1;

      transform: translateX(
        calc(var(--switch-width) - 1.1 * var(--switch-height))
      );
    }
    .text-switch {
      position: relative;
      *, *:before, *:after {
        box-sizing: border-box;
      }
      //overflow: hidden;

      input[type="checkbox"] {
        display: none;

        &:checked {
          ~ label {
            .text-switch__button {
              &:before {
                content: attr(data-unchecked);
                left: 0;
              }

              &:after {
                content: attr(data-checked);
                transform: translate3d(
                  calc((var(--text-switch-width) * 2)
                    - (var(--text-switch-width)
                    + var(--text-switch-gap))
                  ),
                  0,
                  0
                );
              }
            }
          }
        }
      }

      label {
        user-select: none;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;

        .text-switch__label-text {
          flex: 1;
        }

        .text-switch__button {
          position: relative;
          transition: background-color 0.4s cubic-bezier(0,1,0.5,1);
          background: var(--text-switch-background);
          height: var(--text-switch-height);
          flex: 0 0 calc(var(--text-switch-width) * 2);
          border-radius: var(--text-switch-border-radius);

          &:before {
            content: attr(data-checked);
            position: absolute;
            top: 0;
            left: var(--text-switch-width);
            text-transform: uppercase;
            text-align: center;
            color: var(--text-switch-text-color);
            font-size: var(--text-switch-switch-font-size);
            line-height: var(--text-switch-height);
            width: var(--text-switch-width);
            padding: 0 0.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          &:after {
            content: attr(data-unchecked);
            position: absolute;
            z-index: 5;
            top: var(--text-switch-gap);
            left: var(--text-switch-gap);
            border-radius: var(--text-switch-border-radius);
            width: calc(var(--text-switch-width) - var(--text-switch-gap));
            line-height: calc(var(--text-switch-height) - (var(--text-switch-gap) * 2));
            font-size: var(--text-switch-switch-font-size);
            text-transform: uppercase;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            background: var(--text-switch-color);
            color: var(--text-switch-text-color);
            -webkit-transition: -webkit-transform 0.4s cubic-bezier(0,1,0.5,1);
            transition: transform 0.4s cubic-bezier(0,1,0.5,1);
            transform: translate3d(0,0,0);
          }
          &.checked:after {
            background: var(--text-switch-checked-color);
          }
        }
      }
    }
  }

  .invalid {
    --szot-checkbox-color: var(--theme-error);
    --szot-checkbox-label-color: var(--theme-error);
    --szot-checkbox-switch-color: var(--theme-error);
    @include m.text-color(var(--theme-error));
  }

  .error {
    @include m.form-field-error-text();
    display: none;
    opacity: 0;
    transition: opacity 0.2s linear, bottom 0.2s;
  }
  .error-show {
    display: unset;
    @include m.form-field-error-text();
    @include m.text-color(var(--theme-error));
  }


</style>
