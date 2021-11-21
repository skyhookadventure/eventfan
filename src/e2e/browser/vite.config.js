import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [],
  root: path.resolve("./src/e2e/browser/"),
  server: {
    port: 8080,
  },
});
