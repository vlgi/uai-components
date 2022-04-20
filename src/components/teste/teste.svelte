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
    margin: 0 1rem;
    font-weight: 700;
    font-size: 20px;
  }

  .text {
    color: red;
  }

  .text-gradient {
    background: linear-gradient(-30deg, rgba(252,0,47,0.938813025210084) 0%, rgba(170,255,6,1) 100%);
    color: transparent;

    // can i use 94.52%
    background-clip: text;
    -webkit-background-clip: text;
  }

  /** gradiente no borda */
  .border, .border-gradient {
    display: inline-block;
    margin: 0 1rem;
    width: 100px;
    height: 100px;
    border-radius: 1.5rem;
  }

  .border {
    border: 5px solid red;
  }

  .border-gradient {
    border: 5px solid transparent;
    position: relative;

    &::before {
      content: "";

      z-index: -1;
      box-sizing: content-box;
      position: absolute;
      inset: 50% 0 0 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);

      border-radius: inherit;
      border: inherit;

      background: linear-gradient(-30deg, rgba(252,0,47,0.938813025210084) 0%, rgba(170,255,6,1) 100%);
      background-origin: border-box;

      // can i use 94.8%
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask:
        linear-gradient(#fff 0 0) content,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  }
</style>
