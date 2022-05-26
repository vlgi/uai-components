<!--
  TODO - Change to a valina aproach
  https://svelte.dev/repl/c7094fb1004b440482d2a88f4d1d7ef5?version=3.4.1
 -->
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import SlimSelect from "slim-select";
  import type { dataArray } from "slim-select/dist/data";

  /** @type {string} */
  export let name: string;
  export let label = "";
  export let multiple = false;

  /** @type {number} */
  export let limit: number = null;

  /**
   * Type from slim select
   * @type {dataArray}
   */
  export let options: dataArray = [];

  /** @type {string[]} */
  export let selected: string[] = [];

  let selectEl: HTMLElement;
  let slimSelect: SlimSelect;
  const dispatcher = createEventDispatcher();

  // used to change the interface from {TOption[] | TOption} to array only
  function setSelected(ev: Event) {
    const select = (ev.target as HTMLSelectElement);
    // eslint-disable-next-line no-underscore-dangle
    const data = Array.from(select.querySelectorAll("option:checked"), (e) => (e as HTMLOptionElement).value);
    selected = data;
    dispatcher("change", {
      selected,
    });
  }

  // used to modify slim-select value when prop "selected" change
  function changeSelected(_slimSelect: SlimSelect, _selected: string[]) {
    _slimSelect?.setSelected(
      limit ? _selected.slice(0, limit) : selected,
    );
  }

  $: changeSelected(slimSelect, selected);

  onMount(() => {
    slimSelect = new SlimSelect({
      select: selectEl,
      placeholder: "",
      showSearch: options.length > 2,
      data: options,
      limit,
    });
  });

  onDestroy(() => {
    slimSelect.destroy();
  });
</script>

<label for={ name }>{ label }</label>
<select
  { multiple }
  { name }
  id={ name }
  on:change={ setSelected }
  bind:this={ selectEl }
/>

<style global lang="scss">
  @use "~slim-select/dist/slimselect.css";
</style>
