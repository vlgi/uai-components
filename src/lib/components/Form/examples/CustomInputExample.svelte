<script lang="ts">
  import { onMount, getContext, hasContext, onDestroy } from "svelte";
  import type { TFormContext } from "../types";

  export let name: string;
  export let value = "";
  export let required = false;

  let inputEl: HTMLInputElement;
  let isValid = false;
  let showErrorMsg = false;

  const isInsideContext = hasContext("FormContext");
  const { setFieldValue, addFieldToContext, removeFieldFromContext } =
    isInsideContext && getContext<TFormContext>("FormContext");

  function setContextValue() {
    if (isInsideContext) {
      setFieldValue(name, value, isValid);
    }
  }

  function validate() {
    isValid = value === "my-input";
    showErrorMsg = !isValid;
    setContextValue();
  }

  function setValue(v: string) {
    value = v;
  }

  onMount(() => {
    if (isInsideContext) {
      addFieldToContext(name, value, isValid, required, inputEl, validate, setValue);
    }
  });

  onDestroy(() => {
    if (isInsideContext) {
      removeFieldFromContext(name);
    }
  });
</script>

<input
  type="text"
  {name}
  {required}
  bind:value
  bind:this={inputEl}
  on:blur={validate}
  on:input={setContextValue}
  on:input
  on:change
/>
{#if showErrorMsg}
  <p>Invalid! Type "my-input"</p>
{/if}
