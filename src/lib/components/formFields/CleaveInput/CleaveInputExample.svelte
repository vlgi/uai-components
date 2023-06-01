<script lang="ts">
import type { ComponentProps } from "svelte";
import Form from "../../Form/Form.svelte";
import CleaveInput from "./CleaveInput.svelte";

// Force this example extend the base component interface, so we can use the
// spreed of restProps, instead of declare again all component interface manually.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type $$Props = ComponentProps<CleaveInput>

// Used to force $$restProps be of type ComponentProps<Button>;
$: restProps = $$restProps as ComponentProps<CleaveInput>;

let inputComponent;

let inputValue = "";

</script>
<!--
  Ver porque estava dando loop infinito quando o form estava em volta do
  CleaveInput
  <Form bind:values bind:isAllValid>
  </Form>
-->
<CleaveInput
  bind:this={inputComponent}
  bind:inputElement={restProps.inputElement}
  bind:isValid={restProps.isValid}
  bind:value={restProps.value}
  {...restProps}
/>

<p>
  <b>isValid:</b> { restProps.isValid }
</p>
<p>
  <b>value:</b> { JSON.stringify(restProps.value) }
</p>

<b>change value</b>
<input type="text" bind:value={inputValue} />
<button
  on:click={() => {
    restProps.value = inputValue;
  }}
>
  change value
</button>
