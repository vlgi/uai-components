<script>

import Form from "../../Form/Form.svelte";
import CleaveInput from "./CleaveInput.svelte";

export let inputElement;
export let isValid;
export let isAllValid;
export let value;
export let values;
/**
 * @type {CleaveInput}
 */
export let inputComponent;

let inputValue = "";

</script>

<Form bind:values bind:isAllValid>
  <CleaveInput
    bind:this={inputComponent}
    bind:inputElement
    bind:isValid
    bind:value
    {...$$restProps}
  />
</Form>

<p>
  <b>isValid:</b> { isValid }
</p>
<p>
  <b>value:</b> { JSON.stringify(value) }
</p>
<p>
  <b>isAllValid:</b> { isAllValid }
</p>
<p>
  <b>Form values:</b> { JSON.stringify(values) }
</p>

<b>change value</b>
<input type="text" bind:value={inputValue} />
<button
  on:click={() => {
    value = +inputValue;
  }}
>
  change value
</button>
