import rollupTypescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";
import tsconfig from "./tsconfig.json";

import packageJson from "./package.json";

// 打包排除包
const externalLib = packageJson.peerDependencies ? Object.keys(packageJson.peerDependencies) : [];

export default [
  {
    // 核心选项
    input: "src/index.ts",
    output: [
      {
        file: "dist/main.cjs.js",
        format: "cjs"
      },
      {
        file: "dist/main.esm.mjs",
        format: "esm"
      }
    ],
    plugins: [
      commonjs({
        include: /node_modules/
      }),
      json(),
      terser(),
      copy({
        targets: [
          // 拷贝模板文件
          { src: "src/template", dest: "dist/" }
        ]
      }),
      rollupTypescript({
        outDir: "dist",
        declarationDir: "dts",
        exclude: "example",
        compilerOptions: tsconfig.compilerOptions,
        tsconfig: "./tsconfig.json"
      })
    ],
    external: externalLib
  }
];
