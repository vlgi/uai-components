# Szot UI
See the docs here: [https://team-tecnologia.gitlab.io/public-pkgs/szot-ui/](https://team-tecnologia.gitlab.io/public-pkgs/szot-ui/)

## Getting started

### Requirements

We will develop inside a container to normalize our dependencies, so you will need:

1. Instal `docker`
2. If in windows install `WSL2`
3. Install the required plugins

### Running the project

1. Copy `./.env.example` to `./.env`
2. Run `docker compose run --service-ports app bash` or `npm run docker:up`

This will create a container with the app node version, and will attach you to the container with the correct node version.

NOTE: The flag `--service-ports` must be used on running the command `run` for the ports binding work.

Inside the container run:

```
npm ci
```

This command will delete node_modules and install from the package-lock.json, to ensure that your dependencies version are equal to the other developers.

and

```
npm run dev
```


### Commands

```sh
npm run dev   # live reloading mode
npm run build # generate production build
npm run start # serve the production build
npm run test  # run jest tests and snapshot tests
npm run test:ui # run screenshot test with server to view diffs
npm run test:ui-cli # run screenshot test without server (docker must be running)
npm run storybook # run the storybook server (docker must be running)
```

## Extensions

### Required
We have some required extensions for this project correct formatting, they are:

- ESLint
- EditorConfig
- Syntax highlighting and Rich intellisense for svelte

Learn to configure the linter to work with your code editor in the
[eslint-plugin-svelte3 integrations page](https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/INTEGRATIONS.md).
You can add linter configurations on the file `.eslintrc.cjs` but be careful and
add Typescript related rules only for typescript.

### Suggested

We recommend other useful extensions on `.vscode/extensions.json`. If you are using VSCode editor they will apear as recommended automatically. If not, you can go the file and find the equivalent extensions on your editor.
