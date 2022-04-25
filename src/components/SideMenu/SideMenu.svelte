<script lang="ts">
  import DraggableButton from "./DraggableButton/DraggableButton.svelte";
  import Icon from "../Icon/Icon.svelte";
  import type { TBottomMenuItem, TMenuItem, TMenuSubLink } from "./types";

  /**
   * itens of the menu
   * @type {array}
   */
  export let items: TMenuItem[];

  // itens to show at the bottom, without scroll
  export let bottomItems: TBottomMenuItem[] = [];

  // switch menu to mobile mode
  export let mobileMode = false;

  // path to the logo imagem when menu is collapsed
  export let collapsedLogoImg = "";

  // path to the logo imagem when menu is expanded
  export let expandedLogoImg = "";

  let panIsActive = false;
  let navExpanded = false;
  let elBtnContainer: HTMLElement;
  let elBtnOverlay: HTMLElement;
  let elBtn: HTMLButtonElement;

  function isGroupActive(_items: TMenuSubLink[]) {
    return _items.some((i) => i.isActive);
  }

  function openMenu() {
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
    navExpanded = false;

    // close button overlay
    elBtnContainer.classList.remove("mobile-toggle-btn-container--active");
    elBtn.style.left = elBtnOverlay.style.left;
    elBtn.style.top = elBtnOverlay.style.top;
  }

  function toggleMobileMenu() {
    if (panIsActive) return;
    if (elBtnContainer.classList.contains("mobile-toggle-btn-container--active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }
</script>

<div class="nav-menu-container" class:is-mobile={ mobileMode }>
  <div class="mobile-toggle-btn-container" bind:this={ elBtnContainer }>
    <div class="mobile-toggle-overlay" bind:this={ elBtnOverlay }></div>
    <DraggableButton
      bind:panIsActive
      bind:elBtn
      on:click={ toggleMobileMenu }
    >
    {#if navExpanded}
      <Icon iconName="close"/>
    {:else}
      <Icon iconName="menu"/>
    {/if}
    </DraggableButton>
  </div>

  <nav class:nav--expanded={ navExpanded }
    on:mouseover={ () => !mobileMode && openMenu() }
    on:focus={ () => !mobileMode && openMenu() }
    on:mouseout={ () => !mobileMode && closeMenu() }
    on:blur={ () => !mobileMode && closeMenu() }
    tabindex="0"
  >
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

    {#if bottomItems.length > 0}
      <hr>
      <div class="nav-bottom-items-container">
        {#each bottomItems as item}
          <a
            class="nav-bottom-items nav-bottom-items--active-{ item.isActive }"
            href={ item.path }
            on:click={ closeMenu }
          >
            <i class={ item.icon }/>
            <span class="nav-bottom-items-text">{ item.text }</span>
          </a>
        {/each}
      </div>
    {/if}
  </nav>
</div>

<style lang="scss">

  @use 'src/styles/mixins' as m;
  .nav-menu-container {
    // nav sizes
    --nav-width: var(--szot-nav-width, 4.5rem);
    --nav-expanded-width: var(--szot-nav-expanded-width, 300px);
    --nav-logo-height: var(--szot-nav-logo-height, 5rem);
    --nav-text-size: var(--szot-nav-text-size, 1rem);
    --nav-icon-size: var(--szot-nav-icon-size, 1.5rem);
    --nav-item-max-height: var(--szot-nav-item-max-height, 50px);

    // nav paddings
    --nav-padding: var(--szot-nav-width, 0.4rem);
    --nav-logo-padding: var(--szot-nav-padding, .6rem .3rem);
    --nav-external-padding: var(--szot-nav-external-padding, 0px);

    // nav colors
    --nav-background-color: var(--szot-nav-background-color, #f0f0f0);
    --nav-txt-color: var(--szot-nav-txt-color, var(--theme-dark-txt));
    --nav-items-hover-color: var(--szot-nav-items-hover-color, var(--theme-light-surface));
    --nav-items-active-background: var(--szot-nav-items-active-background, var(--theme-dark-surface));
    --nav-items-active-txt-color: var(--szot-nav-items-active-txt-color, var(--theme-txt-on-dark-surface));
    --nav-sub-items-active-highlight: var(--szot-nav-sub-items-active-highlight, var(--nav-items-active-txt-color));

    // other variables
    --nav-items-active-border: var(--szot-nav-items-active-border, none);
    --nav-animation-speed: var(--szot-nav-animation-speed, 350ms);
    --nav-z-index: var(--szot-nav-z-index, 9999);
    --nav-shadow: var(--szot-nav-shadow, var(--theme-high-shadow));
    --nav-border-radius: var(--szot-nav-border-radius,
      0 var(--theme-medium-shape) var(--theme-medium-shape) 0
    );
    --nav-items-border-radius: var(--szot-nav-items-border-radius,
      0px var(--theme-small-shape) var(--theme-small-shape) 0px
    );
    --nav-group-hover-border-radius: var(--szot-nav-group-hover-border-radius,
      0px var(--theme-medium-shape) var(--theme-medium-shape) 0px
    );

    /*
      above we have some internal variables only
    */
    --internal-nav-width: var(--nav-width);
    --internal-nav-transition-delay: 0;
    --internal-nav-expanded-transition-delay:0;
    --internal-mobile-toggle-overlay-delay: 0;
    --internal-mobile-toggle-btn-delay: 0;
    --internal-mobile-toggle-overlay-expanded-delay: 0;
    --internal-mobile-toggle-btn-expanded-delay: 0;
    --internal-mobile-toggle-btn-container-display: none;

    &.is-mobile {
      --nav-expanded-width: 100vw;
      --nav-border-radius: 0;

      --internal-nav-width: 0;
      --internal-nav-transition-delay: 0;
      --internal-nav-expanded-transition-delay: var(--nav-animation-speed);
      --internal-mobile-toggle-overlay-delay: var(--nav-animation-speed);
      --internal-mobile-toggle-btn-delay: var(--nav-animation-speed);
      --internal-mobile-toggle-overlay-expanded-delay: 0;
      --internal-mobile-toggle-btn-expanded-delay: 0;
      --internal-mobile-toggle-btn-container-display: block;
    }

    height: 100%;
    width: var(--internal-nav-width);
    position: relative;
    z-index: var(--nav-z-index);

    a {
      color: inherit;
      text-decoration: none;
    }

    .mobile-toggle-btn-container {
      display: var(--internal-mobile-toggle-btn-container-display);

      .mobile-toggle-overlay {
        background-color: var(--nav-background-color);
        border-radius: 100%;
        position: fixed;
        transform: translate(-50%, -50%);
        bottom: -1.5rem;
        right: -1.5rem;
        z-index: 1;
        width: 0;
        height: 0;
        transition: width ease-in-out var(--nav-animation-speed), height ease-in-out var(--nav-animation-speed);
        transition-delay: var(--internal-mobile-toggle-overlay-delay);
      }

      :global(.mobile-toggle-btn) {
        &:not(.mobile-toggle-btn--dragging) {
          transition:
            top ease-in-out var(--nav-animation-speed),
            left ease-in-out var(--nav-animation-speed),
            transform ease-in-out var(--nav-animation-speed);
          transition-delay: var(--internal-mobile-toggle-btn-delay);
        }
      }

      &--active {
        .mobile-toggle-overlay {
          height: 300vmax;
          width: 300vmax;
          transition-delay: var(--internal-mobile-toggle-overlay-expanded-delay);
        }
      }
    }


    nav {
      display: grid;
      grid-template-rows: auto auto 1fr auto auto;
      background: var(--nav-background-color);
      height: calc(100% - 2*var(--nav-external-padding));
      top: var(--nav-external-padding);
      left: 0;
      border-radius: var(--nav-border-radius);
      width: var(--internal-nav-width);
      overflow: hidden;
      transition: width ease-in-out 450ms;
      transition-delay: var(--internal-nav-transition-delay);
      position: fixed;
      z-index: 10;
      box-shadow: var(--nav-shadow);

      &.nav--expanded {
        width: var(--nav-expanded-width);
        transition: width ease-in-out 450ms;
        transition-delay: var(--internal-nav-expanded-transition-delay);

        %on-nav-hover-animate-n1-container {
          width: 16rem;
          transition: width ease 1ms 0ms, max-height ease 400ms 0ms, background-color ease-in-out 150ms, border-radius ease-in-out 150ms;
        }

        %on-nav-hover-animate-n1-text {
          opacity: 1;
          transition: opacity 250ms ease-out 100ms ;
        }

        %on-nav-hover-enable-scroll {
          overflow-y: auto;
        }
      }

      .nav-logo {
        display: flex;
        height: var(--nav-logo-height);
        max-width: var(--internal-nav-width);
        align-items: center;
        justify-content: flex-start;
        padding: var(--nav-logo-padding);
        position: relative;

        img {
          height: 100%;
          background: var(--nav-background-color);
        }
      }

      hr {
        width: calc(var(--nav-width) - 2 * var(--nav-padding) - 6px);
        margin: 0 calc(var(--nav-padding));
        border-color: var(--nav-txt-color);
      }

      @mixin n1-container {
        display: grid;
        align-items: center;
        border-radius: var(--nav-items-border-radius);
        grid: calc(var(--nav-item-max-height) - 2*var(--nav-padding)) auto/ calc(var(--nav-width) - 1*var(--nav-padding)) 1fr;
        width: calc(var(--nav-width) - 2*var(--nav-padding));
        max-height: var(--nav-item-max-height);
        flex-shrink: 0;
        margin: .3rem var(--nav-padding);
        margin-left: 0;
        padding: var(--nav-padding);
        padding-left: 0;
        overflow: hidden;
        transition: width ease 1ms 500ms, max-height ease 150ms 0ms;
        text-decoration: none;
        cursor: pointer;
        @include m.text-color(var(--nav-txt-color));
        background: transparent;

        @extend %on-nav-hover-animate-n1-container;

        &:not([class*="active-true"]):hover {
          background: var(--nav-items-hover-color);
        }

        &--active-true {
          border: var(--nav-items-active-border);
          @include m.text-color(var(--nav-items-active-txt-color));
          background: var(--nav-items-active-background);
        }
      }

      @mixin n1-icon {
        justify-self: center;

        &::before {
          font-size: var(--nav-icon-size);
          @include m.text-color(var(--nav-txt-color));
        }
      }

      @mixin n1-text {
        font-size: var(--nav-text-size);
        font-weight: 700;
        grid-column: 2/3;
        opacity: 0;
        transition: opacity 250ms ease-in 250ms;
        text-decoration: none;
        cursor: pointer;
        @include m.text-color(var(--nav-txt-color));

        @extend %on-nav-hover-animate-n1-text;
      }

      .nav-items {
        display: flex;
        flex-flow: column;
        padding: .3rem 0;
        height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;

        @extend %on-nav-hover-enable-scroll;

        .n1-item {
          @include n1-container();

          i {
            @include n1-icon();
          }

          .n1-item-text {
            @include n1-text();
          }
        }

        .n1-group {
          @include n1-container();

          &:hover {
            max-height: 500px;
            border-radius: var(--nav-group-hover-border-radius);

            .n2-item {
              opacity: 1;
              transition: opacity 250ms ease-out 100ms;
            }
          }

          &--active-true .n2-item {
            @include m.text-color(var(--nav-items-active-txt-color));
          }

          i {
            @include n1-icon();
          }

          .n1-group-text {
            @include n1-text();
          }

          .n2-item {
            @include n1-text();
            margin-top: .7rem;
            font-weight: 400;
            position: relative;

            &:hover:not(&--active-true) {
              opacity: .7;
            }

            &--active-true {
              &::after {
                content: '';
                width: 4rem;
                height: .18rem;
                border-radius: .3rem;
                background: var(--nav-sub-items-active-highlight);
                position: absolute;
                bottom: -.2rem;
                left: 0;
              }
            }
          }
        }
      }

      .nav-bottom-items-container {
        padding: .3rem 0;

        .nav-bottom-items {
          @include n1-container();

          i {
            @include n1-icon();
          }

          .nav-bottom-items-text {
            @include n1-text();
            text-align: start;
          }
        }
      }
    }
  }
</style>
