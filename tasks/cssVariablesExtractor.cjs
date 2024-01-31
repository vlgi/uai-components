/**
 * Usage example from root directory:
 *
 * node tasks/cssVariablesExtractor.js src/components/Badge/Badge.svelte
 */

const fs = require("fs");
const path = require("path");

// Command line params
const filePathParam = process.argv[2];

// Script params
const filePath = path.join(__dirname, "../", filePathParam);

/**
 * This will extract use of css vars like:
 *  in: var(--color, red)
 *  out: {
 *    --color: red
 * }
 *
 *  in: var(--uai-color, var(--color))
 *  out: {
 *    --color: null,
 *    --uai-color: --color,
 * }
 *
 * in: var(--uai-color, var(--color, var(--uai-default)))
 * out: {
 *  --uai-color: --color,
 *  --color: --uai-default,
 *  --uai-default: null,
 * }
 *
 * @param {string} stringCssUsage
 */
function extractCssVarImplicitDefs(stringCssUsage) {
  function extractFn(stringParam) {
    const regExpExtractUsage = new RegExp(/var\((?<key>[^),]*),?(?<value>[^;]*)?\)/, "igm");
    const match = regExpExtractUsage.exec(stringParam);
    if (!match) return [stringParam];
    if (!match.groups.value) return [match.groups.key];

    return [match.groups.key, ...extractFn(match.groups.value)];
  }

  const resolvedUsages = extractFn(stringCssUsage);
  const obj = {};

  for (let idx = 0; idx < resolvedUsages.length; idx++) {
    const element = resolvedUsages[idx];
    const nextElement = resolvedUsages[idx + 1] || null;
    if (/--\w/.test(element)) {
      obj[element] = nextElement;
    }
  }

  return obj;
}

/**
 * This transform something like this:
 * " --switch-background: var(--uai-checkbox-switch-background, #cecece);
     --switch-color: var(--uai-checkbox-switch-color, var(--theme-dark-txt));
     --switch-checked-color: var(
       --uai-checkbox-switch-checked-color,
       var(--switch-color)
     );"
 *
 * To this:
 *
 * {
 *  --switch-background: var(--uai-checkbox-switch-background,#cecece),
 *  ...
 *  --switch-checked-color: var(--uai-checkbox-switch-checked-color,var(--switch-color));
 * }
 *
 * @param {string} fileData
 */
function extractCssVarExplicitDefs(fileData) {
  const regExpExtractVariables = new RegExp(/\s--(?!uai)([^:]|\n)*:([^;]|\n)*;/, "igm");
  const matchs = fileData.match(regExpExtractVariables);
  const matchsCleaned = matchs.map((x) => x.replace(/(\s|\n|;)/gim, "").replace(":", ","));
  return matchsCleaned.reduce((prev, curr) => {
    const implicitFormat = `var(${curr})`;
    return {
      ...extractCssVarImplicitDefs(implicitFormat),
      ...prev,
    };
  }, {});
}

/**
 * Gerado com o chatGPT
 */
function printTable(objectsList) {
  // Obtém os cabeçalhos e o tamanho de cada coluna
  const headers = Object.keys(objectsList[0]);
  const colSizes = headers.map((header) => header.length);

  // Obtém os valores de cada objeto e atualiza o tamanho de cada coluna
  const rows = objectsList.map((obj) => {
    const row = Object.values(obj);
    colSizes.forEach((size, i) => {
      colSizes[i] = Math.max(size, String(row[i]).length);
    });
    return row;
  });

  // Imprime a tabela em Markdown
  const headerRow = headers.map((header, i) => header.padEnd(colSizes[i])).join(" | ");
  const separatorRow = colSizes.map((size) => "-".repeat(size)).join(" | ");
  // eslint-disable-next-line no-console
  console.log(headerRow);
  // eslint-disable-next-line no-console
  console.log(separatorRow);

  // eslint-disable-next-line no-restricted-syntax
  for (const row of rows) {
    const paddedRow = row.map((cell, i) => String(cell).padEnd(colSizes[i]));
    // eslint-disable-next-line no-console
    console.log(paddedRow.join(" | "));
  }
}

fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
  if (!err) {
    const fileData = data;

    /**
     * Extract the explicit css variables like "--color: red;"
     * or "--switch-background: var(--uai-checkbox-switch-background,#cecece),"
     *
     * We will resolve the uses of css variables inside the definitions.
     * This is to force this script works only for who is following our code pattern
     * that says: You must declare before use.
     */
    const explicitCssVars = extractCssVarExplicitDefs(fileData);

    const resolveDependencies = (variable) => {
      if (variable === null) return variable;
      if (!/--/.test(variable)) return variable;
      if (/--uai/.test(variable)) return variable;
      if (/--theme/.test(variable)) return variable.replace("theme", "uai");

      return resolveDependencies(explicitCssVars[variable]);
    };

    const uaiVariables = Object.fromEntries(
      Object.entries(explicitCssVars)
        .filter(([k, _]) => /--uai/.test(k))
        .map(([k, v]) => [k, resolveDependencies(v)])
        .sort((a, b) => {
          if (a[0] < b[0]) {
            return -1;
          }
          if (a[0] > b[0]) {
            return 1;
          }
          return 0;
        })
    );
    printTable(
      Object.entries(uaiVariables).map(([k, v]) => ({
        "CSS Property": k,
        "Description": "",
        "Default": v,
      }))
    );
  } else {
    throw err;
  }
});
