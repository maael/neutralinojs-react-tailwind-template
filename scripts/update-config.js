const path = require("path");
const fs = require("fs");
const config = require("../neutralino.config.json");

const projectName = path.basename(process.cwd());

config.modes.window.title = projectName;
config.cli.binaryName = projectName;
config.modes.window.enableInspector = false;
config.globalVariables.ENVIRONMENT = process.env.ENVIRONMENT || "development";
config.modes.browser.globalVariables.ENVIRONMENT =
  process.env.ENVIRONMENT || "development";

fs.writeFileSync(
  path.join(process.cwd(), "neutralino.config.json"),
  JSON.stringify(config, undefined, 2),
  { encoding: "utf-8" }
);
