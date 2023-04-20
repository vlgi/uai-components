<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Modal from "../Modal/Modal.svelte";
  import Button from "../formFields/Button/Button.svelte";
  import Icon from "../Icon/Icon.svelte";

  type TDialogTypes = "confirm"|"confirmCancel"|"info"|"error"|"warning"|"success";

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
   * If true, hide close button in the modal
   * @type {boolean}
   */
  export let hideCloseButton = false;

  /**
   * The dialog types
   * @type {"confirm"|"confirmCancel"|"info"|"error"|"warning"|"success"}
   * */
  export let type: TDialogTypes = "confirmCancel";

  const dispatch = createEventDispatcher();

  let typeIsOthers = false;
  let signalsIcon: string = null;

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

  function getSignalsIcon(key: string): string {
    const signalsMap: Record<string, string> = {
      info: "ph:info-fill",
      warning: "mingcute:warning-fill",
      error: "mingcute:close-circle-fill",
      success: "material-symbols:check-circle-rounded",
    };

    if (signalsMap[key]) return signalsMap[key];
    return null;
  }

  $: typeIsOthers = ["warning", "info", "error", "success"].includes(type);
  $: if (typeIsOthers) {
    showHeader = true;
    signalsIcon = getSignalsIcon(type);
  }

  // reset the block send event mechanism when dialog open
  $: if (opened) {
    blockSendEvent = false;
  }
</script>

<div class="d-content dialog-wrapper dialog-wrapper-container dialog-type-{type}" role="dialog" aria-hidden={!opened}>
  <Modal
    bind:opened
    closeOnClickOut={!disableCloseOnEvents}
    closeOnEsc={!disableCloseOnEvents}
    on:closeModal={sendCancel}
    disableHeader={!showHeader}
    {hideCloseButton}
  >
    <div class="d-content" slot="modal-header">
      {#if haveSlot("dialog-header")}
        <!-- you can change the default title, and add anything like in the modal -->
        <slot name="dialog-header"></slot>
      {:else}
        <div class="title-container">
          {#if signalsIcon}
            <Icon iconName={signalsIcon}/>
          {/if}
          <span class="title">
            {title}
          </span>
        </div>
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
        <!--
          NOTE: the last rendered button will have the autofocus enabled
          that means: others > cancel > confirm
        -->
        <div class="button-container">
          {#if type === "confirm" || type === "confirmCancel"}
            <div class="confirm-button-container">
              <Button
                buttonStyle="dark"
                buttonStyleType="filled"
                size="small"
                buttonAttributes={{
                  autofocus: true,
                }}
                on:click={sendConfirm}
              >
                {confirmButtonTxt}
              </Button>
            </div>
          {/if}

          {#if type === "confirmCancel"}
            <div class="cancel-button-container">
              <Button
                buttonStyle="dark"
                buttonStyleType="outline"
                size="small"
                buttonAttributes={{
                  autofocus: true,
                }}
                on:click={sendCancel}
              >
                {cancelButtonTxt}
              </Button>
            </div>
          {/if}

          {#if typeIsOthers}
            <div class="others-button-container">
              <Button
                buttonStyle="dark"
                buttonStyleType="filled"
                size="small"
                buttonAttributes={{
                  autofocus: true,
                }}
                on:click={sendConfirm}
              >
                {othersButtonTxt}
              </Button>
            </div>
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
    --txt-header-color: var(--szot-dialog-text-color-header, var(--theme-txt-on-signal-color));
    --txt-weight: var(--szot-dialog-text-weight, 400);
    --txt-header-weight: var(--szot-dialog-text-weight-header, 700);
    --txt-header-size: var(--szot-dialog-text-size-header, 0.875rem);
    --txt-size: var(--szot-dialog-text-size, 0.8125rem);
  }

  /** Change modal bg color */
  .dialog-type-error {
    --txt-color: var(--theme-error);
    --txt-header-color: var(--theme-error);
  }
  .dialog-type-warning {
    --txt-color: var(--theme-warning);
    --txt-header-color: var(--theme-warning);
  }
  .dialog-type-info {
    --txt-color: var(--theme-info);
    --txt-header-color: var(--theme-info);
  }
  .dialog-type-success {
    --txt-color: var(--theme-success);
    --txt-header-color: var(--theme-success);
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

  .title-container {
    --szot-icon-color: var(--txt-header-color);
    --szot-icon-font-size: 1.625rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    .title {
      @include m.text-color(var(--txt-header-color));
      font-size: var(--txt-header-size);
      font-weight: var(--txt-header-weight);
    }
  }

  .content {
    --szot-icon-color: var(--txt-color);
    @include m.text-color(var(--txt-color));
    font-size: var(--txt-size);
    font-weight: var(--txt-weight);
  }
</style>
