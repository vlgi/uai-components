<script lang="ts">
  import Button from "./components/Button/Button.svelte";
  import Icon from "./components/Icon/Icon.svelte";
  import { IIcons } from "./components/Icon/IIcons";
  import myImage from "./assets/img/Luna.jpg";

  // Props example, input your name
  export let yourName = "";
</script>

<h1>Component package example.</h1>

<br><br>

<h2>
  This component show your name from props:
</h2>
<p>
  Hi { yourName }
</p>

<br><hr><br>

<h2>
  Use 2 internal componentes:
</h2>
<p>
  a <Button primary={true}>Button</Button>
</p>
<br>
<p>
  and an icon
  <Icon iconName={IIcons.mail_outline} />
</p>

<br><hr><br>

<h2>
  And import an image too:<br>
  <img src={myImage} alt="my-img" width="150px" height="150px"/><br>
</h2>

<style lang="scss">
  *::selection {
    background: red;
    // background-image: url('./assets/img/Luna.jpg');
  }
</style>
