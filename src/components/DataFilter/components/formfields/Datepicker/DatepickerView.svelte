<script lang="ts">
  import Datepicker from "./Datepicker.svelte";
  import { EPickerType } from "./types";

  export let pickerType = EPickerType.date;
  export let value = "";
</script>

<Datepicker
  label="My Picker Label"
  name="my-picker-name"
  { pickerType }
  bind:value
/>

<br><br><hr><p>
  The rows bellow don't belong to datepicker component, is just for doc.
</p><hr><br>

<p>
  Value: { value }
</p>
<p>
</p>

<style lang="scss">

</style>
