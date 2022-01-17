import { render } from "@testing-library/svelte";

import ButtonWrapperForTestSlot from "./ButtonWrapperForTestSlot.svelte";

describe("button test", () => {
  test("should show button with label", () => {
    const { getByTestId } = render(ButtonWrapperForTestSlot, {
      labelSlot: "my-button",
    });

    const button = getByTestId("btn-visible");
    expect(button).toBeTruthy();
    expect(button).toBeVisible();
  });

  test("should not show hidden button", () => {
    const { getByTestId } = render(ButtonWrapperForTestSlot, {
      labelSlot: "my-button",
    });

    const button = getByTestId("btn-hidden");
    expect(button).toBeTruthy();
    expect(button).not.toBeVisible();
  });
});
