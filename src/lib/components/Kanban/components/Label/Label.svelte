<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { isTruthy } from "$helpers/truthy";
  import Button from "$components/formFields/Button/Button.svelte";

  // defines if the label is collapsed or not
  export let isOpened = true;

  /*
    Displays the delete and edit buttons.
    Note: when the buttons are being displayed the label is not collapsed.
  */
  export let showButtons = false;

  // textColor and backgroundColor must be in the hex format #FFFFFF
  export let labelData: {
    text: string;
    textColor?: string;
    backgroundColor?: string;
  };

  const dispatch = createEventDispatcher<{
    deleteLabel: typeof labelData;
    editLabel: typeof labelData;
  }>();

  function toogleLabel() {
    if (!showButtons) {
      isOpened = !isOpened;
    }
  }

  function hasButtonsSlot(): boolean {
    return isTruthy(($$slots as { buttons: unknown }).buttons);
  }

  function editLabel() {
    dispatch("editLabel", labelData);
  }

  function deleteLabel() {
    dispatch("deleteLabel", labelData);
  }
</script>

<div
  class="label"
  style="
    --background:{labelData?.backgroundColor || '#FFFFFF'};
    --cursor:{showButtons ? 'auto' : 'pointer'}
  "
  on:keyup={toogleLabel}
  on:click={toogleLabel}
>
  {#if isOpened || showButtons}
    <div class="label-body">
      <div>
        <p
          class="text"
          style="--color:{labelData?.textColor || '#000000'}"
        >
          {labelData?.text || ""}
        </p>
      </div>
      {#if showButtons}
        <div
          class="buttons"
          style="--uai-button-color:{labelData?.textColor || '#000000'}"
        >
          {#if !hasButtonsSlot()}
            <Button
              size="round"
              icon="mdi:pencil"
              on:click={editLabel}
            />
            <Button
              size="round"
              icon="jam:trash"
              on:click={deleteLabel}
            />
          {:else}
            <!-- allows to replace the buttons of the label -->
            <slot name="buttons" />
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  .label {
    min-height: 0.6rem;
    border-radius: var(--uai-label-border-radius, 1.5rem);
    padding: var(--uai-label-padding, 0.2rem 1rem);

    background: var(--background);
    cursor: var(--cursor);
  }

  .label-body {
    display: var(--uai-label-body-display, flex);
    justify-content: space-between;
    align-items: center;
  }

  .text {
    color: var(--color);
  }

  .buttons {
    --uai-button-background-color: transparent;
    --uai-button-border-color: transparent;
    --uai-button-border: none;
  }
</style>
