<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Modal from "../Modal/Modal.svelte";
  import Button from "../formFields/Button/Button.svelte";
  import Icon from "../Icon/Icon.svelte";

  type TDialogTypes = "confirm"|"confirmCancel"|"info"|"error"|"warning"|"success";
  type TSignalsIconAndPrefix = { icon: string, prefix: string } | null;

  // open the dialog
  export let opened = false;

  // disable close on click out or press "Escape"
  export let disableCloseOnEvents = true;

  // shows the dialog header (if info/warning/.. is always true)
  export let showHeader = false;

  // the title to be displayed (you can use the slot instead)
  export let title = "";

  // the text to be displayed (you can use the slot instead)
  export let content = "";

  // the text for the confirm button
  export let confirmButtonTxt = "Confirmar";
  // the text for the cancel button
  export let cancelButtonTxt = "Cancelar";
  // the text for the info/warning/error/success buttons
  export let othersButtonTxt = "Ok";

  /**
   * The dialog types
   * @type {"confirm"|"confirmCancel"|"info"|"error"|"warning"|"success"}
   * */
  export let type: TDialogTypes = "confirmCancel";

  const dispatch = createEventDispatcher();

  let typeIsOthers = false;
  let signalsIconAndPrefix: TSignalsIconAndPrefix = null;

  // used to prevent events be fired twice, because on:closeModal fire close event
  let blockSendEvent = false;

  function sendConfirm() {
    if (blockSendEvent) return;
    blockSendEvent = true;

    opened = false;

    // fired when click on `confirm` button or `ok` button (displayed with "info", "warning", ...)
    dispatch("confirm");
  }

  function sendCancel() {
    if (blockSendEvent) return;
    blockSendEvent = true;

    opened = false;
    /**
     * fired when click on `cancel` button or `x` or pressed `Esc`/`clickOut`
     * if `disableCloseOnEvents` is false
    */
    dispatch("cancel");
  }

  function haveSlot(key: string) {
    return ($$slots as Record<string, boolean>)[key];
  }

  function getSignalsIconAndPrefix(key: string): TSignalsIconAndPrefix {
    const signalsMap: Record<string, TSignalsIconAndPrefix> = {
      info: { icon: "information", prefix: "Info: " },
      warning: { icon: "alert", prefix: "Aviso: " },
      error: { icon: "close-circle", prefix: "Erro: " },
      success: { icon: "check-circle", prefix: "Sucesso: " },
    };

    if (signalsMap[key]) return signalsMap[key];
    return null;
  }

  $: typeIsOthers = ["warning", "info", "error", "success"].includes(type);
  $: if (typeIsOthers) {
    showHeader = true;
    signalsIconAndPrefix = getSignalsIconAndPrefix(type);
  }

  // reset the block send event mechanism when dialog open
  $: if (opened) {
    blockSendEvent = false;
  }
</script>

<div class="d-content dialog-wrapper dialog-type-{type}" role="dialog" aria-hidden={!opened}>
  <Modal
    bind:opened
    closeOnClickOut={!disableCloseOnEvents}
    closeOnEsc={!disableCloseOnEvents}
    on:closeModal={sendCancel}
    disableHeader={!showHeader}
  >
    <div class="d-content" slot="modal-header">
      {#if haveSlot("dialog-header")}
        <!-- you can change the default title, and add anything like in the modal -->
        <slot name="dialog-header"></slot>
      {:else}
        <span class="title">
          {#if signalsIconAndPrefix}
            <Icon iconName={signalsIconAndPrefix.icon}/>
            {signalsIconAndPrefix.prefix}
          {/if}
          {title}
        </span>
      {/if}
    </div>

    <div class="d-content" slot="modal-content">
      {#if haveSlot("dialog-content")}
        <!-- you can change the default content -->
        <slot name="dialog-content"></slot>
      {:else}
        <p class="content">{content}</p>
      {/if}
    </div>

    <div class="d-content" slot="modal-footer">
      {#if haveSlot("dialog-footer")}
        <!-- you can change the default buttons -->
        <slot name="dialog-footer"></slot>
      {:else}

        <!-- Buttons -->
        <div class="button-container">
          {#if type === "confirm" || type === "confirmCancel"}
            <Button
              buttonStyle="dark"
              buttonStyleType="outline"
              size="small"
              on:click={sendConfirm}
            >
              {confirmButtonTxt}
            </Button>
          {/if}

          {#if type === "confirmCancel"}
            <Button
              buttonStyle="dark"
              buttonStyleType="filled"
              size="small"
              on:click={sendCancel}
            >
              {cancelButtonTxt}
            </Button>
          {/if}

          {#if typeIsOthers}
            <Button
              buttonStyle="dark"
              buttonStyleType="filled"
              size="small"
              on:click={sendConfirm}
            >
              {othersButtonTxt}
            </Button>
          {/if}
        </div>
        <!-- /Buttons -->

      {/if}
    </div>
  </Modal>
</div>

<style lang="scss">

  @use 'src/styles/mixins' as m;
  .dialog-wrapper {
    --txt-color: var(--szot-dialog-text-color, var(--theme-txt-on-signal-color));
  }

  /** Change modal bg color */
  .dialog-type-error {
    --txt-color: var(--theme-error);
    --txt-weight: bold;
  }
  .dialog-type-warning {
    --txt-color: var(--theme-warning);
    --txt-weight: bold;
  }
  .dialog-type-info {
    --txt-color: var(--theme-info);
    --txt-weight: bold;
  }
  .dialog-type-success {
    --txt-color: var(--theme-success);
    --txt-weight: bold;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    gap: 1rem;
  }

  .d-content {
    display: contents;
  }

  .title, .content {
    --szot-icon-color: var(--txt-color);
    @include m.text-color(var(--txt-color));
    font-weight: var(--txt-weight, var(--theme-p-font-weight));
  }
</style>
