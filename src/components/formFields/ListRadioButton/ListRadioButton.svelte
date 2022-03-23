<script lang="ts">
  import RadioButton from "./RadioButton/RadioButton.svelte";

  type TRadioProps = {
    value: string;
    label?: string;
    checked?: boolean;
  };

  export let name = "radio-list";
  /**
   * The listName property for this element
   * @type {string}
   */
  export let listName: string;
  /**
   * The filled property for this element
   * @type {string}
   */
  export let filled: boolean;

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
        {filled}
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
