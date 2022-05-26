import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { jsTick } from "../../../helpers/utils";
import Select from "./Select.svelte";

const options = [
  { text: "Foo", value: "Foo-value" },
  { text: "Lorem", value: "Lorem-value" },
  { text: "Test", value: "Test-value" },
];

const commonsProps = {
  label: "my-select-label",
  name: "my-select-default",
};

describe("Single select", () => {
  test("Should accept initial selected", async () => {
    const { component } = render(Select, {
      ...commonsProps,
      multiple: false,
      options,
      selected: [
        "Foo-value",
        "Lorem-value",
      ],
    });

    await jsTick();
    expect(component.selected).toEqual([
      "Lorem-value", // only
    ]);
  });

  test("Should accept change the value", async () => {
    const { container, component, getAllByRole } = render(Select, {
      ...commonsProps,
      multiple: false,
      options,
    });

    userEvent.click(container);
    userEvent.click(getAllByRole("option")[0]);
    await jsTick();
    expect(component.selected).toEqual([
      "Foo-value", // only
    ]);
  });
});

describe("Multiple select", () => {
  test("Should accept initial selected", async () => {
    const { component } = render(Select, {
      ...commonsProps,
      multiple: true,
      options,
      selected: [
        "Foo-value",
        "Lorem-value",
      ],
    });

    await jsTick();
    expect(component.selected).toEqual([
      "Foo-value",
      "Lorem-value",
    ]);
  });

  test("Should accept change the value", async () => {
    const { container, component, getAllByRole } = render(Select, {
      ...commonsProps,
      multiple: true,
      options,
    });

    // select first option
    userEvent.click(container);
    userEvent.click(getAllByRole("option")[0]);
    await jsTick();

    // select last option
    userEvent.click(container);
    userEvent.click(getAllByRole("option")[2]);
    await jsTick();

    expect(component.selected).toEqual([
      "Foo-value",
      "Test-value",
    ]);
  });
});

test("Should accept change selected by props", async () => {
  const { component, container } = render(Select, {
    ...commonsProps,
    multiple: true,
    options,
    selected: [
      "Foo-value",
      "Lorem-value",
    ],
  });

  await jsTick();
  expect(container.querySelectorAll(".ss-value").length).toEqual(2);

  component.selected = [
    "Foo-value",
  ];

  await jsTick();
  expect(container.querySelectorAll(".ss-value").length).toEqual(1);
});
