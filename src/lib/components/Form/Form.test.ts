import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import UsageExample from "./examples/CustomUsageExample.svelte";
import { sleep } from "../../helpers/utils";

beforeEach(() => {
  /**
   * fix for scrollintoview-is-not-a-function
   * https://stackoverflow.com/questions/53271193/typeerror-scrollintoview-is-not-a-function
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  window.HTMLElement.prototype.scrollIntoView = () => {};
});

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

  expect(component.values).toEqual({
    "input-name": "my-input",
  });

  // must click outside to trigger the validation
  userEvent.click(document.documentElement);
  await sleep(10);
  expect(component.isAllValid).toBeTruthy();
});

test("Should form dispatch the submit only when all fields is valid", async () => {
  const { getByRole, component } = render(UsageExample, {});
  const inputEl = getByRole("textbox");
  const buttonEl = getByRole("button");

  const submitFn = jest.fn();
  component.$on("submit", submitFn);

  userEvent.click(buttonEl);
  await sleep(10);

  expect(submitFn).not.toBeCalled();

  userEvent.click(inputEl);
  userEvent.keyboard("my-input");
  await sleep(10);

  userEvent.click(buttonEl);
  await sleep(10);

  expect(submitFn).toBeCalled();
});
