<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { dataArray } from "slim-select/dist/data";
  import Datepicker from "../formfields/Datepicker/Datepicker.svelte";
  import DatepickerRange from "../formfields/DatepickerRange/DatepickerRange.svelte";
  import Input from "../formfields/Input/Input.svelte";
  import InputRange from "../formfields/InputRange/InputRange.svelte";
  import Select from "../formfields/Select/Select.svelte";

  import type { TConfig, TSelectedValue, TSelectedConfigs } from "./types";
  import { EFieldType } from "./types";

  export let configs: TConfig[];

  // If you set some not selected this will automaticaly set as a selectedFilters
  export let selectedValues: TSelectedValue[] = [];

  /**
   * selectedValues has priority over this.
   * If you want to force remove something, remove here and at selectedValues too.
  */
  export let selectedFilters: string[] = [];

  let filterOptions: dataArray;
  let selectedConfigs: TSelectedConfigs[] = [];
  const dispatcher = createEventDispatcher();

  function getFilterOptions(_configs: TConfig[]): dataArray {
    return _configs?.map((c) => ({
      text: c.label,
      value: c.key,
    }));
  }

  function getSelectedConfigs(
    _configs: TConfig[],
    _selectedValues: TSelectedValue[],
    _selectedFilters: string[],
  ): TSelectedConfigs[] {
    return _selectedFilters.map((key) => {
      const conf = _configs?.find((cnf) => cnf.key === key);
      const valueObj = _selectedValues?.find((v) => v.key === key);

      return {
        ...conf,
        value: valueObj?.value || null,
      };
    });
  }

  function setValues() {
    selectedValues = selectedConfigs
      // get only selected, because selected filters can change and remove some values
      .filter((x) => (
        !!selectedFilters.find((key) => x.key === key)
      ))
      // get only not empty and valid values
      .filter((x) => {
        if (x.fieldType === EFieldType.datepickerRange || x.fieldType === EFieldType.inputRange) {
          return !!x.value?.from && !!x.value?.to;
        }

        if (x.fieldType === EFieldType.input || x.fieldType === EFieldType.datepicker) {
          return !!x.value;
        }

        if (x.fieldType === EFieldType.select) {
          return x.value?.length > 0;
        }

        return false;
      })
      .map((x): TSelectedValue => ({
        key: x.key,
        value: x.value,
        fieldType: x.fieldType,
      }));

    dispatcher("input");
  }

  $: filterOptions = getFilterOptions(configs);
  $: selectedConfigs = getSelectedConfigs(configs, selectedValues, selectedFilters);
  $: {
    // TODO - isso daqui pode dar problema
    // imagine que o selectedValues na verdade esteja programáticamente removendo alguns filtros
    const allNotUnique = selectedFilters.concat(selectedValues?.map((x) => x.key));
    selectedFilters = Array.from(new Set(allNotUnique));
  }
</script>

<fieldset>
  <legend>Filtrar</legend>

  <Select
    name="filter-select"
    label="Selecione os campos que deseja filtrar"
    multiple={ true }
    options={ filterOptions }
    bind:selected={ selectedFilters }
    on:change={ setValues }
  />

  {#each selectedConfigs as conf}
    <div class="filter-field" data-testid="filter-field">
      {#if conf.fieldType === EFieldType.datepicker}
        <Datepicker
          name={ conf.key }
          label={ conf.label }
          pickerType={ conf.pickerType }
          on:change={ setValues }
          bind:value={ conf.value }
        />
      {:else if conf.fieldType === EFieldType.datepickerRange}
        <DatepickerRange
          name={ conf.key }
          label={ conf.label }
          pickerType={ conf.pickerType }
          on:change={ setValues }
          bind:value={ conf.value }
        />
      {:else if conf.fieldType === EFieldType.input}
        <Input
          name={ conf.key }
          label={ conf.label }
          mask={ conf.mask }
          on:input={ setValues }
          bind:value={ conf.value }
        />
      {:else if conf.fieldType === EFieldType.inputRange}
        <InputRange
          name={ conf.key }
          label={ conf.label }
          mask={ conf.mask }
          on:input={ setValues }
          bind:value={ conf.value }
        />
      {:else if conf.fieldType === EFieldType.select}
        <Select
          name={ conf.key }
          label={ conf.label }
          multiple={ conf.multiple }
          options={ conf.options }
          limit={ conf.limit }
          on:change={ setValues }
          bind:selected={ conf.value }
        />
      {/if}
    </div>
  {/each}
</fieldset>

<style lang="scss">
  fieldset {
    border: none;
  }

  legend {
    font-size: 2rem;
  }

  .filter-field {
    margin: .6rem;
  }
</style>
