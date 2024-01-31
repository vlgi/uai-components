<script lang="ts">
  const data = [
    {
      title: "Global Spacings",
      key: "global-spacings",
      description: "",
      variables: [
        {
          name: "--uai-global-small-padding",
          default: ".6rem",
          description: "used in small components, like buttons and inputs",
        },
        {
          name: "--uai-global-medium-padding",
          default: ".8rem",
          description: "used in medium components like card and accordions",
        },
        {
          name: "--uai-global-large-padding",
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
        {
          name: "--uai-fields-padding",
          default: "--uai-global-small-padding",
          description: "used at select, input, textarea",
        },
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

    {#each d.variables as v}
      <div class="container">
        <p><b>Variable Name:</b> {v.name}</p>
        <p><b>Default:</b> {v.default}</p>
        <p><b>Description:</b> {v.description}</p>

        {#if d.key === "global-spacings"}
          <div class="card-outter {v.name}">
            <div class="card-inner" />
          </div>
        {/if}

        {#if d.key === "fields-spacings"}
          <input
            type="text"
            class={v.name}
            value="input example"
          />
          <select
            class={v.name}
            name=""
            id=""
          >
            <option value="">select example</option>
          </select>
        {/if}
      </div>
    {/each}
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

  .container {
    margin-top: 1rem;
  }

  .card-outter {
    padding: 2rem;
    background: #5f7b55;
    width: fit-content;
    margin-top: 0.4rem;
  }

  .card-inner {
    width: 4rem;
    height: 4rem;
    background: #547a9d;
  }

  .card-outter.--uai-global-small-padding {
    padding: var(--theme-global-small-padding);
  }

  .card-outter.--uai-global-medium-padding {
    padding: var(--theme-global-medium-padding);
  }

  .card-outter.--uai-global-large-padding {
    padding: var(--theme-global-large-padding);
  }

  .--uai-fields-padding {
    margin-top: 0.4rem;
    padding: var(--theme-global-large-padding);
  }
</style>
