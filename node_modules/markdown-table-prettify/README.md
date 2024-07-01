# Markdown table prettifier

[![Test Status](https://github.com/darkriszty/MarkdownTablePrettify-VSCodeExt/workflows/Tests/badge.svg)](https://github.com/darkriszty/MarkdownTablePrettify-VSCodeExt/actions)
[![Visual Studio Code extension](https://img.shields.io/visual-studio-marketplace/v/darkriszty.markdown-table-prettify?color=success&label=VSCode)](https://marketplace.visualstudio.com/items?itemName=darkriszty.markdown-table-prettify)
[![OVSX](https://img.shields.io/open-vsx/v/darkriszty/markdown-table-prettify?color=success&label=Open%20VSX)](https://open-vsx.org/extension/darkriszty/markdown-table-prettify)
[![Docker image](https://img.shields.io/docker/v/darkriszty/prettify-md?color=success&label=Docker)](https://hub.docker.com/r/darkriszty/prettify-md/tags?page=1&ordering=last_updated)
[![NPM package](https://img.shields.io/npm/v/markdown-table-prettify?color=success)](https://www.npmjs.com/package/markdown-table-prettify)

Makes tables more readable for humans. Compatible with the Markdown writer plugin's table formatter feature in Atom.

## Feature highlights

- Remove redundant ending table border if the beginning has no border, so the table _will not end_ with "|".
- Create missing ending table border if the beginning already has a border, so the table _will end_ with "|".
- Save space by not right-padding the last column if the table has no border.
- Support empty columns inside tables.
- Support column alignment options with ":".
- Find and format multiple tables.
- Support \``code blocks`\` and ignore blocks with `<!-- markdown-table-prettify-ignore-start -->` and `<!-- markdown-table-prettify-ignore-end -->`.
- Support indented tables.

## Visual Studio Code

![feature X](assets/animation.gif)

The extension is available for markdown language mode. It can either prettify a selection (`Format Selection`) or the entire document (`Format Document`).
A VSCode command called `Prettify markdown tables` is also available to format the currently opened document. 

### Configurable settings:
- The maximum texth length of a selection/entire document to consider for formatting. Default: 1M chars (limit does not apply from CLI or NPM).
- Additional languages to support formatting for besides `markdown`. See possible configurable values [here](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers). Default: `[ ]`.
- Column padding to make the columns more spaced out from each other. Default: `0` (no extra spacing/padding).
- Keyboard shortcut to prettify the currently opened markdown document. Default: <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>M</kbd> (<kbd>CMD</kbd>+<kbd>ALT</kbd>+<kbd>M</kbd> on Mac).

## NPM

The core formatting logic is available as an NPM package: `npm install --save markdown-table-prettify`. The Typescript code is compiled down to ES5 and shipped inside the package.

It currently exposes the entry point also used by the _CLI_. It can be used from regular NodeJS or web apps:

```JS
import { CliPrettify } from 'markdown-table-prettify';
// or
const { CliPrettify } = require('markdown-table-prettify');

console.log(CliPrettify.prettify(
`hello|world
-|-
foo|bar`));
/* Output:
hello | world
------|------
foo   | bar
*/

// specifying a column padding
console.log(CliPrettify.prettify(
`hello|world
-|-
foo|bar`, { columnPadding: 1 }));
/* Output:
 hello  |  world
 ------ | ------
 foo    |  bar
*/

```

## Docker & CLI

The core formatting logic is available as a node docker image: `docker pull darkriszty/prettify-md` or as a stand alone CLI tool.

Formatting files or checking if they're already formatted is also possible from the command line without docker. This requires `node` and `npm` (optionally also `npx`).

| Feature                               | Docker                                                                        | CLI                                                            |
|---------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------|
| Prettify a file                       | `docker container run -i darkriszty/prettify-md < input.md`                   | `npm run --silent prettify-md < input.md`                      |
| Prettify a file and save the output   | `docker container run -i darkriszty/prettify-md < input.md > output.md`       | `npm run --silent prettify-md < input.md > output.md`          |
| Check whether a file is pretty or not | `docker container run -i darkriszty/prettify-md --check < input.md`           | `npm run --silent check-md < input.md`                         |
| Use `1` as column padding             | `docker container run -i darkriszty/prettify-md --columnPadding=1 < input.md` | `npm run --silent prettify-md -- --columnPadding=1 < input.md` |

> Notes:
> * The prettify check (`--check` or `check-md`) will fail with an exception and return code `1` if the file is not prettyfied.
> * The `--silent` switch sets the NPM log level to silent, which is useful to hide the executed file name and concentrate on the actual output.
> * The `--` after the npm run script part is needed for npm to forward the arguments (for instance `--columnPadding=1`) to the actual prettyfier script.
> * Optionally, use `npx` to prettify files: `npx markdown-table-prettify < input.md` instead of `npm run --silent prettify-md < input.md`.

### Installation

To access the CLI, the extension can either be used from the Github sources, from the already installed VSCode extension or from NPM.

#### Compiling from the source code

- Clone or download the source code.
- Run `npm install`.
- Run `npm run compile`.

#### Using the already installed VSCode extension

Locate the installed extension path. The typical location of the installed extension:
- Windows: `%USERPROFILE%\.vscode\extensions\darkriszty.markdown-table-prettify-{version}`
- macOS: `~/.vscode/extensions/darkriszty.markdown-table-prettify-{version}`
- Linux: `~/.vscode/extensions/darkriszty.markdown-table-prettify-{version}`

#### Getting it from NPM

Install the NPM package `npm install -g markdown-table-prettify`. 

## Known Issues

- Tables with mixed character widths (eg: CJK) are not always properly formatted (issue #4).