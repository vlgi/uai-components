<script lang="ts">
  import { format } from "date-fns";
  import Input from "../formFields/Input/Input.svelte";

  type TinputStyle = "primary" | "secondary" | "dark" | "light";
  type Tpresentation = "date" | "date-time" | "month" | "month-year" | "time" | "time-date" | "year";

  /** choose default theme colors */
  export let inputStyle: TinputStyle = "primary";
  export let icon = "calendar";
  /** picker display format */
  export let presentation: Tpresentation = "date";
  /** date with formatting */
  export let value = null;
  /** minimum date to select */
  export let min: string = null;
  /** maximum date to select */
  export let max: string = null;
  /** unformatted date (read-only) */
  export let output: Date = null;
  /** picker confirmation text */
  export let doneText = "Confirmar";
  /** picker cancel text */
  export let cancelText = "Cancelar";
  /** date format in input */
  export let formatDate = "dd/MM/yyyy";


  const updateDate = (event: InputEvent) => {
    const data = (event.target as HTMLInputElement).value;
    value = format(new Date(data), formatDate);
    output = new Date(data);
  };

</script>
<!-- Datetime in popover with input -->
<div>
    <Input
    {inputStyle}
    {...$$restProps}
    bind:value
    id="open-popover"
    {icon}
    />
    <ion-popover trigger="open-popover" show-backdrop="false">
      <ion-datetime
      color={inputStyle}
      {min}
      {max}
      {presentation}
      done-text={doneText}
      cancel-text={cancelText}
      mode="md"
      show-default-buttons={true}
      id="popover-datetime-2"
      on:ionChange={updateDate}/>
    </ion-popover>
</div>

<style lang="scss">
  ion-popover {
    height: 30rem;
  }
  ion-datetime {
    --ion-safe-area-right: 0;
  }

</style>
