import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,

  target: "es2018",

  external: ["react", "react-dom"],

  splitting: false,
  sourcemap: true,
  clean: true,
});
