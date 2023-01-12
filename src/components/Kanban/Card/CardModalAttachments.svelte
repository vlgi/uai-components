<script lang="ts">
  import { texts } from "../data/components-texts";
  import { getCover, getFilenameFromUrl } from "../utils";
  import { onDestroy, onMount } from "svelte";

  // stores
  import { lang, logged } from "../stores";

  import { isImage } from "../utils";

  // components
  import Icon from "../../Icon/Icon.svelte";
  import Modal from "../../Modal/Modal.svelte";
  import Button from "../../formFields/Button/Button.svelte";
  import ThumbPreview from "./ThumbPreview.svelte";

  export let data;
  export let showAdd = false;
  export let isCover = false;

  let inpt;

  function removeAtt(i: number, arr) {
    const atts = [...arr];
    atts.splice(i, 1);
    return atts;
  }

  function getFile(e): void {
    const files = Array.from(e.target.files).map((f) => URL.createObjectURL(f));
    filesPath = [...filesPath, ...files];
  }

  function addFiles(): void {
    const files = filesPath.map((f) => {
      return {
        url: f,
        date: new Date(),
        user: { ...$logged.user },
        isCover,
      };
    });
    for (let index = 0; index < data.length; index++) {
      if (data[index].isCover) data[index].isCover = false;
      break;
    }
    data = [...data, ...files];
    filesPath = [];
  }

  function handleInputEl() {
    showAdd = false;
  }

  function initializeInput() {
    document.body.onfocus = handleInputEl;
  }

  function makeCover(i: number): void {
    for (let index = 0; index < data.length; index++) {
      if (data[index].isCover) data[index].isCover = false;
    }
    data[i].isCover = true;
  }

  onDestroy(() => {
    document.body.removeEventListener("onfocus", handleInputEl);
  });

  onMount(() => {
    inpt = document.getElementById(`input-files-id`);
  });

  $: openAlertModal = false;
  $: indexToDelete = -1;
  $: filesPath = [];
  $: if (showAdd) inpt.click();
</script>

<input
  type="file"
  id="input-files-id"
  multiple
  on:change={getFile}
  on:click={initializeInput}
/>

<Modal bind:opened={openAlertModal} --szot-modal-width="500px">
  <div slot="modal-header" class="header" />
  <div slot="modal-content" class="content remove-alert">
    <h3>{texts.removeAttachmentAlert[$lang]}</h3>
  </div>
  <div slot="modal-footer" class="footer modal-alert-footer">
    <Button
      on:click={() => (openAlertModal = false)}
      size="small"
      buttonStyleType="outline"
      buttonStyle="dark"
    >
      <span>{texts.cancel[$lang]}</span>
    </Button>
    <Button
      --szot-button-background-color="#CF513D"
      size="small"
      buttonStyleType="filled"
      buttonStyle="dark"
      on:click={() => {
        data = removeAtt(indexToDelete, data);
        openAlertModal = false;
      }}
    >
      <span>{texts.removeAttachment[$lang]}</span>
    </Button>
  </div>
</Modal>

