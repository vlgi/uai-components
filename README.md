# Svelte Package Template

This is a template for [Svelte](https://svelte.dev/) packages development.
It includes:

- typescript
- scss
- lint
- jest tests for componentes and modules
- storybook
- screenshot tests
- snapshot tests

This template is based on our [svelte web template](https://gitlab.com/team-tecnologia/templates-and-snippets/svelte-template), but will build for npm packages.

The generated bundle is a single js file, that have inline css and assets (images and fonts). **Please be carefully with your assets to not increase too much the bundle size.**

The package can be used as a npm vanila-js module, as a browser-js-module or as a svelte componente.

This template use storybook, and generate at the master branch an static storybook page, so you can use the storybook as documentation for your package. 

## Getting started

### Creating the project

1. Copy the template with git clone:

```sh
# clone recent files
git clone --depth 1 https://gitlab.com/team-tecnologia/templates-and-snippets/svelte-package-template project-name
# enter the project
cd project-name
# remove git repository
rm -rf .git
```

2. Install the [asdf](https://asdf-vm.com/).

3. Install the [asdf node plugin](https://github.com/asdf-vm/asdf-nodejs).

4. Install the node with asdf:
```sh
asdf install
```

5. Install the node packages:

```sh
npm install
```

6. Change the name, description, git, and others at the `package.json`.

7. Change this readme.md. At `README-example` we have a default use case of the readme if you want to use. **Don't forget to change the examples and the storybook page link.**
    - To keep this doc when you publish your package, you can just alter the file name.

### Running the app

You must develop using storybook.

```sh
npm run build # generate production build
npm run test  # run jest tests and snapshot tests
npm run test:ui # run screenshot test with server to view diffs
npm run test:ui-cli # run screenshot test without server (docker must be running)
npm run storybook # run the storybook server (docker must be running)
```

### Testing
This project have [jest](https://jestjs.io/pt-BR/docs/getting-started) to test js modules and components, [storybook](https://storybook.js.org/), [storybook creevey](https://storybook.js.org/addons/creevey) to screenshot teste and [storyshots](https://storybook.js.org/addons/@storybook/addon-storyshots).

Use all as you needed.

### Deploy
- Version your package with [semver](https://semver.org/lang/pt-BR/).
- Save the version modifications (fix, feat, ...) at the `src/Changelogs.stories.mdx` file.
- Before deploy, make sure that tests pass (jest, screenshot tests, ).
- Deploy normally to [npm](https://docs.npmjs.com/cli/v8/commands/npm-publish).
- On deploy the package the rollup will build.


## Configuring the linter for Svelte

Learn to configure the linter to work with your code editor in the
[eslint-plugin-svelte3 integrations page](https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/INTEGRATIONS.md).
You can add linter configurations on the file `.eslintrc.cjs` but be careful and
add Typescript related rules only for typescript.

## TODO

* [ ] export multiple bundlers (including service worker)
* [ ] split bundle into js and css, resolving assets import (imgs, fonts, ...)

