import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import UsageExample from "./UsageExample.svelte";
import { sleep } from "../../helpers/utils";

test("Should form get input value automatically", async () => {
  const { component, getByRole } = render(UsageExample, {});
  const inputEl = getByRole("textbox");

  userEvent.click(inputEl);
  userEvent.keyboard("hi");
  await sleep(10);
  expect(component.isAllValid).toBeFalsy();
  expect(component.values).toEqual({
    "input-name": "hi",
  });

  userEvent.clear(inputEl);
  userEvent.keyboard("my-input");
  await sleep(10);
  expect(component.isAllValid).toBeTruthy();
  expect(component.values).toEqual({
    "input-name": "my-input",
  });
});
