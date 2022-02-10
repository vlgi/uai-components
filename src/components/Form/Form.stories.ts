import { action } from "@storybook/addon-actions";
import Form from "./Form.svelte";
import UsageExampleComponent from "./UsageExample.svelte";
import InputExampleComponent from "./InputExample.svelte";
import ButtonExampleComponent from "./ButtonExample.svelte";

export default {
  title: "Components/Form",
  component: Form,
  parameters: {
    // skip all screen test for button stories
    creevey: {
      skip: true,
    },
    storyshots: false,
  },
};

export const InputExample = () => ({
  Component: InputExampleComponent,
  on: {
    input: action("on:input"),
    change: action("on:change"),
  },
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

export const ButtonExample = () => ({
  Component: ButtonExampleComponent,
  on: {
    click: action("on:click"),
  },
});

ButtonExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<script lang="ts">
  import { getContext, hasContext } from "svelte";

  import type { TFormContext } from "./types";

  const isInsideContext = hasContext("FormContext");
  const { fireSubmit } = isInsideContext && getContext<TFormContext>("FormContext");

</script>

<button on:click={ () => isInsideContext && fireSubmit() } on:click>
  Submit
</button>
      `,
    },
  },
};

export const UsageExample = () => ({
  Component: UsageExampleComponent,
  on: {
    submit: action("on:submit"),
  },
});

UsageExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<script lang="ts">
  import Input from "./InputExample.svelte";
  import Button from "./ButtonExample.svelte";
  import Form from "./Form.svelte";

  export let values: Record<string, unknown>;
  export let isAllValid: boolean;
</script>

<Form bind:values bind:isAllValid on:submit>
  <Input name="input-name"/>
  <br>
  <Button/>
</Form>

<p><b>Form Values:</b> { JSON.stringify(values) }</p>
<p><b>Form valid:</b> { isAllValid }</p>
`,
    },
  },
};
