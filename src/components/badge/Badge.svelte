<script lang="ts">
  export let disabled = "false";
</script>

<span href="./" class="badge" id={disabled}><span><slot></slot></span></span>

<style lang="scss">

.badge {

  position:relative;
  padding: var(--padding,0px 10px);

  background:var(--background,#FFFFFF);
  color:var(--color,#5F5F5F);

  width: var(--width,6.3125rem);
  height: var(--heigth,1.0625rem);
  text-align:center;

  border-radius: var(--border-radius, 1.5625rem);
  border: var(--border, none);

  font-family: var(--font-family,Open Sans);
  font-style: var(--font-style,normal);
  font-weight: var(--font-weight,600);
  font-size: var(--font-size,0.75rem);
  line-height: var(--line-height,0.625rem);
  }
  #true{
      --background:#B1B1B1;
      --color:#7D7D7D;
    }


</style>
