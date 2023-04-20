import type { ArgType } from "@storybook/addons";
import ListCheckboxWrapper from "./ListCheckboxWrapper.svelte";
import ListCheckbox from "./ListCheckbox.svelte";

export default {
  title: "Components/FormFields/ListCheckbox",
  component: ListCheckbox,
  argTypes: {
    styleType: {
      control: {
        type: "select",
        options: ["checkbox-input", "switch", "badge-pill"],
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
        options: ["light", "dark", "primary", "secondary"],
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

const checkboxItemsBadgePill = [
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

export const Badge = Template({
  name: "checklist",
  title: "Lista de Afazeres",
  styleType: "badge-pill",
  checkboxItems: checkboxItemsBadgePill,
});

export const CustomExample: any = Template({
  name: "checklist",
  title: "Lista de Afazeres",
  checkboxItems,
  style: "--szot-checkbox-color:linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);"
          + "--szot-checkbox-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);",
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
    --szot-checkbox-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);;
    --szot-checkbox-label-color: linear-gradient(to bottom, rebeccapurple, steelblue, turquoise);;"
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
