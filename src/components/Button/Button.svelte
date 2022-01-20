<script lang="ts">
  import Icon from "../Icon/Icon.svelte";

  export let size = "medium";
  export let icon = "none";
  export let disabled = "false";
  export let background = "normal";
</script>


{#if size == "floating" && icon != "none"}

  <button class="button {size} background-{background} disabled-{disabled}">
    <div id="icone"><Icon iconName={icon}/></div>
  </button>

{:else if icon != "none" && size !="floating"}

  <button class="button {size} background-{background} disabled-{disabled}">
    <div id="icone"><Icon iconName={icon}/></div>
    <div id="texto"><slot></slot></div>
  </button>

{:else}

  <button class="button {size} disabled-{disabled} background-{background}">
    <slot></slot>
  </button>

{/if}


<style lang="scss">
.button {
  position: relative;
  display: block;

  text-transform: var(--text-transform,capitalize);
  cursor: pointer;
  color: var(--color,#FFFFFF);
  background-color:var(--background-color,#333333);
  outline: none;
  border: var(--border,none);
  font-family: var(--font-family,Open Sans);
  text-align: var(--text-align,center);
  justify-content: center;
  align-items: center;
  transition: background-color .3s;
  overflow: hidden;
}

.button:hover {
  color:var(--hover-color,--color);
  background-color: var(--hover-background,#1A1A1A);
  transition: background-color .3s;
}

.button > * {
  position: relative;
}

.button:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0;
  padding-top: 0;
  border-radius: 100%;
  background-color: var(--effect-color-after-click,rgba(184, 182, 182, 0.2));

  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

}
.button:active:before {
  width: 120%;
  padding-top: 120%;
  transition: width .2s ease-out, padding-top .2s ease-out;
}
.floating {
    border-radius: 17px;
    padding: 0;
    width: 30.56px;
    height: 31.36px;

    #icone {
    transform: var(--icon-transform-translate,translate(0rem, 0.1rem));
    }
  }
  .large {
    border-radius: var(--border-radius,2.5625rem);
    padding: var(--padding, 0.625rem 2.1875rem);

    font-size: var(--font-size,1.5rem);
    font-style: var(--font-style,normal);
    font-weight: var(--font-weight,bold);
    line-height: var(--line-height,2rem);

    #icone {
    position: absolute;
    transform: var(--icon-transform-translate,translate(5.75rem, .1rem));
    }
    #texto {
      position: relative;
      transform: var(--texto-transform-translate,translate(-0.9375rem,0));
    }

  }
  .medium {
    border-radius: var(--border-radius,1.4375rem);
    padding: var(--padding,0.5625rem 3.4688rem);

    font-size: var(--font-size,1rem);
    font-style: var(--font-style,normal);
    font-weight: var(--font-weight,600);
    line-height: var(--line-height,1.875rem);

    #icone {
    position: absolute;
    transform: var(--icon-transform-translate,translate(5.5rem, 0.2rem));
    }
    #texto {
      position: relative;
      transform: var(--texto-transform-translate,translate(-.5rem, 0rem));
    }
  }
  .small {
    border-radius: var(--border-radius,1.4375rem);
    padding: var(--padding, 0.3125rem 0.625rem);

    font-size: var(--font-size,1rem);
    font-style: var(--font-style,normal);
    font-weight: var(--font-weight,600);
    line-height: var(--line-height,1.875rem);

    #icone {
    position: absolute;
    transform: var(--icon-transform-translate,translate(-.1rem, .2rem));
    }
    #texto {
      position: relative;
      margin: var(--margin-with-icon, 0 0 0 1.5625rem);
    }
  }

  .background-none {
    --background-color: none;
    --background-none: none;
    --color:#414141;
    --hover-color:#333333;
    --hover-background:#d8d6d6;
  }
  .disabled-true {
    --color:#B1B1B1;
    --background-color: var(--background-none,#7D7D7D);
    --hover-background: var(--background-color);
    --hover-color: var(--color);
    --effect-color-after-click: none;
      cursor: initial;
      border-color: #B1B1B1;
  }

</style>
