<script lang="ts">
  import type { TCardUser } from "../data/types";

  // props
  export let data: TCardUser; // user data

  // functions
  import { returnInitialsNames } from "../utils";
</script>

<div
  class="user-avatar"
  style="background-image: url({data.photo});"
  title={`${data.name} (${data.email})`}
  on:click
>
  {#if data.photo == ""}{returnInitialsNames(data.name)}{/if}
</div>

<style lang="scss">
  .user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    background: #222;
    color: white;
    font-weight: bold;
    border-style: solid;
    border-color: white;
    border-width: 2.5px;
    background-size: cover;
    font-size: 12px;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
</style>