{#if data.length > 0}
  <div class="section-title">
    <Icon iconName="attachment" --szot-icon-font-size="20px" />
    <h2>{texts.attachments[$lang]}</h2>
    <div class="item-btn" on:click={() => inpt.click()}>
      <Icon iconName="plus" />
    </div>
  </div>
{/if}

{#if filesPath.length > 0}
  <div class="att-adding-container">
    {#if filesPath.length > 0}
      <div class="thumbs-container">
        {#each filesPath as file, fi}
          <div class="thumb-preview">
            <div
              class="item-btn"
              on:click={() => (filesPath = removeAtt(fi, filesPath))}
            >
              <Icon iconName="trash-can-outline" />
            </div>
            <ThumbPreview
              bind:file
              radius="var(--radius-pattern)"
              w="250px"
              h="140px"
            />
          </div>
        {/each}
      </div>
    {/if}
    <div class="att-adding-btns">
      <Button
        size="small"
        buttonStyleType="outline"
        buttonStyle="dark"
        on:click={() => (filesPath = [])}
      >
        {texts.cancel[$lang]}
      </Button>
      <Button
        size="small"
        buttonStyleType="filled"
        buttonStyle="dark"
        disabled={filesPath.length == 0}
        on:click={addFiles}
      >
        {texts.add[$lang]}
      </Button>
    </div>
  </div>
{/if}

{#each data as att, index}
  <div class="attachment-container">
    <a class="attachment-thumbnail" href={att.url} target="_blank">
      <ThumbPreview
        file={att.url}
        radius="var(--radius-pattern)"
        w="125px"
        h="70px"
      />
    </a>
    <div class="attachment-info">
      <span>{getFilenameFromUrl(att.url)}</span>
      {#if att.user.name != ""}
        <span>{texts.addedBy[$lang]}: {att.user.name}</span>
      {/if}
      <span>{att.date}</span>
    </div>
    <div class="att-btns-container">
      <div
        class="item-btn"
        title={texts.remove[$lang]}
        on:click={() => {
          openAlertModal = true;
          indexToDelete = index;
        }}
      >
        <Icon iconName="trash-can-outline" />
      </div>
      {#if !att.isCover}
        <div
          class="item-btn"
          title={texts.cover[$lang]}
          on:click={() => makeCover(index)}
        >
          <Icon iconName="image" />
        </div>
      {/if}
    </div>
  </div>
{/each}

<style lang="scss">
  @import "./card-modal.scss";

  #input-files-id {
    display: none;
  }

  .att-adding-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: var(--target-padding);

    .att-adding-input {
      width: 100%;
    }

    .att-adding-btns {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      gap: 5px;
    }
  }

  .thumbs-container {
    display: flex;
    gap: 5px;
    width: 100%;
    overflow-x: auto;

    .thumb-preview {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      &:hover {
        .item-btn {
          display: block;
        }
      }

      .item-btn {
        margin: auto 5px -30px auto;
        background-color: white;
        z-index: 2;
        display: none;

        &:hover {
          background-color: #eee;
        }
      }
    }
  }

  .attachment-container {
    @media only screen and (min-width: 0px) {
      --attachment-container-grid-template-areas: "thumb info" "btns btns";
      --attachment-container-grid-template-columns: 125px calc(100% - 135px);
      --att-btns-container-display: flex;
    }
    @media only screen and (min-width: 1024px) {
      --attachment-container-grid-template-areas: "thumb info btns";
      --attachment-container-grid-template-columns: 125px calc(100% - 185px)
        50px;
      --att-btns-container-display: none;
    }

    display: grid;
    grid-template-areas: var(--attachment-container-grid-template-areas);
    grid-template-columns: var(--attachment-container-grid-template-columns);
    align-items: center;
    justify-items: center;
    gap: 10px;
    margin-bottom: 5px;
    box-shadow: var(--box-shadow-pattern);
    padding: calc(var(--target-padding) / 2) 0;

    &:hover {
      background-color: #eee;
      cursor: pointer;
      .att-btns-container {
        display: flex;
      }
    }

    .att-btns-container {
      grid-area: btns;
      display: var(--att-btns-container-display);
      justify-content: flex-end;
      align-items: flex-end;
      height: 100%;
      width: 100%;
      margin-right: 20px;
      .item-btn {
        height: fit-content;
      }
    }

    .attachment-thumbnail {
      text-decoration: none;
      grid-area: thumb;
    }

    .attachment-info {
      grid-area: info;
      display: flex;
      flex-direction: column;
      width: 100%;

      span {
        font-size: 13px;
        word-wrap: break-word;
      }

      span:first-child {
        font-size: 15px;
        font-weight: 800;
      }
    }
  }
</style>
