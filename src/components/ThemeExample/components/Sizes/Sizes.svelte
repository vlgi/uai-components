<script lang="ts">
  const data = [
    {
      title: "form fields sizes",
      description: "used in some form fields elements like inputs, selects, submit button",
      variables: [
        { name: "--szot-fields-max-width", default: "7.5rem", description: "" },
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

<!-- TODO - insert the input component here -->

<input type="text" name="example" value="this isn't our input component">

<style lang="scss">
  section {
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
</style>
