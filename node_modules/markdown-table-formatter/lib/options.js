/**
 * @fileoverview Options configuration for optionator.
 * @author Nicolas Vuillamy
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const optionator = require("optionator");

//------------------------------------------------------------------------------
// Initialization and Public Interface
//------------------------------------------------------------------------------

// exports "parse(args)", "generateHelp()", and "generateHelpForOption(optionName)"
module.exports = optionator({
  prepend: "markdown-table-formatter [options]",
  defaults: {
    concatRepeatedArrays: true,
    mergeRepeatedObjects: true,
  },
  options: [
    {
      option: "check",
      alias: "c",
      type: "Boolean",
      description:
        "Check only (exits 1 if wrongly formatted markdown tables are found)",
    },
    {
      option: "columnpadding",
      alias: "p",
      type: "Int",
      description: "Override table columns padding number of spaces",
    },
    {
      option: "help",
      alias: "h",
      type: "Boolean",
      description: "Show help",
    },
    {
      option: "version",
      alias: "v",
      type: "Boolean",
      description: "Show version",
    },
    {
      option: "verbose",
      alias: "z",
      type: "Boolean",
      description: "Verbose mode",
    },
  ],
  mutuallyExclusive: [["check", "help", "version"]],
});
