<script lang="ts">
  import Input from "../../formFields/Input/Input.svelte";
  import Form from "../Form.svelte";
  import Button from "../../formFields/Button/Button.svelte";

  export let values: Record<string, unknown>;
  export let isAllValid: boolean;
</script>

<p>This form will be trigged by a function.</p>
<br />
<hr />
<br />

<Form
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

<Button form="my-unique-form">Fire submit from outside the Form Component</Button>

<div>
  <br />
  <hr />
  <br />
  <br />
  <p><b>Form Values:</b> {JSON.stringify(values)}</p>
  <p><b>Form valid:</b> {isAllValid}</p>
</div>
