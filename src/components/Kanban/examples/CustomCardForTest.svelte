<script lang="ts">
  export let data;
  $: showTags = false;
  $: showTags &&
    setTimeout(() => {
      showTags = false;
    }, 5000);
</script>

<div class="custom-card-container">
  <div class="header">
    <h2
      class="editable"
      contenteditable="true"
      bind:textContent={data.title}
      on:focus={() => (showTags = true)}
    />
    <span on:click|self={() => alert("clicked")}>...</span>
  </div>
  {#if showTags || data.desc != ""}
    <div
      class="desc editable"
      contenteditable="true"
      bind:textContent={data.description}
      on:focus={() => (showTags = true)}
    />
  {/if}
  {#if showTags || data.text != ""}
    <div
      class="text editable"
      contenteditable="true"
      bind:textContent={data.text}
      on:focus={() => (showTags = true)}
    />
  {/if}
</div>

<style lang="scss">
  .custom-card-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: white;

    .editable {
      padding: 3px 8px;
      border: solid 2px transparent;
      outline: none;
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }

      &:focus {
        background: white;
        color: black;
        border: solid 2px lightcoral;
      }
    }

    .desc,
    .text {
      text-align: justify;
    }

    .header {
      display: flex;
      width: 100%;
      justify-content: space-between;

      h2,
      span {
        background: #2f3675;
      }

      h2 {
        font-size: 15px;
        width: 100%;
      }
      span {
        padding: 0 5px;
        cursor: pointer;
        &:hover {
          background: #464d8e;
        }
      }
    }

    .desc {
      background: #315594;
      font-size: 12px;
    }

    .text {
      background: #70a6c1;
      font-size: 10px;
    }
  }
</style>
