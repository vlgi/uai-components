<script lang="ts">
  const data = [
    {
      title: "Shadows",
      description: "Used in shaped components, like a button or a card",
      variables: [
        {
          variable: "--szot-global-shadow",
          default: "2px 2px 5px rgba(0,0,0,.4)",
          description: "used in objects with small sizes, like a button, input, badge",
        },
      ],
    },
    {
      title: "Border Radius",
      description: "Used in shaped components, like a button or a card",
      variables: [
        {
          variable: "--szot-small-shape",
          default: "0.625rem",
          description: "used in objects with small sizes, like a button, input, badge",
        },
        {
          variable: "--szot-medium-shape",
          default: "1rem",
          description: "medium size, like a card, accordion",
        },
        {
          variable: "--szot-large-shape",
          default: "1.5rem",
          description: "large size, like a modal",
        },
      ],
    },
  ];
</script>

{#each data as d}
  <section>
    <header>
      <h2>{d.title}</h2>
      <p>{d.description}</p>
    </header>

    <div class="container">
      {#each d.variables as v}
        <div class="shape-content">
          <p><b>Variable Name:</b> {v.variable}</p>
          <p><b>Default Value:</b> {v.default}</p>
          <p><b>Description:</b> {v.description}</p>
          <div class="shape {v.variable}">
          </div>
        </div>
      {/each}
    </div>
  </section>
{/each}

<style lang="scss">
  section {
    font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 2rem 0;
  }

  header {
    margin-bottom: .4rem;
  }

  .shape-content {
    margin-top: 1rem;
    font-size: 12px;
  }

  .shape {
    width: 4rem;
    height: 4rem;
    border: 3px solid black;

    &[class*=small] {
      width: 4rem;
      height: 2rem;
    }

    &[class*=medium] {
      width: 20rem;
      height: 10rem;
    }

    &[class*=large] {
      width: 60rem;
      height: 30rem;
    }
  }

  .--szot-small-shape {
    border-radius: var(--theme-small-shape);
  }

  .--szot-medium-shape {
    border-radius: var(--theme-medium-shape);
  }

  .--szot-large-shape {
    border-radius: var(--theme-large-shape);
  }

  .--szot-global-shadow {
    box-shadow: var(--theme-global-shadow);
  }

</style>
