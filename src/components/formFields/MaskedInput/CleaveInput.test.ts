import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { sleep } from "../../../helpers/utils";
import CleaveInputWrapper from "./CleaveInputWrapper.svelte";

describe("CleaveInput", () => {
  it("will work with defaults", async () => {
    const { findByRole } = render(CleaveInputWrapper, {
      props: {
        name: "maskedInput",
      },
    });
    const inputEl = await findByRole("textbox") as HTMLInputElement;

    expect(inputEl).toBeTruthy();
  });

  it("will mask the input", async () => {
    const { component, getByLabelText } = render(CleaveInputWrapper, {
      props: {
        label: "maskedInput",
        name: "maskedInput",
        cleaveOptions: {
          numericOnly: true,
          blocks: [0, 2, 5, 4],
          delimiters: ["(", ") ", "-"],
        },
      },
    });
    const inputEl = getByLabelText("maskedInput") as HTMLInputElement;

    userEvent.type(inputEl, "61987651234");
    await sleep(10);
    expect(inputEl.value).toBe("(61) 98765-1234");
    expect(component.value).toBe("61987651234");

    userEvent.type(inputEl, "5");
    await sleep(10);
    expect(component.value).toBe("61987651234");
  });

  it("will pass raw value for validation", () => {
    const validationFn = jest.fn();
    const { component, getByLabelText } = render(CleaveInputWrapper, {
      props: {
        label: "maskedInput",
        name: "maskedInput",
        cleaveOptions: {
          numericOnly: true,
          blocks: [0, 2, 5, 4],
          delimiters: ["(", ") ", "-"],
        },
        validationFn,
      },
    });
    const inputEl = getByLabelText("maskedInput") as HTMLInputElement;

    userEvent.type(inputEl, "61982149442");
    userEvent.click(document.body);

    expect(validationFn).toBeCalledWith(component.value);
  });

  it("will validate correctly", async () => {
    const validationFn = jest.fn();
    validationFn.mockReturnValueOnce("Specific error message").mockReturnValue(true);

    const {
      component, getByLabelText, findByText,
    } = render(CleaveInputWrapper, {
      props: {
        label: "maskedInput",
        name: "maskedInput",
        cleaveOptions: {
          numericOnly: true,
          blocks: [0, 2, 5, 4],
          delimiters: ["(", ") ", "-"],
        },
        required: false,
        validationFn,
      },
    });
    const inputEl = getByLabelText("maskedInput") as HTMLInputElement;

    userEvent.type(inputEl, "61982149442");
    userEvent.click(document.body);
    await sleep(10);
    expect(validationFn).toBeCalled();
    expect(component.isValid).toBe(false);
    let errorElement = await findByText("Specific error message");
    expect(errorElement).toBeTruthy();
    expect(errorElement).toBeVisible();

    userEvent.click(inputEl);
    userEvent.click(document.body);
    await sleep(10);
    expect(validationFn).toBeCalled();
    expect(component.isValid).toBe(true);
    errorElement = await findByText("Specific error message");
    if (errorElement) {
      expect(errorElement).not.toBeVisible();
    } else {
      expect(errorElement).toBeFalsy();
    }

    (component.inputComponent as { required: boolean }).required = true;
    userEvent.clear(inputEl);
    userEvent.click(document.body);
    await sleep(10);
    expect(validationFn).toBeCalled();
    expect(component.isValid).toBe(false);
  });

  it("will interact with form correctly", async () => {
    const validationFn = jest.fn();
    validationFn.mockReturnValueOnce("Error").mockReturnValue(true);

    const {
      component, getByLabelText,
    } = render(CleaveInputWrapper, {
      props: {
        label: "maskedInput",
        name: "maskedInput",
        cleaveOptions: {
          numericOnly: true,
          blocks: [0, 2, 5, 4],
          delimiters: ["(", ") ", "-"],
        },
        required: false,
        validationFn,
      },
    });
    const inputEl = getByLabelText("maskedInput") as HTMLInputElement;

    userEvent.type(inputEl, "61982149442");
    userEvent.click(document.body);
    await sleep(10);
    expect(component.isAllValid).toBe(false);
    expect(component.values).toEqual({ maskedInput: "61982149442" });

    userEvent.type(inputEl, "5");
    userEvent.click(document.body);
    await sleep(10);
    expect(component.isAllValid).toBe(true);
    expect(component.values).toEqual({ maskedInput: "61982149442" });

    (component.inputComponent as { required: boolean }).required = true;
    userEvent.clear(inputEl);
    userEvent.click(document.body);
    await sleep(10);
    expect(component.isAllValid).toBe(false);
  });
});
