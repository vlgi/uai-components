<script lang="ts">
  import ListCheckbox from "./ListCheckbox.svelte";

  type TCheckboxProps = {
    value: unknown;
    label?: string;
    checked?: boolean;
  };
  /**
   * All possible options that can be selected
   * @type {array}
   */
  export let checkboxItems: TCheckboxProps[];
  /**
   * The name property for this element
   * @type {string}
   */
  export let name: string;
  /**
   * The required validation for this element
   * @type {boolean}
   */
  export let required: boolean;
  /**
   * Makes this element always invalid
   * @type {boolean}
   */
  export let forceInvalid: boolean;
  /**
   * The listName property for this element
   * @type {string}
   */
  export let listName: string;

  /**
   * Set own styles for test
   * @type {string}
   */
  export let style: string;
  /**
   * Value displayed on "checked"
   * @type {string}
   */
  export let value;
</script>

<div {style}>
  <ListCheckbox
    {checkboxItems}
    {...$$restProps}
    {listName}
    {name}
    {required}
    {forceInvalid}
    on:input
    on:change
    bind:value
  />
</div>

<header><b>Checked:</b></header>
<p>{JSON.stringify(value)}</p>
