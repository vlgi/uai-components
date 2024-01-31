<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "$components/formFields/Button/Button.svelte";
  import Input from "$components/formFields/Input/Input.svelte";
  import Modal from "$components/Modal/Modal.svelte";
  import PickerColor from "../../../PickerColor/PickerColor.svelte";

  export let opened = false;

  // textColor and backgroundColor must be in the hex format #FFFFFF
  export let labelData: {
    text: string;
    backgroundColor: string;
    textColor: string;
  };

  let isDark = false;

  const dispatch = createEventDispatcher<{
    submit: typeof labelData;
  }>();

  $: if (isDark) {
    labelData.textColor = "#ffffff";
  } else {
    labelData.textColor = "#000000";
  }

  function submit() {
    dispatch("submit", labelData);
  }
</script>

<div class="container">
  <Modal
    bind:opened
    on:closeModal
    closeOnClickOut={false}
    closeOnEsc={false}
  >
    <div
      class="modal-header"
      slot="modal-header"
    >
      <span>Editar Etiqueta</span>
    </div>
    <div
      slot="modal-content"
      class="modal-content"
      style="
        --uai-input-text-color: {labelData?.textColor || '#000000'};
        --uai-input-placeholder-color: {isDark ? '#ffffffa1' : '#00000090'}
      "
    >
      <div class="label">
        <div
          class="input"
          style="--background:{labelData?.backgroundColor || '#FFFFFF'}"
        >
          <Input
            bind:value={labelData.text}
            name="label-text"
            placeholder="texto"
          />
        </div>
      </div>
      <PickerColor
        bind:hex={labelData.backgroundColor}
        bind:isDark
      />
    </div>

    <div
      class="footer"
      slot="modal-footer"
    >
      <Button on:click={submit}>Salvar</Button>
    </div>
  </Modal>
</div>

<style lang="scss">
  .container {
    --uai-modal-width: var(--uai-edit-label-width, 25rem);
    --uai-modal-height: var(--uai-edit-label-height, 25rem);

    --uai-input-margin-top: var(--uai-edit-label-input-margin-top, 0);
    --uai-input-margin-bottom: var(--uai-edit-label-input-margin-bottom, 0);

    --uai-input-border: var(--uai-edit-label-input-border, none);
    --uai-input-border-radius: var(--uai-edit-label-border-radius, 1.5rem);
    --uai-input-border-color: var(--uai-edit-label-input-border-color, transparent);

    .modal-content {
      display: grid;
      grid: 0.2fr 1fr / 1fr;
      gap: 1rem;
    }

    .modal-header {
      padding: 0 0.5rem;
    }

    .label {
      border-radius: var(--uai-edit-label-border-radius, 1.5rem);
    }

    .input {
      background: var(--background);
      border-radius: var(--uai-edit-label-border-radius, 1.5rem);
    }

    .footer {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
