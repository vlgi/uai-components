import type { Meta } from "@storybook/svelte";
import type { StoryObj } from "$types/storybook";
import CustomInputExample from "./examples/CustomInputExample.svelte";
import CustomButtonExample from "./examples/CustomButtonExample.svelte";
import CustomUsageExample from "./examples/CustomUsageExample.svelte";
import FormFieldsComponent from "./examples/FormFieldsExample.svelte";
import FormFieldsFilledComponent from "./examples/FormFieldsExampleFilled.svelte";
import CookieFormExampleComponent from "./examples/CookieFormExample.svelte";
import FormSubmitFunctionExampleComponent from "./examples/FormSubmitFunctionExample.svelte";
import FormSubmitOutsideExampleComponent from "./examples/FormSubmitOutsideExample.svelte";

import Form from "./Form.svelte";

const meta = {
  title: "Components/Form",
  component: Form,
  tags: ["autodocs"], // enable auto docs
  // common stuff for all stories here
} satisfies Meta<Form>;

export default meta;

export const CustomInput: StoryObj<typeof meta, CustomInputExample> = {
  render: (props) => ({
    Component: CustomInputExample,
    props,
  }),
  parameters: {
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
  },
};

export const CustomButton: StoryObj<typeof meta, CustomButtonExample> = {
  render: (props) => ({
    Component: CustomButtonExample,
    props,
  }),
  parameters: {
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
  },
};

export const CustomUsage: StoryObj<typeof meta, CustomUsageExample> = {
  render: (props) => ({
    Component: CustomUsageExample,
    props,
  }),
  parameters: {
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
  },
};

export const FormFields: StoryObj<typeof meta, FormFieldsComponent> = {
  render: (props) => ({
    Component: FormFieldsComponent,
    props,
  }),
};

export const FormFieldsFilled: StoryObj<typeof meta, FormFieldsFilledComponent> = {
  render: (props) => ({
    Component: FormFieldsFilledComponent,
    props,
  }),
};

export const CookieForm: StoryObj<typeof meta, CookieFormExampleComponent> = {
  render: (props) => ({
    Component: CookieFormExampleComponent,
    props,
  }),
};

export const FormSubmitFunctionExample: StoryObj<typeof meta, FormSubmitFunctionExampleComponent> =
  {
    render: (props) => ({
      Component: FormSubmitFunctionExampleComponent,
      props,
    }),
  };

export const FormSubmitOutsideExample: StoryObj<typeof meta, FormSubmitOutsideExampleComponent> = {
  render: (props) => ({
    Component: FormSubmitOutsideExampleComponent,
    props,
  }),
};
