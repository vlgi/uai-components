<script lang="ts">
  const data = [
    {
      title: "Simple colors",
      description: "Have a general use. This will set text and surface colors too.",
      variables: [
        { name: "--uai-primary", default: "#FC6627" },
        { name: "--uai-secondary", default: "#167070" },
        { name: "--uai-dark", default: "#5F5F5F " },
        { name: "--uai-light", default: "#F9F9F9" },
      ],
    },
    {
      title: "pure text colors",
      description: "You can ovewrite the text color.",
      variables: [
        { name: "--uai-primary-txt", default: "--uai-primary" },
        { name: "--uai-secondary-txt", default: "--uai-secondary" },
        { name: "--uai-dark-txt", default: "--uai-dark" },
        { name: "--uai-light-txt", default: "--uai-light" },
      ],
    },
    {
      title: "surface colors",
      description:
        "Colors of the text entered in the input and in the textarea." +
        "(this variable is separated only because the input and the textarea do not" +
        "support gradient in the inserted text).",

      variables: [
        { name: "--uai-primary-surface", default: "--uai-primary" },
        { name: "--uai-secondary-surface", default: "--uai-secondary" },
        { name: "--uai-dark-surface", default: "--uai-dark" },
        { name: "--uai-light-surface", default: "--uai-light" },
      ],
    },
    {
      title: "inserted text color",
      description: "Colors of the text entered in the input and in the textarea.",
      variables: [
        { name: "--uai-primary-inserted-text", default: "#FC6627" },
        { name: "--uai-secondary-inserted-text", default: "#167070" },
        { name: "--uai-dark-inserted-text", default: "#5F5F5F" },
        { name: "--uai-light-inserted-text", default: "#F9F9F9" },
      ],
    },
    {
      title: "text on surface colors",
      description: "",
      variables: [
        { name: "--uai-txt-on-primary-surface", default: "#dce0e6" },
        { name: "--uai-txt-on-secondary-surface", default: "#dce0e6" },
        { name: "--uai-txt-on-dark-surface", default: "#dce0e6" },
        { name: "--uai-txt-on-light-surface", default: "#1f1f20" },
      ],
    },
    {
      title: "signal colors",
      description:
        "used to inform something, like a helper text, an info, ... Can be both, a surface or a text",
      variables: [
        { name: "--uai-error", default: "#bb5656" },
        { name: "--uai-warning", default: "#bbb156" },
        { name: "--uai-info", default: "#568cbb" },
        { name: "--uai-success", default: "#60bb56" },
        { name: "--uai-neutral", default: "#6e737a" },
      ],
    },
    {
      title: "text on signal colors surface",
      description: "if the color is used as background, this color must be the text",
      variables: [{ name: "--uai-txt-on-signal-color", default: "black" }],
    },
    {
      title: "text colors",
      description: "text colors splitted by context of use",
      variables: [{ name: "--uai-global-txt", default: "--uai-txt-dark" }],
    },
    {
      title: "other colors",
      description: "colors splitted by context of use",
      variables: [{ name: "--uai-fields-outline", default: "--uai-global-txt" }],
    },
  ];
</script>

{#each data as d}
  <section>
    <header>
      <h2>{d.title}</h2>
      <p class="description">{d.description}</p>
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
            <td>{v.name}</td>
            <td>{v.default}</td>
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

  .--uai-primary,
  .--uai-secondary,
  .--uai-dark,
  .--uai-light {
    color: transparent;
  }

  .example-cell {
    font-weight: 700;
  }

  .--uai-primary-txt {
    color: var(--theme-primary-txt);
  }

  .--uai-secondary-txt {
    color: var(--theme-secondary-txt);
  }

  .--uai-dark-txt {
    color: var(--theme-dark-txt);
  }

  .--uai-light-txt {
    color: var(--theme-light-txt);
  }

  .--uai-primary-surface {
    background: var(--theme-primary-surface);
    color: transparent;
  }

  .--uai-secondary-surface {
    background: var(--theme-secondary-surface);
    color: transparent;
  }

  .--uai-dark-surface {
    background: var(--theme-dark-surface);
    color: transparent;
  }

  .--uai-light-surface {
    background: var(--theme-light-surface);
    color: transparent;
  }

  .--uai-txt-on-primary-surface {
    background: var(--theme-primary-surface);
    color: var(--theme-txt-on-primary-surface);
  }

  .--uai-txt-on-secondary-surface {
    background: var(--theme-secondary-surface);
    color: var(--theme-txt-on-secondary-surface);
  }

  .--uai-txt-on-dark-surface {
    background: var(--theme-dark-surface);
    color: var(--theme-txt-on-dark-surface);
  }

  .--uai-txt-on-light-surface {
    background: var(--theme-light-surface);
    color: var(--theme-txt-on-light-surface);
  }

  .--uai-error {
    background: var(--theme-error);
    color: var(--theme-txt-on-signal-color);
  }

  .--uai-warning {
    background: var(--theme-warning);
    color: var(--theme-txt-on-signal-color);
  }

  .--uai-info {
    background: var(--theme-info);
    color: var(--theme-txt-on-signal-color);
  }

  .--uai-success {
    background: var(--theme-success);
    color: var(--theme-txt-on-signal-color);
  }

  .--uai-neutral {
    background: var(--theme-neutral);
    color: var(--theme-txt-on-signal-color);
  }

  .--uai-txt-on-signal-color {
    background: var(--theme-error);
    color: var(--theme-txt-on-signal-color);
  }
</style>
