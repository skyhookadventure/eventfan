import { emptyDirSync } from "fs-extra";
import { join } from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require("esbuild");

/**
 * Build the browser bundle
 *
 * Should be imported using `<script/>` tags and then used with the global variable `EventFan`.
 */
function buildBrowserBundle() {
  const outputDir = join(__dirname, "../distBrowser/");

  // Empty the output directory
  emptyDirSync(outputDir);

  // Build
  esbuild.build({
    bundle: true,
    entryPoints: ["./src/index.ts"],
    format: "iife",
    globalName: "EventFan",
    minify: true,
    outfile: join(outputDir, "./index.js"),
    platform: "browser",
    sourcemap: false,
  });
}

buildBrowserBundle();
