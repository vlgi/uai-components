<script lang="ts">
  export let label: string;
  export let name: string;
  export let id: string;
  export let value: string;
  export let filled: boolean;
  export let checked: boolean;
</script>

<input
  {...$$restProps}
  type="radio"
  {name}
  {id}
  {value}
  class:filled
  class="radio-input"
  {checked}
/>

<label for={id} class="radio-label">{label !== undefined ? label : ""}</label>

<style>
  .radio-input:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: none;
    content: "";
    display: inline-block;
    border: var(--szot-border-size, 2px) solid var(--szot-border-color, #5f5f5f);
  }

  .filled:checked:after {
    background-color: var(
      --szot-radio-color,
      var(--szot-border-color, #5f5f5f)
    );
    border-color: var(--szot-radio-color, var(--szot-border-color, #5f5f5f));
  }
</style>
