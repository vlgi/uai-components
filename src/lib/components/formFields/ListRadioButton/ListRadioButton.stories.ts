import type { ArgType } from "@storybook/addons";
import { action } from "@storybook/addon-actions";
import ListRadioButton from "./ListRadioButton.svelte";
import ListRadioButtonWrapper from "./ListRadioButtonWrapper.svelte";

export default {
  title: "Components/FormFields/ListRadioButton",
  component: ListRadioButton,
  argTypes: {
    onClick: { action: "on:click" },
    radioStyleType: {
      control: {
        type: "select",
        options: ["filled", "notFilled", "badge-pill"],
      },
    },
    iconPosition: {
      control: {
        type: "select",
        options: ["left", "right", "both", "none"],
      },
    },
    badgeStyle: {
      control: {
        type: "select",
        options: ["dark", "light", "primary", "secondary"],
      },
    },
    direction: {
      control: {
        type: "select",
        options: ["column", "row"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: ListRadioButtonWrapper,
    props,
    on: {
      click: action("on:click"),
    },
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

const radioOptions2 = [
  {
    value: "firstItem",
    label: "Item",
  },
  {
    value: "secondItem",
    label: "Item dois",
  },
  {
    value: "thirdItem",
    label: "O terceiro item",
  },
  {
    value: "fourthItem",
    label: "Item 4",
  },
  {
    value: "fifthItem",
    label: "Item -------------5-------------",
  },
  {
    value: "sixthItem",
    label: "6",
  },
];

export const Default = Template({
  name: "defaultOptionList",
  listName: "Escolha uma opção",
  radioOptions,
});

export const DefaultChecked = Template({
  name: "defaultCheckedOptionList",
  listName: "Escolha uma opção",
  radioOptions,
  value: "thirdOption",
});

export const FilledRadios = Template({
  name: "filledRadiosOptionList",
  listName: "Escolha uma opção",
  radioOptions,
  radioStyleType: "filled",
});

export const Badge = Template({
  name: "badgeOptionList",
  listName: "Escolha uma opção",
  radioOptions: radioOptions2,
  radioStyleType: "badge-pill",
  direction: "row",
  iconPosition: "left",
  badgeStyle: "primary",
});

export const EnableUncheck = Template({
  name: "defaultOptionList",
  listName: "Escolha uma opção",
  radioOptions,
  enableUncheck: true,
});

export const forceInvalid = Template({
  name: "forceInvalidOptionList",
  listName: "Escolha uma opção",
  radioOptions,
  forceInvalid: true,
});

export const CustomExample: any = Template({
  name: "customExampleOptionList",
  listName: "Escolha uma opção",
  radioOptions,
  radioStyleType: "notFilled",
  style: "--szot-radio-margin: 3px 2px 0px;"
          + "--szot-radio-size:18px;"
          + "--szot-radio-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
          + "--szot-radio-checked-color:  linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);"
          + "--szot-radio-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);",
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
    --szot-radio-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);;
    --szot-radio-label: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);;"
      >
      <ListRadioButton
        name="optionList"
        listName="Escolha uma opção"
        {radioOptions}
        radioStyleType="notFilled"
      />
    </div>
    `,
    },
  },
};
