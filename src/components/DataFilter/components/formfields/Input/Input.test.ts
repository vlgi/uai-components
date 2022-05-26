import { render, getByRole } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Input from "./Input.svelte";
import { jsTick } from "../../../helpers/utils";

const testCases = [
  {
    mask: "number",
    initialValue: "1000000",
    initialExpect: "1000000",
    initialMaskedValue: "1.000.000",
    changeToAppend: "1,123456",
    finalExpect: "10000001.12",
    finalMaskedValue: "10.000.001,12",
  },
  {
    mask: "percentage",
    initialValue: "1000000",
    initialExpect: "1000000",
    initialMaskedValue: "% 1000000",
    changeToAppend: "1,123456",
    finalExpect: "10000001.12",
    finalMaskedValue: "% 10000001,12",
  },
  {
    mask: "money",
    initialValue: "1000000",
    initialExpect: "1000000",
    initialMaskedValue: "R$ 1.000.000",
    changeToAppend: "1,123456",
    finalExpect: "10000001.12",
    finalMaskedValue: "R$ 10.000.001,12",
  },
];

test.each(testCases)("Should mask $mask", async (data) => {
  const { container, component, getByDisplayValue } = render(Input, {
    name: "my-input",
    mask: data.mask,
    value: data.initialValue,
  });

  const inputEl = (getByRole(container, "textbox") as HTMLInputElement);

  // initial value mask
  await jsTick();
  expect(component.value).toEqual(data.initialExpect);
  expect(inputEl.value).toEqual(data.initialMaskedValue);

  // changing value
  userEvent.click(inputEl);
  userEvent.keyboard(data.changeToAppend);
  await jsTick();
  expect(component.value).toEqual(data.finalExpect);
  expect(inputEl.value).toEqual(data.finalMaskedValue);

  // NOTE that inputEl.value and component.value are not equal.
});
