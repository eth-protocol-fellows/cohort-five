#! /usr/bin/env node
const { MarkdownTableFormatter } = require("./markdown-table-formatter");
const optionsDefinition = require("./options");
const glob = require("glob");

class MarkdownTableFormatterCli {
  "use strict";

  options = {};

  async run(args) {
    this.options = optionsDefinition.parse(args);

    // Show version
    if (this.options.version) {
      let version = process.env.npm_package_version;
      if (!version) {
        try {
          const FindPackageJson = require("find-package-json");
          const finder = FindPackageJson(__dirname);
          version = finder.next().value.version;
        } catch {
          version = "error";
        }
      }
      const message = `markdown-table-formatter version ${version}`;
      console.log(message);
      return { stdout: message };
    }

    // Show help ( index or for an options)
    if (this.options.help) {
      let helpContent = "";
      if (this.options._.length) {
        helpContent = optionsDefinition.generateHelpForOption(
          this.options._[0],
        );
      } else {
        helpContent = optionsDefinition.generateHelp();
      }
      console.info(helpContent);
      return { stdout: helpContent };
    }

    // Processing formatting
    const formatter = new MarkdownTableFormatter(this.options);
    let files = this.options._;
    if (files.length === 0) {
      // use default glob expression **/*.md
      files = glob.sync("**/*.md", {});
    } else if (files.length === 1 && files[0].includes("*")) {
      // use sent glob expression
      files = glob.sync(files[0], {});
    }
    const { status, updates } = await formatter.run(files, this.options);
    // Manage result
    if (status === 0 && updates.length === 0) {
      console.log("No markdown table formatting has been applied.");
    } else if (status === 0 && updates > 0) {
      console.log(
        `Formatted markdown tables in ${
          updates.length
        } files:\n- ${updates.join("\n- ")}`,
      );
    } else if (status === 1) {
      console.log(
        `${
          updates.length
        } files contain markdown tables to format:\n- ${updates.join("\n- ")}`,
      );
    }
    process.exitCode = status;
    return { status, updates };
  }
}

module.exports = { MarkdownTableFormatterCli };
