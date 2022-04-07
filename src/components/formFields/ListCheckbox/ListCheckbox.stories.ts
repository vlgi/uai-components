import type { ArgType } from "@storybook/addons";
import ListCheckboxWrapper from "./ListCheckboxWrapper.svelte";
import ListCheckbox from "./ListCheckbox.svelte";

export default {
  title: "Components/FormFields/ListCheckbox",
  component: ListCheckbox,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: ListCheckboxWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

const checkboxItems = [
  {
    value: "firstItem",
    label: "Item 1",
  },
  {
    value: "secondItem",
    label: "Item 2",
  },
  {
    value: "thirdItem",
    label: "Item 3",
  },
];

export const Default = Template({
  name: "checklist",
  title: "Lista de Afazeres",
  checkboxItems,
});

export const DefaultChecked = Template({
  name: "checklist",
  title: "Lista de Afazeres",
  checkboxItems,
  values: ["firstItem", "thirdItem"],
});

export const forceInvalid = Template({
  name: "checklist",
  title: "Lista de Afazeres",
  checkboxItems,
  forceInvalid: true,
  errorMsg: "Mensagem de erro",
});

export const CustomExample: any = Template({
  name: "checklist",
  title: "Lista de Afazeres",
  checkboxItems,
  style: "--szot-checkbox-margin: 3px 2px 0px; --szot-checkbox-size:18px; --szot-checkbox-color: #555; --szot-checkbox-label: #555;",
});
CustomExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
    <script lang="ts">
      import ListCheckbox from "./ListCheckbox.svelte";

      const checkboxItems = [
        {
          value: "firstItem",
          label: "Item 1",
        },
        {
          value: "secondItem",
          label: "Item 2",
        },
        {
          value: "thirdItem",
          label: "Item 3",
        },
      ];
    </script>

    <div style="--szot-checkbox-margin: 3px 2px 0px;
    --szot-checkbox-size:20px;
    --szot-checkbox-color: #555;
    --szot-checkbox-label: #555;"
      >
      <ListCheckbox
        name="checklist"
        title="Lista de Afazeres"
        {checkboxItems}
      />
    </div>
    `,
    },
  },
};