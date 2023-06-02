<script lang="ts">
  const data = [
    {
      title: "Global font family",
      description: "",
      variables: [
        {
          name: "--szot-font-family",
          default: "'Open Sans', 'Helvetica Neue', sans-serif",
          description: "",
        },
        { name: "--szot-font-size", default: "16px", description: "generic usage" },
      ],
    },
    {
      title: "Tag P font",
      description: "used in <p>",
      variables: [
        { name: "--szot-p-font-weight", default: "normal", description: "" },
        { name: "--szot-p-font-style", default: "normal", description: "" },
        { name: " --szot-p-font-size", default: ".9rem", description: "" },
        { name: "--szot-p-line-height", default: "1.25rem", description: "" },
      ],
    },
    {
      title: "Form Fields",
      description: "Used in form fields components, like select, textarea, input, ...",
      variables: [
        {
          name: "--szot-fields-font-size",
          default: "(--szot-font-size",
          description: "this will automatically set label and helper text too",
        },
      ],
    },
    {
      title: "Others",
      description: "The rest of the tags follows the browser default for now",
      variables: [],
    },
  ];

  function isEmpty(arr: unknown[]): boolean {
    if (!arr) return true;
    if (arr.length === 0) return true;
    return false;
  }
</script>

<div class="examples">
  <h1>H1 example</h1>
  <h2>H2 example</h2>
  <h3>H3 example</h3>
  <h4>H4 example</h4>
  <h5>H5 example</h5>
  <h6>H6 example</h6>
  <span>span example</span>
  <p>
    p example: Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur natus dolores
    distinctio officiis maxime eos illo aperiam reprehenderit aspernatur molestiae deleniti ducimus
    sunt vel veniam, tempora in incidunt ab tempore.
  </p>
</div>

{#each data as d}
  <section>
    <header>
      <h2>{d.title}</h2>
      <p class="description">{d.description}</p>
    </header>
    {#if !isEmpty(d.variables)}
      <table>
        <thead>
          <tr>
            <th>Variable Name</th>
            <th>Default Value</th>
            <!-- <th>Description</th> -->
          </tr>
        </thead>
        <tbody>
          {#each d.variables as v}
            <tr>
              <td>{v.name}</td>
              <td>{v.default}</td>
              <!-- <td>{v.description}</td> -->
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </section>
{/each}

<style lang="scss">
  section {
    margin: 2rem 0;
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

  .examples {
    display: flex;
    flex-flow: column;

    p {
      max-width: 300px;
    }
  }
</style>
