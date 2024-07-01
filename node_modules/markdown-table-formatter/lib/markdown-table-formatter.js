#! /usr/bin/env node
const debug = require("debug")("markdown-table-formatter");
const fse = require("fs-extra");
const { CliPrettify } = require("markdown-table-prettify");

class MarkdownTableFormatter {
  "use strict";

  /**
   * Creates a MarkdownTableFormatter instance
   * @param {object} [opts] - Run options
   * @param {string} [opts.check] - Define if we check only
   */
  constructor(opts) {
    this.checkOnly = opts.check;
  }

  /**
   * Runs markdown table formatter
   * @param {string[]} [files] - List of files to format
   * @return {Promise<any>} - Command result (status, stdout, stderr, childJavaProcess)
   */
  async run(files, options = {}) {
    if (options.verbose) {
      console.info("Markdown files to analyze:");
      for (const file of files) {
        console.info(`- ${file}`);
      }
    }
    const fileResults = [];
    // Read files and call prettify on each of them
    for (const file of files) {
      if (debug.enabled) {
        debug(`[file] ${file}`);
      }
      const markdown = await fse.readFile(file);
      const markdownString = markdown.toString();
      if (debug.enabled) {
        debug(`[file before]\n${markdownString}`);
      }
      const prettifyOptions = {};
      if (options.columnpadding) {
        prettifyOptions.columnPadding = options.columnpadding;
      }
      const markdownStringPrettified = CliPrettify.prettify(
        markdownString,
        prettifyOptions,
      );
      const updated = markdownStringPrettified !== markdownString;
      // Update file if necessary
      if (updated && !this.checkOnly) {
        await fse.writeFile(file, markdownStringPrettified);
        debug(`[updated] ${file} with:\n${markdownStringPrettified}`);
        if (options.verbose) {
          console.info(`- Updated file ${file}`);
        }
      }
      const fileResult = {
        file,
        updated,
        before: updated ? markdownString : null,
        after: updated ? markdownStringPrettified : null,
      };
      fileResults.push(fileResult);
    }
    const updates = fileResults
      .filter((fileResult) => fileResult.updated)
      .map((fileResult) => fileResult.file);
    let status = 0;
    if (this.checkOnly && updates.length > 0) {
      status = 1;
    }
    const result = {
      status,
      fileResults,
      updates,
    };
    return result;
  }
}

module.exports = { MarkdownTableFormatter };
