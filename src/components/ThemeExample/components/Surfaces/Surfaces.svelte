<script lang="ts">
  const data = [
    {
      title: "Shadows",
      description: "Used in shaped components, like a button or a card",
      variables: [
        {
          variable: "--szot-low-shadow",
          default: "0 0 4px rgba(0,0,0,.07)",
          description: "",
        },
        {
          variable: "--szot-medium-shadow",
          default: "0 4px 4px rgba(0,0,0,.07)",
          description: "",
        },
        {
          variable: "--szot-high-shadow",
          default: "4px 4px 4px rgba(0,0,0,.07)",
          description: "",
        },
      ],
    },
    {
      title: "Border Radius",
      description: "Used in shaped components, like a button or a card",
      variables: [
        {
          variable: "--szot-small-shape",
          default: "1.25rem",
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
    {
      title: "Border",
      description: "Used in shaped components, like a button or a card",
      variables: [
        {
          variable: "--szot-small-border",
          default: "0.0625rem",
          description: "used in objects with small sizes, like a button, input, badge",
        },
        {
          variable: "--szot-medium-border",
          default: "0.0625rem",
          description: "medium size, like a card, accordion",
        },
        {
          variable: "--szot-large-border",
          default: "0.0625rem",
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
        <div class="content">
          <p><b>Variable Name:</b> {v.variable}</p>
          <p><b>Default Value:</b> {v.default}</p>
          <p><b>Description:</b> {v.description}</p>
          <div class="shape-content">
            <div class="shape {v.variable}">
            </div>
          </div>
        </div>
      {/each}
    </div>
  </section>
{/each}

<style lang="scss">
  section {
    margin: 2rem 0;
  }

  header {
    margin-bottom: .4rem;
  }

  .content {
    margin-top: 1rem;
    font-size: 12px;
  }

  .shape {
    width: 4rem;
    height: 4rem;
    border: 3px solid black;
  }

  .--szot-small-shape {
    border-radius: var(--theme-small-shape);
    width: 4rem;
    height: 2rem;
  }

  .--szot-medium-shape {
    border-radius: var(--theme-medium-shape);
    width: 20rem;
    height: 10rem;
  }

  .--szot-large-shape {
    border-radius: var(--theme-large-shape);
    width: 60rem;
    height: 30rem;
  }

  .--szot-low-shadow {
    border: 1px solid #eee;
    box-shadow: var(--theme-low-shadow);
  }

  .--szot-medium-shadow {
    border: 1px solid #eee;
    box-shadow: var(--theme-medium-shadow);
  }

  .--szot-high-shadow {
    border: 1px solid #eee;
    box-shadow: var(--theme-high-shadow);
  }

  .--szot-small-border {
    border: var(--theme-small-border) solid #333;
    width: 4rem;
    height: 2rem;
  }

  .--szot-medium-border {
    border: var(--theme-medium-border) solid #333;;
    width: 20rem;
    height: 10rem;
  }

  .--szot-large-border{
    border: var(--theme-large-border) solid #333;;
    width: 60rem;
    height: 30rem;
  }

</style>
