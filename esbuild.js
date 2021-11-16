const esbuild = require('esbuild');
const glob = require("glob");

/**
 * Esbuild bundling setup
 * 
 * The aim here is to just load the client initially (and quickly), and then destinations can be loaded asynchronously.
 * To do this we use code splitting and minification.
 */
esbuild.build({
  entryPoints: [
    './src/index.ts', 
    "./src/mocks/index.ts", 
    ...glob.sync("./src/destinations/*/*.ts"),
    ...glob.sync("./src/utils/*.ts")
  ],
  outdir: './dist',
  bundle: true,
  splitting: true,
  minify: true,
  platform: 'browser',
  sourcemap: true,
  format: "esm"
}) 