<script lang="ts">
  export let data;
</script>

<div class="custom-card-container">
  <h2>{data.title}</h2>
  {#if data.description}<div class="desc">{data.description}</div>{/if}
  {#if data.text}<div class="text">{data.text}</div>{/if}
</div>

<style lang="scss">
  .custom-card-container {
    color: white;

    h2,
    .text,
    .desc {
      padding: 5px 10px;
    }

    h2 {
      background: #2f3675;
    }

    .desc,
    .text {
      text-align: justify;
    }

    .desc {
      background: #315594;
      font-size: 16px;
    }

    .text {
      background: #70a6c1;
      font-size: 13px;
    }
  }
</style>
