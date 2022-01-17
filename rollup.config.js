/* eslint-disable global-require */
import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from "autoprefixer";
import minify from "postcss-minify";
import styles from "rollup-plugin-styles";
import url from "@rollup/plugin-url";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

const config = {
  input: "src/main.ts",
  output: [
    { file: pkg.module, format: "es" },
    { file: pkg.main, format: "umd", name },
  ],
  plugins: [
    del({ targets: "dist" }),

    // We'll inject inline dependencies like, fonts, imgs, and others.
    // This can increase significantly your bundle
    url({
      limit: 104857600, // The file size limit for inline files in bytes
    }),

    svelte({
      // emitCss: true,
      preprocess: sveltePreprocess({}),
    }),

    // we'll inject any component SCSS into
    // js file
    styles({
      plugins: [autoprefixer, minify],
      use: ["sass"],
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    typescript(),

    // minify
    terser(),
  ],
};

export default config;
