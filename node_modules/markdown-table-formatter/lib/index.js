#! /usr/bin/env node
"use strict";

const { MarkdownTableFormatter } = require("./markdown-table-formatter");
const { MarkdownTableFormatterCli } = require("./cli");

// Run only if called by script
const runningAsScript = !module.parent;

// Run asynchronously to use the returned status for process.exit
if (runningAsScript) {
  (async () => {
    await new MarkdownTableFormatterCli().run(process.argv);
  })();
}

module.exports = { MarkdownTableFormatter, MarkdownTableFormatterCli };
