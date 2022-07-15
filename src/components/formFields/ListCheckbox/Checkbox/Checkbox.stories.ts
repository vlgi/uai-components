import type { ArgType } from "@storybook/addons";
import Checkbox from "./Checkbox.svelte";
import CheckboxWrapper from "./CheckboxWrapper.svelte";

export default {
  title: "Components/FormFields/Checkbox",
  component: Checkbox,
  argTypes: {
    styleType: {
      control: {
        type: "select",
        options: ["checkbox-input", "switch", "text-switch"],
      },
    },
  },
};

const Template = (_args: ArgType) => {
  const ret = ({ ...props }) => ({
    Component: CheckboxWrapper,
    props,
  });
  ret.args = _args;
  return ret;
};

export const Default = Template({
  name: "default",
});

export const DefaultChecked = Template({
  name: "default-checked",
  checked: true,
});

export const Switch = Template({
  name: "switch",
  styleType: "switch",
});

export const SwitchChecked = Template({
  name: "switch-checked",
  checked: true,
  styleType: "switch",
});

export const TextSwitch = Template({
  name: "text-switch",
  styleType: "text-switch",
  checkedText: "Ativo",
  uncheckedText: "Inativo",
});

export const TextSwitchChecked = Template({
  name: "text-switch",
  styleType: "text-switch",
  checked: true,
  checkedText: "Ativo",
  uncheckedText: "Inativo",
});

export const Labeled = Template({
  name: "labeled",
  label: "Item",
});

export const CustomSwitchExample: any = Template({
  name: "custom-switch",
  styleType: "switch",
  style: "--szot-checkbox-switch-color: black;"
    + "--szot-checkbox-switch-checked-color: linear-gradient(to bottom, grey, brown);"
    + "--szot-checkbox-switch-width: 3rem;"
    + "--szot-checkbox-switch-height: 1.32rem;"
    + "--szot-checkbox-switch-background: lightblue;",
});

export const CustomTextSwitchExample: any = Template({
  name: "custom-text-switch",
  styleType: "text-switch",
  checkedText: "Ativo",
  uncheckedText: "Inativo",
  style: "--szot-checkbox-switch-color: black;"
    + "--szot-checkbox-switch-checked-color: linear-gradient(to bottom, grey, brown);"
    + "--szot-checkbox-switch-width: 5rem;"
    + "--szot-checkbox-switch-height: 1.32rem;"
    + "--szot-checkbox-switch-background: lightblue;",
});
CustomSwitchExample.parameters = {
  docs: {
    source: {
      language: "html",
      code: `
    <script lang="ts">
      import Checkbox from "./Checkbox.svelte";
    </script>

    <div style="--szot-checkbox-switch-color: black;
    --szot-checkbox-switch-width: 3rem;
    --szot-checkbox-switch-height: 1.32rem;
    --szot-checkbox-switch-checked-color: linear-gradient(to bottom, grey, brown);;
    --szot-checkbox-switch-background: lightblue;"
      >
      <Checkbox
        name="custom-switch"
        styleType="switch"
      />
    </div>
    `,
    },
  },
};
