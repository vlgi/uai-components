<script lang="ts">
</script>

<h1>Testes com degrade</h1>

<h2>fundo</h2>
<div class="square">Olá</div>
<div class="square-gradient">Olá</div>

<h2>texto</h2>
<div class="text">Teste</div>
<div class="text-gradient">Teste</div>

<h2>borda</h2>
<div class="border">Olá</div>
<div class="border-gradient">Olá</div>

<h2>ideias:</h2>
<ul>
  <li>Fazer um mixing para essas coisas</li>
  <li>Fazer com que a interface para uso seja igual para todos os 3 em todos os componentes</li>
  <li>Verificar se tem como usar uma unica variavel para definir cor solida e cor gradiente, se não fazer 2.</li>
</ul>

<style lang="scss">
  @use 'src/styles/mixins' as m;
  h2 {
    margin-top: 1rem;
  }

  :global(body) {
    background-image: url(https://placekitten.com/1920/1080);
  }

  * {
    color: white;
  }

  /** gradiente no fundo */
  .square-gradient, .square {
    display: inline-block;
    margin: 0 1rem;
    width: 100px;
    height: 100px;
  }

  .square {
    background: red;
  }

  .square-gradient {
    background: linear-gradient(-30deg, rgba(252,0,47,0.938813025210084) 0%, rgba(170,255,6,1) 100%);
  }


  /** gradiente no texto */
  .text, .text-gradient {
    display: inline-block;
    box-sizing: border-box;
    margin: 0 1rem;
    font-weight: 700;
    font-size: 20px;
  }

  .text {
    @include m.text-color(red);
  }

  .text-gradient {
    @include m.text-color(linear-gradient(-30deg, rgba(252,0,47,0.938813025210084) 0%, rgba(170,255,6,1) 100%));
  }

  /** gradiente no borda */
  .border, .border-gradient {
    display: inline-block;
    box-sizing: border-box;
    margin: 0 1rem;
    width: 100px;
    height: 100px;
    border-radius: 1.5rem;
  }

  .border {
    @include m.border(5px, red);
  }

  .border-gradient {
    @include m.border(5px, linear-gradient(-30deg, rgba(252,0,47,0.938813025210084) 0%, rgba(170,255,6,1) 100%));
  }
</style>
