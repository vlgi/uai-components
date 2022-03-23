<script lang="ts">
  export let label: string;
  export let name: string;
  export let id: string;
  export let value: string;
  export let filled: boolean;
  export let checked: boolean;
</script>

<div class="radio-item">
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
</div>

<style>
  .radio-item {
    display: inline-block;
    position: relative;
    padding: 0 6px;
    margin: 10px 0 0;
  }

  .radio-item input[type="radio"] {
    display: none;
  }

  .radio-item label {
    color: #666;
    font-weight: normal;
  }

  .radio-item label:before {
    content: " ";
    display: inline-block;
    position: relative;
    top: 5px;
    margin: 0 5px 0 0;
    width: var(--szot-radio-size, 16px);
    height: var(--szot-radio-size, 16px);
    border-radius: calc(var(--szot-radio-size, 16px)/2);
    border: 2px solid var(--szot-radio-color, var(--szot-border-color, #5f5f5f));
    background-color: transparent;
  }

  .radio-item input[type="radio"]:checked + label:after {
    width: calc(var(--szot-radio-size, 16px) - 8px);
    height: calc(var(--szot-radio-size, 16px) - 8px);
    border-radius: calc(var(--szot-radio-size, 16px)/2);
    position: absolute;
    top: 9px;
    left: 10px;
    content: " ";
    display: block;
    background: var(--szot-radio-color, var(--szot-border-color, #5f5f5f));
  }

  .filled:checked + label:before {
    background-color: var(
      --szot-radio-color,
      var(--szot-border-color, #5f5f5f)
    );
  }
</style>
