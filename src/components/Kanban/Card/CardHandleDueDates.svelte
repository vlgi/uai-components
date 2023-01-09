<script lang="ts">
  import { onMount } from "svelte";
  import type { TCard, TDueDates, TCardChecklistItem } from "../data/types";
  import { texts } from "../data/components-texts";
  import { dateObjToHtmlString } from "../utils";

  // store
  import { lang } from "../stores";

  // props
  export let data: TCard | TCardChecklistItem;
  export let opened = false; // card handle colors modal opened boolean
  export let title: string;

  // components
  import Modal from "../../Modal/Modal.svelte";
  import Icon from "../../Icon/Icon.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import Input from "../../formFields/Input/Input.svelte";

  let oldData: TDueDates;
  let newData: TDueDates;

  function handleDates(e): void {
    newData[e.target.name] = new Date(`${e.target.value}`);
    // opened = false;
  }

  function cancelAdding() {
    opened = false;
    data.dates = { ...oldData };
  }

  onMount(() => {
    oldData = { ...data.dates };
    newData = { ...data.dates };
  });

  $: boolText =
    data.dates.startDate || data.dates.dueReminder || data.dates.dueDate;
</script>

<Modal bind:opened --szot-modal-width="400px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content">
    <h3>{title}:</h3>
    <div>{data.title}</div>
    <Input
      name="startDate"
      label={texts.startDate[$lang]}
      type="datetime-local"
      value={dateObjToHtmlString(data.dates.startDate, "pt-BR")}
      on:change={handleDates}
    />
    <Input
      name="dueDate"
      label={texts.dueDate[$lang]}
      type="datetime-local"
      value={dateObjToHtmlString(data.dates.dueDate, "pt-BR")}
    />
    <Input
      name="reminderDate"
      label={texts.reminderDate[$lang]}
      type="datetime-local"
      value={dateObjToHtmlString(data.dates.dueReminder, "pt-BR")}
      on:change={handleDates}
    />
  </div>
  <div slot="modal-footer" class="footer modal-alert-footer">
    <Button
      on:click={cancelAdding}
      size="medium"
      buttonStyleType="outline"
      buttonStyle="dark"
      on:change={handleDates}
    >
      {texts.cancel[$lang]}
    </Button>
    <Button
      on:click={() => {
        opened = false;
        oldData = { ...newData };
        data.dates = { ...newData };
      }}
      size="medium"
      buttonStyleType="filled"
      buttonStyle="dark"
    >
      {#if boolText}{texts.edit[$lang]}{/if}
      {#if !boolText}{texts.add[$lang]}{/if}
    </Button>
  </div>
</Modal>

<style lang="scss">
  .content {
    h3 {
      padding: 10px 0;
    }

    div {
      padding: 10px;
      width: 100%;
      background: #eee;
      margin-bottom: 20px;
      border-radius: var(--radius-pattern);
    }
  }
</style>
