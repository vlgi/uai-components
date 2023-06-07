<script lang="ts">
  import Input from "./CustomInputExample.svelte";
  import Button from "./CustomButtonExample.svelte";
  import Form from "../Form.svelte";

  export let values: Record<string, unknown>;
  export let isAllValid: boolean;
</script>

<Form
  bind:values
  bind:isAllValid
  on:submit
>
  <Input name="input-name" />
  <br />
  <Button />
</Form>

<p><b>Form Values:</b> {JSON.stringify(values)}</p>
<p><b>Form valid:</b> {isAllValid}</p>
