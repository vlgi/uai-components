<script lang="ts">
  import RadioButton from "./RadioButton/RadioButton.svelte";

  type TRadioProps = {
    value: string;
    label?: string;
    checked?: boolean;
  };

  type TRadioStyleType = "filled" | "not-filled";

  export let name = "radio-list";
  /**
   * The listName property for this element
   * @type {string}
   */
  export let listName: string;
  /**
   * The radioStyleType property for this element
   * @type {TRadioStyleType}
   */
  export let radioStyleType: TRadioStyleType;

  /**
   * All possible options that can be selected
   * @type {array}
   */
  export let radioOptions: TRadioProps[] = [];
</script>

<span class="radio-title">{listName}</span>
<ul class="list-radio">
  {#each radioOptions as radio, i}
    <li>
      <RadioButton
        {name}
        {radioStyleType}
        id="{name}-{i}"
        value={radio.value}
        label={radio.label}
        checked={radio.checked}
      />
    </li>
  {/each}
</ul>

<style lang="scss">
  .list-radio {
    margin-top: 0.7rem;
    list-style: none;
    li {
      margin-bottom: 0.3rem;
      margin-left: 0.2rem;
    }
  }
</style>
