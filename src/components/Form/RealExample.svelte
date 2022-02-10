<script lang="ts">
  import Input from "./InputExample.svelte";
  import Button from "../formFields/Button/Button.svelte";
  import Form from "./Form.svelte";

  export let values: Record<string, unknown>;
  export let isAllValid: boolean;
</script>

<div>
  <h1>Real Form Usage Example</h1>
  <p>
    This form use our real components,
    and shows an example using all possible form fields
  </p>
  <br><hr><br>
</div>

<Form bind:values bind:isAllValid on:submit>
  <Input name="input-name"/>
  <br>
  <Button type="submit">Submit</Button>
</Form>

<p><b>Form Values:</b> { JSON.stringify(values) }</p>
<p><b>Form valid:</b> { isAllValid }</p>
