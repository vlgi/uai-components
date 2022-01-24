<script lang="ts">
  export let backgroundColor = "white";
  export let border = "true"
  export let iconName = "none"
  export let iconPosition = "right"
  export let type = "text"
  export let value = ""
  export let disabled = false
  export let readonly = false

  import Icon from "../Icon/Icon.svelte"
</script>

{#if iconName != "none"}
  <div class="form-div border-{border}" style="background-color: {backgroundColor}" id={iconPosition}>
      <input type={type} class="form-input" placeholder=" " value={value} disabled={disabled} readonly={readonly}/>
      <label for="" class="form-label"><slot></slot></label>
      <div class="icon"><Icon iconName="{iconName}"/></div>
  </div>

{:else}
  <div class="form-div border-{border}" style="background-color: {backgroundColor}" >
    <input type={type} class="form-input" placeholder=" " value={value}/>
    <label for="" class="form-label"><slot></slot></label>
  </div>

{/if}


<style lang="scss">
* {
  box-sizing: border-box;
  font-family: Open sans;
}

.form-div {
  position: relative;
  height: 48px;
  margin-bottom: 1.5rem;
  width: 256px;
}

.form-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 16px;
  outline: none;
  padding: 1rem 1rem;
  background: none;
  z-index: 1;
  color:#B1B1B1;
}


.form-label {
  position: relative;
  left: 1rem;
  top: 0.85rem;
  padding: 0 .2rem;
  margin-left: .2rem;
  color: #5F5F5F;
  font-size: 16px;
  background-color: inherit;

  transition: 0.2s;
}

/* move up label */
.form-input:focus + .form-label {
  top: -0.5rem;
  left: 0.8rem;
  z-index: 10;
  font-weight: 400;
  color: rgb(12, 138, 255);
  font-size: 16px;
}

/* sticky label when input it is filled */
.form-input:not(:placeholder-shown).form-input:not(:focus) + .form-label {
  top: -0.5rem;
  left: 0.8rem;
  z-index: 10;
  font-weight: 500;
  font-size: 16px;
}

.border-none{

  .form-input{
    border: 0;
    border-bottom: 1px solid rgb(87, 85, 85);
    padding: 1rem .5rem;
  }
  .form-input:focus{
    border-bottom: 1.5px solid rgb(12, 138, 255);
  }

  .form-label{
    margin-left: -.5rem;
  }
}

.border-true{

  .form-input{
    border: 1px solid rgb(87, 85, 85);
    border-radius: 24px;
  }
  .form-input:focus{
    border: 1.5px solid rgb(12, 138, 255);
  }
}

#left{

  .form-input{
  padding: 1rem 1rem 1rem 2rem;
  }

  .form-label{
    margin-left: 1rem;
  }

  .icon{
    position: absolute;
    left: 0;
    margin: -.3rem 0.5rem;
    color: #5F5F5F;
  }

}

#right{

  .form-input{
  padding: 1rem 1.65rem 1rem 1rem;
  }

  .icon{
    position: absolute;
    right: 0;
    margin: -.3rem 0.5rem;
    color: #5F5F5F;
  }
}
</style>
