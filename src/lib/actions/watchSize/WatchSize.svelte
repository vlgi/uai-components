<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { actionWatchSize } from "./watchSize";

  let fontSize = 1;
  let slowAdjust = false;
  let target = window.innerWidth / 2;
  let inlineSize: number;
  let blockSize: number;

  const dispatcher = createEventDispatcher();

  function handleResize(ev: CustomEvent<ResizeObserverSize>) {
    // Extract size data on resize
    inlineSize = ev.detail.inlineSize;
    blockSize = ev.detail.blockSize;

    // If slow adjust is on and the current width isn't within the target width by 3 pixels (so the
    // algorithm don't start an infinite loop trying to achieve an exact target value).
    if (slowAdjust && Math.abs(target - inlineSize) > 3) {
      // Adjust the font size by at most 0.01 pixels every frame/resize so the width will be the
      // target width
      fontSize += Math.min(Math.max(-0.01, target - inlineSize), 0.01);
    }
  }

  function fireActionResize(ev: CustomEvent<ResizeObserverSize>) {
    /**
     * Fired when the element resizes. The detail contains the border box size.
     * Detail is of type [ResizeObserverSize](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverSize)
     */
    dispatcher("actionResize", ev);
  }

  // If slow adjust is on and the current width isn't within the target width by 3 pixels (so the
  // algorithm don't start an infinite loop trying to achieve an exact target value).
  $: if (slowAdjust && Math.abs(target - inlineSize) > 3) {
    // Adjust the font size by at most 0.01 pixels every frame/resize so the width will be the
    // target width
    fontSize += Math.min(Math.max(-0.01, target - inlineSize), 0.01);
  }
</script>

<dl>
  <dt>inlineSize</dt>
  <dd>{inlineSize}px</dd>
</dl>
<dl>
  <dt>blockSize</dt>
  <dd>{blockSize}px</dd>
</dl>
<dl>
  <dt>font-size</dt>
  <dd>{fontSize}rem</dd>
</dl>

<div class="font-size">
  <label for="fontSize">font-size</label>
  <input
    id="fontSize"
    type="range"
    bind:value={fontSize}
    max="5"
    min="0.1"
    step="0.1"
  />
</div>

<div class="slow-adjust">
  <label for="slowAdjust">Slow size adjust</label>
  <input
    id="slowAdjust"
    type="checkbox"
    bind:checked={slowAdjust}
  />
</div>
<div class="slot-adjust-target">
  <label for="slowAdjustTarget">Slow size adjust target</label>
  <input
    id="slowAdjustTarget"
    type="range"
    bind:value={target}
    max="1920"
    min="0.1"
    step="1"
  />
</div>

<p
  style="font-size: {fontSize}rem;"
  use:actionWatchSize
  on:actionResize={fireActionResize}
  on:actionResize={handleResize}
>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, quo?
</p>

<style lang="scss">
  p {
    line-height: 1.5;
    background-color: rgb(234, 243, 255);
    color: steelblue;
    width: fit-content;
  }
</style>
