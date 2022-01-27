<script lang="ts">
  const data = [
    {
      title: "Simple colors",
      description: "Have a general use. This will set text and surface colors too.",
      variables: [
        { name: "--szot-primary", default: "#2b4c7e" },
        { name: "--szot-secondary", default: "#606d80" },
        { name: "--szot-dark", default: "#1f1f20" },
        { name: "--szot-light", default: "#dce0e6" },
      ],
    },
    {
      title: "pure text colors",
      description: "You can ovewrite the text color.",
      variables: [
        { name: "--szot-primary-txt", default: "--primary" },
        { name: "--szot-secondary-txt", default: "--secondary" },
        { name: "--szot-dark-txt", default: "--dark" },
        { name: "--szot-light-txt", default: "--light" },
      ],
    },
    {
      title: "surface colors",
      description: "You can ovewrite the surface colors.",
      variables: [
        { name: "--szot-primary-surface", default: "--primary" },
        { name: "--szot-secondary-surface", default: "--secondary" },
        { name: "--szot-dark-surface", default: "--dark" },
        { name: "--szot-light-surface", default: "--light" },
      ],
    },
    {
      title: "text on surface colors",
      description: "",
      variables: [
        { name: "--szot-txt-on-primary-surface", default: "#dce0e6" },
        { name: "--szot-txt-on-secondary-surface", default: "#dce0e6" },
        { name: "--szot-txt-on-dark-surface", default: "#dce0e6" },
        { name: "--szot-txt-on-light-surface", default: "#1f1f20" },
      ],
    },
    {
      title: "signal colors",
      description: "used to inform something, like a helper text, an info, ... Can be both, a surface or a text",
      variables: [
        { name: "--szot-error", default: "#bb5656" },
        { name: "--szot-warning", default: "#bbb156" },
        { name: "--szot-info", default: "#568cbb" },
        { name: "--szot-success", default: "#60bb56" },
        { name: "--szot-neutral", default: "#6e737a" },
      ],
    },
    {
      title: "text on signal colors surface",
      description: "if the color is used as background, this color must be the text",
      variables: [
        { name: "--szot-txt-on-signal-color", default: "black" },
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
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {#each d.variables as v}
          <tr>
            <td>{ v.name }</td>
            <td>{ v.default }</td>
            <td class="example-cell {v.name}">Text test</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
{/each}

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

  .--szot-primary,
  .--szot-secondary,
  .--szot-dark,
  .--szot-light {
    color: transparent;
  }

  .example-cell {
    font-weight: 700;
  }

  .--szot-primary-txt {
    color: var(--theme-primary-txt);
  }

  .--szot-secondary-txt {
    color: var(--theme-secondary-txt);
  }

  .--szot-dark-txt {
    color: var(--theme-dark-txt);
  }

  .--szot-light-txt {
    color: var(--theme-light-txt);
  }

  .--szot-primary-surface {
    background: var(--theme-primary-surface);
    color: transparent;
  }

  .--szot-secondary-surface {
    background: var(--theme-secondary-surface);
    color: transparent;
  }

  .--szot-dark-surface {
    background: var(--theme-dark-surface);
    color: transparent;
  }

  .--szot-light-surface {
    background: var(--theme-light-surface);
    color: transparent;
  }

  .--szot-txt-on-primary-surface {
    background: var(--theme-primary-surface);
    color: var(--theme-txt-on-primary-surface);
  }

  .--szot-txt-on-secondary-surface {
    background: var(--theme-secondary-surface);
    color: var(--theme-txt-on-secondary-surface);
  }

  .--szot-txt-on-dark-surface {
    background: var(--theme-dark-surface);
    color: var(--theme-txt-on-dark-surface);
  }

  .--szot-txt-on-light-surface {
    background: var(--theme-light-surface);
    color: var(--theme-txt-on-light-surface);
  }

  .--szot-error {
    background: var(--theme-error);
    color: var(--theme-txt-on-signal-color);
  }

  .--szot-warning {
    background: var(--theme-warning);
    color: var(--theme-txt-on-signal-color);
  }

  .--szot-info {
    background: var(--theme-info);
    color: var(--theme-txt-on-signal-color);
  }

  .--szot-success {
    background: var(--theme-success);
    color: var(--theme-txt-on-signal-color);
  }

  .--szot-neutral {
    background: var(--theme-neutral);
    color: var(--theme-txt-on-signal-color);
  }

  .--szot-txt-on-signal-color {
    background: var(--theme-error);
    color: var(--theme-txt-on-signal-color);
  }

</style>
