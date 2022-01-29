<script lang="ts">
  import Hammer from "hammerjs";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let items = [];
  export let mobileMode = false;
  export let collapsedLogoImg: string;
  export let expandedLogoImg: string;

  let panIsActive = false;
  let elBtn: HTMLButtonElement;
  let hammertime: Hammer;
  let navExpanded = false;

  function isGroupActive(items) {
    return items.some((i) => i.isActive);
  }

  function setBtnPan() {
    elBtn = document.querySelector(".mobile-toggle-btn");
    hammertime = new Hammer(elBtn);
    hammertime.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on("pan", onPanToggleBtn);
    hammertime.on("panstart", () => {
      panIsActive = true;
      elBtn.classList.add("mobile-toggle-btn--dragging");
    });
    hammertime.on("panend", () => setTimeout(() => {
      panIsActive = false;
      elBtn.classList.remove("mobile-toggle-btn--dragging");
    }, 250));
  }

  function positionButton() {
    // position mobile button to be inside the screen
    const p = elBtn.getBoundingClientRect();
    elBtn.style.left = `${p.left}px`;
    elBtn.style.top = `${p.top}px`;
  }

  function isMobileOrTablet() {
    // TODO - ver o que fazer quanto a isso daqui
    return false;
  }

  function onPanToggleBtn(ev) {
    if (
      window.innerWidth < ev.center.x
    || window.innerHeight < ev.center.y
    || ev.center.x < 0
    || ev.center.y < 0
    ) return;

    elBtn.style.top = `${ev.center.y}px`;
    elBtn.style.left = `${ev.center.x}px`;
  }

  function openMenu() {
    const elBtnContainer = document.querySelector(".mobile-toggle-btn-container");
    const elBtnOverlay = document.querySelector(".mobile-toggle-overlay");

    // open side nav
    navExpanded = true;

    // open button overlay
    elBtnContainer.classList.add("mobile-toggle-btn-container--active");
    elBtnOverlay.style.left = elBtn.style.left;
    elBtnOverlay.style.top = elBtn.style.top;
    elBtn.style.left = "calc(100vw - 2.5rem)";
    elBtn.style.top = "calc(2.5rem)";
  }

  function closeMenu() {
    const elBtnContainer = document.querySelector(".mobile-toggle-btn-container");
    const elBtnOverlay = document.querySelector(".mobile-toggle-overlay");

    navExpanded = false;

    // close button overlay
    elBtnContainer.classList.remove("mobile-toggle-btn-container--active");
    elBtn.style.left = elBtnOverlay.style.left;
    elBtn.style.top = elBtnOverlay.style.top;
  }

  function toggleMobileMenu() {
    if (panIsActive) return;
    const elBtnContainer = document.querySelector(".mobile-toggle-btn-container");
    if (elBtnContainer.classList.contains("mobile-toggle-btn-container--active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  onMount(() => {
    setBtnPan();
    positionButton();
  });
</script>

<side-menu class:is-mobile={ mobileMode }>
  <div class="mobile-toggle-btn-container">
    <div class="mobile-toggle-overlay"></div>
    <button class="mobile-toggle-btn" on:click={ toggleMobileMenu }>
      <i class="icon-search"/>
    </button>
  </div>

  <nav class:nav--expanded={ navExpanded }
    on:mouseover={ (ev) => !mobileMode && openMenu(ev) }
    on:mouseout={ (ev) => !mobileMode && closeMenu(ev) }>
    <div class="nav-logo">
      {#if navExpanded}
        <img src={ expandedLogoImg } alt="Logo" />
      {:else}
        <img src={ collapsedLogoImg } alt="Logo" />
      {/if}
    </div>
    <hr>
    <div class="nav-items">
      {#each items as n1}
        <!-- n1 item -->
        {#if n1.type === "item"}
          <a
            class="n1-item n1-item--active-{ n1.isActive }"
            href={ n1.path }
            on:click={ closeMenu }
            >
            <i class={ n1.icon }/>
            <span class="n1-item-text">{ n1.text }</span>
          </a>
        {/if}

        <!-- n1 group -->
        {#if n1.type === "group"}
          <div
            class="n1-group n1-group--active-{ isGroupActive(n1.items) }"
          >
            <i class={ n1.icon }/>
            <span class="n1-group-text">{ n1.text }</span>

            <!-- n2 item -->
            {#each n1.items as n2}
              <a
                class="n2-item n2-item--active-{ n2.isActive }"
                href={ n2.path }
                on:click={ closeMenu }
              >
                <span class="n2-item-text">{ n2.text }</span>
              </a>
            {/each}
          </div>
        {/if}
      {/each}
    </div>
    <hr>
    <div class="nav-menu-apps">
      <button
        class="menu-apps-open-button"
      >
        <i class="icon-search"/>
        <span class="menu-apps-open-button-text">Apps</span>
      </button>
    </div>
  </nav>
</side-menu>

<style lang="scss" global>
  @use './SideMenu.scss';
</style>
