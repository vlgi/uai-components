import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/svelte";
import Form from "./Form.svelte";
import CustomUsageExampleComponent from "./examples/CustomUsageExample.svelte";
import CustomInputExampleComponent from "./examples/CustomInputExample.svelte";
import CustomButtonExampleComponent from "./examples/CustomButtonExample.svelte";
import FormFieldsComponent from "./examples/FormFieldsExample.svelte";
import FormFieldsFilledComponent from "./examples/FormFieldsExampleFilled.svelte";
import CookieFormExampleComponent from "./examples/CookieFormExample.svelte";
import FormSubmitFunctionExampleComponent from "./examples/FormSubmitFunctionExample.svelte";
import FormSubmitOutsideExampleComponent from "./examples/FormSubmitOutsideExample.svelte";

const meta = {
  title: "Components/Form",
  component: Form,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
} satisfies Meta<Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomInputExample = () => ({
  Component: CustomInputExampleComponent,
  on: {
    input: action("on:input"),
    change: action("on:change"),
  },
});

CustomInputExample.parameters = {
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

export const CustomButtonExample = () => ({
  Component: CustomButtonExampleComponent,
  on: {
    click: action("on:click"),
  },
});

CustomButtonExample.parameters = {
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

export const CustomUsageExample = () => ({
  Component: CustomUsageExampleComponent,
  on: {
    submit: action("on:submit"),
  },
});

CustomUsageExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
<script lang="ts">
  import Input from "./CustomInputExample.svelte";
  import Button from "./CustomButtonExample.svelte";
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

export const FormFields = () => ({
  Component: FormFieldsComponent,
  on: {
    submit: action("on:submit"),
  },
});

export const FormFieldsFilled = () => ({
  Component: FormFieldsFilledComponent,
  on: {
    submit: action("on:submit"),
  },
});

export const CookieFormExample = () => ({
  Component: CookieFormExampleComponent,
  on: {
    submit: action("on:submit"),
  },
});

export const FormSubmitFunctionExample = () => ({
  Component: FormSubmitFunctionExampleComponent,
  on: {
    submit: action("on:submit"),
  },
});

export const FormSubmitOutsideExample = () => ({
  Component: FormSubmitOutsideExampleComponent,
  on: {
    submit: action("on:submit"),
  },
});
