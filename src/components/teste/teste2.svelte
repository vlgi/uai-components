<script lang="ts">
</script>

<h1>Testes com inputs</h1>

<h2>label cortada (irmão da borda)</h2>
<div class="input-parent">
  <input type="text" id="1" class="input-sibling">
  <label for="1"  class="label-sibling">Seu email</label>
</div>

<h2>label cortada (filho da borda)</h2>
<div class="input-border">
  <input type="text" id="2" class="input-inside">
  <label for="2" class="label-inside">Seu email</label>
</div>

<style lang="scss">
  h2 {
    margin-top: 1rem;
  }

  :global(body) {
    background-image: url(https://placekitten.com/1920/1080);
  }

  * {
    color: white;
  }

  /** label cortada sendo a borda ao irmão da label*/
  .input-parent {
    position: relative;
    margin: 1rem;

    .input-sibling {
      background: transparent;
      border: 5px solid black;
      border-radius: 1.5rem;
    }

    .label-sibling {
      position: absolute;
      top: 0;
      left: 5px;
      transform: translateY(-55%);

      background: black;
    }
  }

  /** label cortada sendo a borda pai da label*/
  .input-border {
    position: relative;
    margin: 1rem;

    width: fit-content;
    border: 5px solid black;
    border-radius: 1.5rem;

    .input-inside {
      background: transparent;
      border: none;
    }

    .label-inside {
      position: absolute;
      top: 0;
      left: 5px;
      transform: translateY(-55%);

      background-color: black;
    }
  }

</style>
