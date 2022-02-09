<script lang="ts">
  import Input from "./InputExample.svelte";
  import Button from "./ButtonExample.svelte";
  import Form from "./Form.svelte";

  export let values: Record<string, unknown>;
  export let isAllValid: boolean;
</script>

<Form bind:values bind:isAllValid>
  <Input name="input-name"/>
  <br>
  <Button/>
</Form>

<p><b>Form Values:</b> { JSON.stringify(values) }</p>
<p><b>Form valid:</b> { isAllValid }</p>

<style lang="scss">
</style>
