<script lang="ts">
  import {
    onMount, getContext, hasContext, onDestroy,
  } from "svelte";
  import type { TFormContext } from "./types";

  export let name: string;
  export let value = "";
  export let required = false;

  let inputEl: HTMLInputElement;
  let isValid: boolean;

  const isInsideContext = hasContext("FormContext");
  const {
    setFieldValue,
    addFieldToContext,
    removeFieldFromContext,
  } = isInsideContext && getContext<TFormContext>("FormContext");

  function validateInput(_value) {
    if (_value === "my-input") return true;
    return false;
  }

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(name, value, isValid, required, inputEl);
    }
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });

  // check inputEl to run only after mounted
  $: if (inputEl) {
    isValid = validateInput(value);
    if (isInsideContext) {
      setFieldValue(name, value, isValid);
    }
  }
</script>

<input
  type="text"
  { name }
  { required }
  bind:this={ inputEl }
  bind:value
/>
{#if !isValid}
  <p>Invalid! Type "my-input"</p>
{/if}
