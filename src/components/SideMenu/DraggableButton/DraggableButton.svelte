<script lang="ts">
  import Hammer from "hammerjs";
  import { onMount } from "svelte";

  // true if user is dragging the button
  export let panIsActive = false;
  // this is the tag button element
  export let elBtn: HTMLButtonElement | null = null;

  /* global HammerManager */
  let hammertime: HammerManager;

  function positionButton() {
    // position mobile button to be inside the screen
    const p = elBtn.getBoundingClientRect();
    elBtn.style.left = `${p.left}px`;
    elBtn.style.top = `${p.top}px`;
  }

  /* global HammerInput */
  function onPanToggleBtn(ev: HammerInput) {
    if (
      window.innerWidth < ev.center.x
    || window.innerHeight < ev.center.y
    || ev.center.x < 0
    || ev.center.y < 0
    ) return;

    elBtn.style.top = `${ev.center.y}px`;
    elBtn.style.left = `${ev.center.x}px`;
  }

  function setBtnPan() {
    hammertime = new Hammer(elBtn);
    hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on("pan", onPanToggleBtn);
    hammertime.on("panstart", () => {
      panIsActive = true;
    });
    hammertime.on("panend", () => setTimeout(() => {
      panIsActive = false;
    }, 250));
  }

  onMount(() => {
    setBtnPan();
    positionButton();
  });
</script>

<button
  class="mobile-toggle-btn"
  class:mobile-toggle-btn--dragging={ panIsActive }
  bind:this={ elBtn }
  on:click
>
  <slot/>
</button>

<style lang="scss">
  .mobile-toggle-btn {
    background-color: var(--theme-dark-surface);
    border-radius: 100%;
    border: none;
    height: 3rem;
    width: 3rem;
    position: fixed;
    transform: translate(-50%, -50%);
    bottom: -1.5rem;
    right: -1.5rem;
    color: var(--theme-txt-on-dark-surface);
    cursor: pointer;
    box-shadow: var(--theme-low-shadow);
    z-index: 100;
  }
</style>
