# Szot UI
See the docs here: [https://team-tecnologia.gitlab.io/public-pkgs/szot-ui/](https://team-tecnologia.gitlab.io/public-pkgs/szot-ui/)

## Running the app
Install the node version defined on `.tool-versions`. You can use `asdf`package to do that.

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

### Extensions

#### Required
We have some required extensions for this project correct formatting, they are:

- ESLint
- EditorConfig

Learn to configure the linter to work with your code editor in the
[eslint-plugin-svelte3 integrations page](https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/INTEGRATIONS.md).
You can add linter configurations on the file `.eslintrc.cjs` but be careful and
add Typescript related rules only for typescript.

#### Suggested

We recommend other useful extensions on `.vscode/extensions.json`. If you are using VSCode editor they will apear as recommended automatically. If not, you can go the file and find the equivalent extensions on your editor.
