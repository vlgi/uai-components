<script lang="ts">
  import RadioButton from "./RadioButton/RadioButton.svelte";

  type TRadioProps = {
    value: string,
    label: string,
    checked?: boolean
  }

  export let name: string;
  export let listName: string;
  export let filled: boolean;
  export let radioOptions: TRadioProps[];
</script>

<span class="radio-title">{listName}</span>
<ul class="list-radio">
  {#each radioOptions as radio, i}
    <li>
      <RadioButton
        {...$$restProps}
        {name}
        filled={filled}
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
