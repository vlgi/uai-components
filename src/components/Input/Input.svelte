<script lang="ts">
  import Icon from "../Icon/Icon.svelte";

  export let border = "true";
  export let iconName = "none";
  export let iconPosition = "right";
  export let type = "text";
  export let value = "";
  export let pattern = "";
  export let disabled = false;
  export let readonly = false;
  export let autocomplete = "off";
  export let autofocus = "";
  export let max = "";
  export let min = "";
  export let required = "";
  export let step = "";
  export let color = "Primary";
  export let helperText = "";
</script>

<link
  href="https://fonts.googleapis.com/css?family=Open Sans"
  rel="stylesheet"
/>

{#if iconName !== "none"}
  <div id="color-{color}">
    <div class="form-div border-{border}" id={iconPosition}>
      <input
        {type}
        class="form-input"
        placeholder=" "
        {value}
        {pattern}
        {disabled}
        {readonly}
        {autocomplete}
        {autofocus}
        {max}
        {min}
        {required}
        {step}
      />
      <label for="" class="form-label"><slot /></label>
      <div class="icon"><Icon {iconName} /></div>
      <p id="helper">{helperText}</p>
    </div>
  </div>
{:else}
  <div id="color-{color}">
    <div class="form-div border-{border}">
      <input
        {type}
        class="form-input"
        placeholder=" "
        {value}
        {pattern}
        {disabled}
        {readonly}
        {autocomplete}
        {autofocus}
        {max}
        {min}
        {required}
        {step}
      />
      <label for="" class="form-label"><slot /></label>
      <p id="helper">{helperText}</p>
    </div>
  </div>
{/if}

<style lang="scss">
  * {
    box-sizing: border-box;
    font-family: var(--font-family, Open Sans);

    --max-width: var(--szot-fields-max-width, 7.5rem);
    --height: var(--szot-fields-height, 2.2rem);
    --font-family: var(--szot-font-family, Open Sans);
    --border-radius: var(--szot-large-shape, 1.5rem);
    --border: var(--szot-small-border, 1px solid #575555);
    --border-bottom-focus: var(--szot-medium-border, 1.5px solid #575555);
  }

  .form-div {
    position: relative;
    height: var(--height, 2.2rem);
    margin-bottom: var(--margin-bottom, 1.5rem);
    width: var(--width, 16rem);
    max-width: var(--max-width, 7.5rem);
  }

  .form-input {
    position: absolute;
    top: var(--input-top, 0);
    left: var(--input-left, 0);
    width: var(--input-width, 100%);
    height: var(--input-height, 100%);
    font-size: var(--input-font-size, 0.625rem);
    outline: none;
    padding: var(--input-padding, 0rem 1rem);
    background: none;
    z-index: 1;
    color: var(--input-color, #b1b1b1);
  }

  .form-label {
    position: relative;
    left: var(--label-left, 1rem);
    top: var(--label-top, 0.3rem);
    padding: var(--label-padding, 0rem);
    margin-left: var(--label-margin-left, 0.2rem);
    color: var(--label-color, #5f5f5f);
    font-size: var(--label-font-size, 0.8125rem);
    background-color: var(--background-color, #ffff);
    transition: 0.2s;
  }

  .form-input:focus + .form-label {
    top: var(--input-focus-top, -0.8rem);
    left: var(--input-focus-left, 0.8rem);
    z-index: 10;
    font-weight: var(--input-focus-weigth, 400);
    color: var(--input-focus-color, #0c8aff);
    font-size: var(--input-focus-font-size, 0.6875rem);
  }

  .form-input:not(:placeholder-shown).form-input:not(:focus) + .form-label {
    top: var(--label-not-focus-top, -0.8rem);
    left: var(--label-not-focus-left, 0.8rem);
    z-index: 10;
    font-weight: var(--label-not-focus-font-weight, 500);
    font-size: var(--label-not-focus-font-size, 11px);
  }

  .border-none {
    .form-input {
      border: 0;
      border-bottom: var(--border, 1px solid #575555);
      border-color: var(--border-bottom-color);
      padding: var(--border-none-padding, 0.5rem 0.5rem);
    }
    .form-input:focus {
      border-bottom: var(--border-bottom-focus, 1.5px solid #575555);
      border-color: var(--border-bottom-focus-color);
    }

    .form-label {
      margin-left: var(--border-none-margin-left, -0.5rem);
    }
  }

  .border-true {
    .form-input {
      border: var(--border, 1px solid #575555);
      border-color: var(--border-color);
      border-radius: 24px;
    }
    .form-input:focus {
      border: var(--border-focus, 1.5px solid #0c8aff);
      border-color: var(--border-color-focus);
    }
  }

  #left {
    .form-input {
      padding: 1rem 1rem 1rem 2rem;
    }

    .form-label {
      margin-left: 1rem;
    }

    .icon {
      position: absolute;
      left: 0;
      margin: var(--icon-margin, -0.85rem 0.5rem);
      color: var(--icon-color, #5f5f5f);
    }
  }

  #right {
    .form-input {
      padding: 1rem 1.7rem 1rem 0.5rem;
    }

    .icon {
      position: absolute;
      right: 0;
      margin: var(--icon-margin, -0.85rem 0.5rem);
      color: var(--icon-color, #5f5f5f);
    }
  }
  #color-Primary {
    --background-color: var(--szot-primary);
    --label-color: var(--szot-primary-txt);
    --input-color: var(--szot-primary-txt);
    --input-focus-color: var(--szot-primary-txt);
    --border-color-focus: var(--szot-primary-txt);
    --border-bottom-focus-color: var(--szot-primary-txt);
    --border-color: var(--szot-primary-txt);
    --border-bottom-color: var(--szot-primary-txt);
  }

  #color-Secondary {
    --background-color: var(--szot-secondary);
    --label-color: var(--szot-secondary-txt);
    --input-color: var(--szot-secondary-txt);
    --input-focus-color: var(--szot-secondary-txt);
    --border-color-focus: var(--szot-secondary-txt);
    --border-bottom-focus-color: var(--szot-secondary-txt);
    --border-color: var(--szot-secondary-txt);
    --border-bottom-color: var(--szot-secondary-txt);
  }

  #color-Dark {
    --background-color: var(--szot-dark);
    --label-color: var(--szot-dark-txt);
    --input-color: var(--szot-dark-txt);
    --input-focus-color: var(--szot-dark-txt);
    --border-color-focus: var(--szot-dark-txt);
    --border-bottom-focus-color: var(--szot-dark-txt);
    --border-color: var(--szot-dark-txt);
    --border-bottom-color: var(--szot-dark-txt);
  }
  #color-Light {
    --background-color: var(--szot-light);
    --label-color: var(--szot-light-txt);
    --input-color: var(--szot-light-txt);
    --input-focus-color: var(--szot-light-txt);
    --border-color-focus: var(--szot-light-txt);
    --border-bottom-focus-color: var(--szot-light-txt);
    --border-color: var(--szot-ligth-txt);
    --border-bottom-color: var(--szot-ligth-txt);
  }
  #helper {
    position: absolute;
    z-index: 1;
    bottom: var(--helper-bottom, -0.65rem);
    left: var(--helper-left, 1rem);
    font-size: var(--helper-font-size, 0.25em);
    color: var(--helper-color, rgb(202, 8, 8));
    opacity: var(--helper-opacity, 0.75);
  }
</style>
