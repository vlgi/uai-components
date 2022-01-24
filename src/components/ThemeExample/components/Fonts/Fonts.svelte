<script lang="ts">
  const data = [
    {
      title: "Font normal",
      description: "used font variables",
      variables: [
        { name: "--szot-font-family", default: "Open Sans", description: "" },
        { name: "--szot-font-weight", default: "normal", description: "" },
        { name: "--szot-font-style", default: "normal", description: "" },
        { name: " --szot-font-size", default: "1rem", description: "" },
        { name: "--szot-line-height", default: "1rem", description: "" },
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
  </section>

{/each}

<p class="example">Default font example</p>

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

  table {
    border-collapse: collapse;
  }

  td, th {
    border: 1px solid #ccc;
    padding: .6rem;
    text-align: left;
  }

  thead tr {
    background: #ddd;
  }

  .example {
    font-family: var(--theme-font-family);
    font-weight: var(--theme-font-weight,600);
    font-style: var(--theme-font-style);
    font-size: var(--theme-font-size);
    line-height: var(--theme-line-height);
  }
</style>
