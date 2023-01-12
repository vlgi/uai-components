<script lang="ts">
  import { onMount } from "svelte";
  import type { TCard, TDueDates, TCardChecklistItem } from "../data/types";
  import { texts } from "../data/components-texts";
  import { dateObjToHtmlString } from "../utils";

  let empty: TDueDates = {
    startDate: null,
    dueDate: null,
    dueReminder: null,
  };
  // store

  import { lang } from "../stores";

  // props
  export let data: TCard | TCardChecklistItem;
  export let opened = false; // card handle colors modal opened boolean
  export let title: string;
  export let limits: TDueDates = { ...empty };

  // components
  import Modal from "../../Modal/Modal.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import Input from "../../formFields/Input/Input.svelte";

  let oldData: TDueDates = { ...empty };
  $: newData = { ...empty };

  function handleDates(e): void {
    newData[e.target.name] = new Date(e.target.value);
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

  $: isStartDateInvalid =
    newData.startDate > newData.dueDate ||
    (limits.dueDate != null && newData.startDate < limits.startDate);

  $: isDueDateInvalid =
    newData.dueDate < newData.startDate ||
    (limits.dueDate != null && newData.dueDate > limits.dueDate);

  $: isReminderDateInvalid =
    newData.dueReminder > newData.dueDate ||
    newData.dueReminder < newData.startDate;
</script>

<Modal bind:opened --szot-modal-width="500px" --szot-modal-max-width="90vw">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content">
    <h3>{title}:</h3>
    <div>{data.title}</div>
    <Input
      name="startDate"
      errorMsg={texts.invalidStartDate[$lang]}
      forceInvalid={isStartDateInvalid}
      inputAttributes={{
        max: dateObjToHtmlString(new Date(newData.dueDate), "pt-BR"),
        min: dateObjToHtmlString(new Date(limits.startDate), "pt-BR"),
      }}
      label={texts.startDate[$lang]}
      type="datetime-local"
      value={dateObjToHtmlString(new Date(newData.startDate), "pt-BR")}
      on:change={handleDates}
    />
    <Input
      name="dueDate"
      errorMsg={texts.invalidDueDate[$lang]}
      forceInvalid={isDueDateInvalid}
      inputAttributes={{
        max: dateObjToHtmlString(new Date(limits.dueDate), "pt-BR"),
        min: dateObjToHtmlString(new Date(limits.startDate), "pt-BR"),
      }}
      label={texts.dueDate[$lang]}
      type="datetime-local"
      value={dateObjToHtmlString(new Date(newData.dueDate), "pt-BR")}
      on:change={handleDates}
    />
    <Input
      name="dueReminder"
      errorMsg={texts.invalidReminderDate[$lang]}
      forceInvalid={isReminderDateInvalid}
      inputAttributes={{
        max: dateObjToHtmlString(new Date(newData.dueDate), "pt-BR"),
        min: dateObjToHtmlString(new Date(limits.startDate), "pt-BR"),
      }}
      label={texts.reminderDate[$lang]}
      type="datetime-local"
      value={dateObjToHtmlString(new Date(newData.dueReminder), "pt-BR")}
      on:change={handleDates}
    />
  </div>
  <div slot="modal-footer" class="footer modal-alert-footer">
    <Button
      on:click={cancelAdding}
      size="small"
      buttonStyleType="outline"
      buttonStyle="dark"
    >
      <span>{texts.cancel[$lang]}</span>
    </Button>
    <Button
      on:click={() => {
        opened = false;
        oldData = { ...newData };
        data.dates = { ...newData };
      }}
      size="small"
      buttonStyleType="filled"
      buttonStyle="dark"
    >
      {#if boolText}
        {texts.edit[$lang]}
      {:else}
        {texts.add[$lang]}
      {/if}
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
