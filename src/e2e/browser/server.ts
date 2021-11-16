/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path");
const liveServer = require("live-server");
const { build } = require("esbuild");

/**
 * Hot Re-loading Server
 *
 * Can be used with `yarn dev`
 */
async function server() {
  // Hot re-loading with esbuild
  await build({
    bundle: true,
    entryPoints: [join(__dirname, "./index.ts")],
    incremental: true,
    minify: false,
    outfile: join(__dirname, "public/dist/index.js"),
    watch: true,
  });

  // Serve the http file with liveServer
  liveServer.start({
    open: true,
    port: 8080,
    root: join(__dirname, "public"),
  });
}

server();
