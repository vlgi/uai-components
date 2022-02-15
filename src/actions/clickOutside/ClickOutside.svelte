<script>
  import { actionOutClick } from "./clickOutside";

  let showModal = true;

  function open() {
    showModal = true;
  }

  function close() {
    showModal = false;
  }
</script>

<button on:click={open}>Show Modal</button>
{#if showModal}
	<div class="box" use:actionOutClick on:actionOutClick={close}>
		Click outside me!
	</div>
{/if}

<style>
	.box {
		--width: 100px;
		--height: 100px;
		position: absolute;
		width: var(--width);
		height: var(--height);
		left: calc(50% - var(--width) / 2);
		top: calc(50% - var(--height) / 2);
		border-radius: 4px;
		background-color: #ff3e00;
		color: #fff;
		text-align: center;
		font-weight: bold;
	}
</style>
