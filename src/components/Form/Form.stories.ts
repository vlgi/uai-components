/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { ArgType } from "@storybook/addons";
import Form from "./Form.svelte";
import UsageExampleComponent from "./UsageExample.svelte";
import InputExampleComponent from "./InputExample.svelte";

export default {
  title: "Components/Form",
  component: Form,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: Form,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({});

export const InputExample = () => ({
  Component: InputExampleComponent,
});

InputExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
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
`,
    },
  },
};

export const UsageExample = () => ({
  Component: UsageExampleComponent,
});

UsageExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<script lang="ts">
  import Input from "./InputExample.svelte";
  import Form from "./Form.svelte";

  let values: Record<string, unknown>;
  let isAllValid: boolean;
</script>

<Form bind:values bind:isAllValid>
  <Input name="input-name"/>
</Form>

<p><b>Form Values:</b> { JSON.stringify(values) }</p>
<p><b>Form valid:</b> { isAllValid }</p>

<style lang="scss">
</style>
`,
    },
  },
};
