import type { Meta } from "@storybook/svelte";
import type { StoryObj } from "$types/storybook";
import CustomInputExample from "./examples/CustomInputExample.svelte";
import CustomInputExampleCode from "./examples/CustomInputExample.svelte?raw";
import CustomButtonExample from "./examples/CustomButtonExample.svelte";
import CustomButtonExampleCode from "./examples/CustomButtonExample.svelte?raw";
import CustomUsageExample from "./examples/CustomUsageExample.svelte";
import CustomUsageExampleCode from "./examples/CustomUsageExample.svelte?raw";
import FormFieldsComponent from "./examples/FormFieldsExample.svelte";
import FormFieldsFilledComponent from "./examples/FormFieldsExampleFilled.svelte";
import CookieFormExampleComponent from "./examples/CookieFormExample.svelte";
import FormSubmitFunctionExampleComponent from "./examples/FormSubmitFunctionExample.svelte";
import FormSubmitOutsideExampleComponent from "./examples/FormSubmitOutsideExample.svelte";

import Form from "./Form.svelte";

const meta = {
  title: "Components/Form",
  component: Form,
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
        code: CustomInputExampleCode,
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
        code: CustomButtonExampleCode,
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
        code: CustomUsageExampleCode,
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
