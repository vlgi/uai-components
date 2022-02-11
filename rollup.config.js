import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import execute from "rollup-plugin-execute";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: "umd",
        name,
        sourcemap: true,
        plugins: [
          // we only want to run this once, so we'll just make it part of this output's plugins
          execute([
            "tsc --outDir ./dist --declaration",
            "node scripts/preprocess.js",
          ]),
        ],
      },
    ],
    plugins: [
      svelte({
        preprocess: sveltePreprocess(),
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
    ],
  },
];
