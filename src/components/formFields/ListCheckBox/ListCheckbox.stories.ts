import type { ArgType } from "@storybook/addons";
import ListCheckbox from "./ListCheckboxWrapper.svelte";

export default {
  title: "Components/FormFields/ListCheckbox",
  component: ListCheckbox,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: ListCheckbox,
    props,
  });
  ret.args = _args;
  return ret;
};

const checkboxOptions = [
  {
    value: "firstOption",
    label: "Opção 1",
  },
  {
    value: "secondOption",
    label: "Opção 2",
  },
  {
    value: "thirdOption",
    label: "Opção 3",
  },
];

const checkboxOptionsChecked = [
  {
    value: "firstOption",
    label: "Opção 1",
  },
  {
    value: "secondOption",
    label: "Opção 2",
    checked: true,
  },
  {
    value: "thirdOption",
    label: "Opção 3",
  },
];

export const Default = Template({
  name: "optionList",
  listName: "Escolha uma opção",
  checkboxOptions,
});

export const DefaultChecked = Template({
  name: "optionList",
  listName: "Escolha uma opção",
  checkboxOptions: checkboxOptionsChecked,
});

export const FilledCheckbox = Template({
  name: "optionList",
  listName: "Escolha uma opção",
  checkboxOptions,
  checkboxStyleType: "filled",
});

export const forceInvalid = Template({
  name: "optionList",
  listName: "Escolha uma opção",
  checkboxOptions,
  forceInvalid: true,
});

export const CustomExample: any = Template({
  name: "optionList",
  listName: "Escolha uma opção",
  checkboxOptions,
  checkboxStyleType: "notFilled",
  style: "--szot-checkbox-margin: 3px 2px 0px; --szot-checkbox-size:18px; --szot-checkbox-color: #555; --szot-checkbox-label: #555;",
});
CustomExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
    <script lang="ts">
      import ListCheckbox from "./ListCheckbox.svelte";

      const checkboxOptions = [
        {
          value: "firstOption",
          label: "Opção 1",
        },
        {
          value: "secondOption",
          label: "Opção 2",
        },
        {
          value: "thirdOption",
          label: "Opção 3",
        },
      ];
    </script>

    <div style="--szot-checkbox-margin: 3px 2px 0px;
    --szot-checkbox-size:20px;
    --szot-checkbox-color: #555;
    --szot-checkbox-label: #555;"
      >
      <ListCheckbox
        name="optionList"
        listName="Escolha uma opção"
        {checkboxOptions}
        checkboxStyleType="notFilled"
      />
    </div>
    `,
    },
  },
};
