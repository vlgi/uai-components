<script lang="ts">
  import Input from "../../formFields/Input/Input.svelte";
  import Form from "../Form.svelte";

  export let values: Record<string, unknown>;
  export let isAllValid: boolean;

  let fireSubmit: ()=> Promise<void>;
</script>

<p>
  This form will be trigged by a function.
</p>
<br />
<hr>
<br />

<Form
  bind:fireSubmit
  bind:values
  bind:isAllValid
  on:submit
  id="my-unique-form"
>
  <Input
    label="email"
    name="email"
    type="email"
    required={true}
  />
</Form>

<button on:click={fireSubmit}>Fire submit from function</button>

<div>
  <br />
  <hr />
  <br />
  <br />
  <p><b>Form Values:</b> {JSON.stringify(values)}</p>
  <p><b>Form valid:</b> {isAllValid}</p>
</div>
