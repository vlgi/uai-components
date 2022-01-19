<script lang="ts">
  export let disabled = "false";
</script>

<span href="./" class="dynamic-badge" id={disabled}><span><slot>Teste</slot></span></span>

<style lang="scss">

.dynamic-badge {

  position:relative;
  padding: var(--badge-padding,0px 10px);

  background:var(--badge-background,#FFFFFF);
  color:var(--badge-color,#5F5F5F);

  width: var(--badge-width,6.3125rem);
  height: var(--badge-heigth,1.0625rem);
  text-align:center;

  border-radius: var(--badge-border-radius, 1.5625rem);
  border: var(--badge-border, none);

  font-family: var(--badge-font-family,Open Sans);
  font-style: var(--badge-font-style,normal);
  font-weight: var(--badge-font-weight,600);
  font-size: var(--badge-font-size,0.75rem);
  line-height: var(--badge-line-height,0.625rem);
  }
  #true{
      --badge-background:#B1B1B1;
      --badge-color:#7D7D7D;
    }


</style>
