const { emptyDirSync } = require("fs-extra");
const { join, sep } = require("path");
const esbuild = require("esbuild");
const glob = require("tiny-glob");

/**
 * Build the browser bundle
 *
 * For use from a `<script/>` tag.
 */
async function browserBundle() {
  const outputDir = join(__dirname, "./dist/browser");

  // Empty the output directory
  emptyDirSync(outputDir);

  // Build Client
  esbuild.build({
    bundle: true,  
    entryPoints: ["./src/client/EventFan.ts"],
    format: "iife",
    globalName: "EventFan",
    minify: true,
    outfile: join(outputDir, "./index.js"),
    platform: "browser",
    sourcemap: false,
    treeShaking: true
  });

  // Build destinations
  const entryPoints = await glob(join(__dirname, "./src/destinations/*/*.ts"));
  entryPoints.forEach(entry => {
    const fileName = entry.split(sep).pop();

    esbuild.build({
      bundle: true, 
      entryPoints: [entry],
      format: "iife",
      globalName: fileName.replace(".ts", ""),
      minify: true,
      outfile: join(outputDir, "/destinations/", `./${fileName}`),
      platform: "browser",
      sourcemap: false,
      treeShaking: true
    });
  })
}

browserBundle();
