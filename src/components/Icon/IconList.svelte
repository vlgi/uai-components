<script lang="ts">
  import { IIcons } from "./IIcons";
  import Icon from "./Icon.svelte";

  let qValue = "";
  const iconsList = Object.values(IIcons);
  const maxToShow = 50;
  let filteredIconsList = iconsList.slice(0, maxToShow);

  function filterIcons(_qValue) {
    filteredIconsList = iconsList
      .filter((i) => {
        const re = new RegExp(_qValue, "ig");
        return re.test(i);
      })
      .slice(0, maxToShow);
  }

  $: filterIcons(qValue);

</script>


<h1>Icones</h1>

<br>
<p>
  You can use the icons as components or adding the following classes to your html tag.
</p>
<br>
<p>
  NOTE: For now, you only can use the listed icons, can't add more.
</p>
<br>
<hr>
<br>
<p>
  The following icons is a mixing of: our custom icons + material-icons from google + brands from simpleicons.org. The licences can be found at this project files.
</p>
<br>
<hr>
<br>


<input type="text" placeholder="Search for an icon" bind:value={ qValue }>
<br><br>
<span>Showing: { filteredIconsList.length }/{ iconsList.length }</span>
<br>
<span>Max: { maxToShow }</span>
<br><br>

<div class="container">
  {#each filteredIconsList as iconName}
    <div class="item">
      <Icon { iconName } />
      <span>icon-{ iconName }</span>
    </div>
  {/each}
</div>

<style lang="scss">
  .container {
    display: grid;
    grid: auto / repeat(auto-fit, minmax(250px, 1fr));
  }

  .item {
    width: fit-content;
    white-space: nowrap;
  }
</style>
