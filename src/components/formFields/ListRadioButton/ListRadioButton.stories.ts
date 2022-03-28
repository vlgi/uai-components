import type { ArgType } from "@storybook/addons";
import ListRadioButton from "./ListRadioButtonWrapper.svelte";

export default {
  title: "Components/FormFields/ListRadioButton",
  component: ListRadioButton,
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: ListRadioButton,
    props,
  });
  ret.args = _args;
  return ret;
};

const radioOptions = [
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

const radioOptionsChecked = [
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
  radioOptions,
});

export const DefaultChecked = Template({
  name: "optionList",
  listName: "Escolha uma opção",
  radioOptions: radioOptionsChecked,
});

export const FilledRadios = Template({
  name: "optionList",
  listName: "Escolha uma opção",
  radioOptions,
  radioStyleType: "filled",
});

export const CustomExample: any = Template({
  name: "optionList",
  listName: "Escolha uma opção",
  radioOptions,
  radioStyleType: "not-filled",
  style: "--szot-radio-margin: 3px 2px 0px; --szot-radio-size:18px; --szot-radio-color: #555; --szot-radio-label: #555;",
});
CustomExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
    <script lang="ts">
      import ListRadioButton from "./ListRadioButton.svelte";

      const radioOptions = [
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

    <div style="--szot-radio-margin: 3px 2px 0px;
    --szot-radio-size:20px;
    --szot-radio-color: #555;
    --szot-radio-label: #555;"
      >
      <ListRadioButton
        name="optionList"
        listName="Escolha uma opção"
        {radioOptions}
        radioStyleType="not-filled"
      />
    </div>
    `,
    },
  },
};
