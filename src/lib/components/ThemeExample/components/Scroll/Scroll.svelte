<script lang="ts">
  const data = [
    {
      title: "Scroll Variables",
      description: "variables to customize global scroll (does not support gradient)",
      variables: [
        { name: "--szot-scroll-bar-color", default: "#333", description: "" },
        { name: "--szot-scroll-bar-hover-color", default: "#33333380", description: "" },
        { name: "--szot-scroll-background-color", default: "transparent", description: "" },
        {
          name: "--szot-scroll-size-firefox",
          default: "thin",
          description:
            "você pode passar qualquer valor que a propriedade 'scrollbar-width' aceita.",
        },
        {
          name: "--szot-scroll-bar-width",
          default: "0.3125rem",
          description: "você pode passar valores em 'rem', 'px' ou 'em'.",
        },
        {
          name: "--szot-scroll-bar-height",
          default: "0.3125rem",
          description: "você pode passar valores em 'rem', 'px' ou 'em'.",
        },
        { name: "--szot-scroll-bar-radius", default: "1.5625rem / 3.125rem", description: "" },
      ],
    },
  ];
</script>

{#each data as d}
  <section>
    <header>
      <h2>{d.title}</h2>
      <p class="description">{d.description}</p>
    </header>

    <div class="table-scroll-wrapper">
      <table>
        <thead>
          <tr>
            <th>Variable Name</th>
            <th>Default Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {#each d.variables as v}
            <tr>
              <td>{v.name}</td>
              <td>{v.default}</td>
              <td>{v.description}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div class="spacer" />
    </div>
  </section>
{/each}

<style lang="scss">
  section {
    margin: 2rem 0;
    height: 200vh;
  }

  header {
    margin-bottom: 0.6rem;

    h2 {
      text-transform: capitalize;
    }
  }

  table {
    border-collapse: collapse;
  }

  td,
  th {
    border: 1px solid #ccc;
    padding: 0.6rem;
    text-align: left;
  }

  thead tr {
    background: #ddd;
  }

  .table-scroll-wrapper {
    height: 50vh;
    overflow-y: auto;
    width: fit-content;

    .spacer {
      height: 100vh;
    }
  }
</style>
