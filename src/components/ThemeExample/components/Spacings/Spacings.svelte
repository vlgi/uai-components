<script lang="ts">
  const data = [
    {
      title: "Global Spacings",
      key: "global-spacings",
      description: "",
      variables: [
        {
          name: "--szot-global-small-padding",
          default: ".6rem",
          description: "used in small components, like buttons and inputs",
        },
        {
          name: "--szot-global-medium-padding",
          default: ".8rem",
          description: "used in medium components like card and accordions",
        },
        {
          name: "--szot-global-large-padding",
          default: "1rem",
          description: "used in large components like modals",
        },
      ],
    },
    {
      title: "form fields spacings",
      key: "fields-spacings",
      description: "You can overwrite the fields variables",
      variables: [
        { name: "--szot-fields-padding", default: "--szot-global-small-padding", description: "used at select, input, textarea" },
      ],
    },
  ];
</script>


{#each data as d}
  <section>
    <header>
      <h2>{ d.title }</h2>
      <p class="description">{ d.description }</p>
    </header>

    {#each d.variables as v}
      <div class="container">
        <p><b>Variable Name:</b> {v.name}</p>
        <p><b>Default:</b> {v.default}</p>
        <p><b>Description:</b> {v.description}</p>

        {#if d.key === "global-spacings"}
          <div class="card-outter {v.name}">
            <div class="card-inner"></div>
          </div>
        {/if}

        {#if d.key === "fields-spacings"}
          <input type="text" class={v.name} value="input example">
          <select class={v.name} name="" id="">
            <option value="">select example</option>
          </select>
        {/if}
      </div>
    {/each}
  </section>
{/each}


<style lang="scss">
  section {
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 2rem 0;
  }

  header {
    margin-bottom: .6rem;

    h2 {
      text-transform: capitalize;
    }
  }

  .container {
    margin-top: 1rem;
  }

  .card-outter {
    padding: 2rem;
    background: #5F7B55;
    width: fit-content;
    margin-top: .4rem;
  }

  .card-inner {
    width: 4rem;
    height: 4rem;
    background: #547A9D;
  }

  .card-outter.--szot-global-small-padding {
    padding: var(--theme-global-small-padding);
  }

  .card-outter.--szot-global-medium-padding {
    padding: var(--theme-global-medium-padding);
  }

  .card-outter.--szot-global-large-padding {
    padding: var(--theme-global-large-padding);
  }

  .--szot-fields-padding {
    margin-top: .4rem;
    padding: var(--theme-global-large-padding);
  }
</style>
