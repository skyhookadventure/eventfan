import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve("./src/e2e/react/"),
  server: {
    port: 8080,
  },
});
