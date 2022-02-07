# Svelte Package Template

This project use a template for [Svelte](https://svelte.dev/) packages development.
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
### Running the app

You must develop using storybook.

```sh
npm run build # generate production build
npm run test  # run jest tests and snapshot tests
npm run test:ui # run screenshot test with server to view diffs
npm run test:ui-cli # run screenshot test without server (docker must be running)
npm run storybook # run the storybook server
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


## Internal documentation
The internal documentation, with patterns for this project is in storybook, so install the dependencies and run the storybook.
You must find the documentation at "Code of conduct" folder.

## Configuring the linter for Svelte

Learn to configure the linter to work with your code editor in the
[eslint-plugin-svelte3 integrations page](https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/INTEGRATIONS.md).
You can add linter configurations on the file `.eslintrc.cjs` but be careful and
add Typescript related rules only for typescript.

## TODO

* [ ] export multiple bundlers (including service worker)
* [ ] split bundle into js and css, resolving assets import (imgs, fonts, ...)
