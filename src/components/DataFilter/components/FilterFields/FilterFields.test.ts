import type { RenderResult } from "@testing-library/svelte/types";
import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { EPickerType } from "../formfields/Datepicker/types";
import FilterFields from "./FilterFields.svelte";
import { allCommonConfigs } from "./fixtures";
import { EFieldType } from "./types";
import { jsTick, sleep } from "../../helpers/utils";

test("Should allow configure the possible filters", () => {
  const { getAllByRole } = render(FilterFields, {
    configs: allCommonConfigs,
  });
  // get all options
  const options = getAllByRole("option");
  expect(options.length).toEqual(allCommonConfigs.length);
});

describe("Selected and values", () => {
  let rendered: RenderResult;

  beforeEach(async () => {
    rendered = render(FilterFields, {
      configs: allCommonConfigs,
      selectedValues: [
        {
          fieldType: EFieldType.datepicker,
          key: "datetime",
          value: "2000-01-13T11:50",
        },
        {
          fieldType: EFieldType.input,
          key: "input-money",
          value: "100000.12",
        },
      ],
    });
    await jsTick();
  });

  function getAllByFieldByKey(key: string) {
    return rendered.container.querySelectorAll(`[name='${key}']`);
  }

  test("Should allow to set an initial value", () => {
    expect(getAllByFieldByKey("datetime")).toHaveLength(1);
    expect(getAllByFieldByKey("input-money")).toHaveLength(1);
  });

  test("Should allow to change the values", () => {
    const datetimeInputEl = (getAllByFieldByKey("datetime")[0] as HTMLInputElement);
    expect(datetimeInputEl.value).toEqual("2000-01-13T11:50");

    rendered.component.selectedValues = [
      {
        fieldType: EFieldType.datepicker,
        key: "datetime",
        value: "2020-01-13T11:50",
      },
      {
        fieldType: EFieldType.input,
        key: "input-money",
        value: "100000.12",
      },
    ];

    expect(datetimeInputEl.value).toEqual("2020-01-13T11:50");
  });

  test("Should allow to remove selected fields", async () => {
    const { getAllByTestId } = rendered;

    expect(getAllByTestId("filter-field")).toHaveLength(2);

    rendered.component.selectedFilters = ["datetime"];
    rendered.component.selectedValues = [
      {
        fieldType: EFieldType.datepicker,
        key: "datetime",
        value: "2020-01-13T11:50",
      },
    ];

    await sleep(1000);

    // check if only rest one field
    expect(getAllByTestId("filter-field")).toHaveLength(1);
    // check if datetime keeps the same value
    expect(getAllByFieldByKey("datetime")[0] as HTMLInputElement).toHaveValue("2000-01-13T11:50");
  });

  test("Should auto add as selected field on add more selectedValues", () => {
    const { getAllByTestId } = rendered;

    expect(getAllByTestId("filter-field")).toHaveLength(2);

    rendered.component.selectedValues = [
      {
        fieldType: EFieldType.datepicker,
        key: "datetime",
        value: "2020-01-13T11:50",
      },
      {
        fieldType: EFieldType.datepicker,
        key: "time",
        value: "11:50",
      },
      {
        fieldType: EFieldType.input,
        key: "input-money",
        value: "100000.12",
      },
    ];

    expect(getAllByTestId("filter-field")).toHaveLength(3);
  });

  test("Should allow to get the valid and not empty values", async () => {
    const moneyInputEl = (getAllByFieldByKey("input-money")[0] as HTMLInputElement);

    userEvent.click(moneyInputEl);
    // remove the cents
    userEvent.keyboard("{backspace}{backspace}{backspace}");
    // append
    userEvent.keyboard("1,48");

    await jsTick();

    expect(rendered.component.selectedValues).toEqual([
      {
        fieldType: EFieldType.datepicker,
        key: "datetime",
        value: "2000-01-13T11:50",
      },
      {
        fieldType: EFieldType.input,
        key: "input-money",
        value: "1000001.48",
      },
    ]);
  });
});
