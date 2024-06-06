import rollupTypescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
// import dts from "rollup-plugin-dts";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
// import nodeResolve from '@rollup/plugin-node-resolve';
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
        file: "dist/index.cjs.js",
        format: "cjs"
      },
      {
        file: "dist/index.esm.mjs",
        format: "esm"
      }
    ],
    plugins: [
      rollupTypescript(),
      commonjs({
        include: /node_modules/
      }),
      json(),
      terser(),
      // nodeResolve(),
      copy({
        targets: [
          // 拷贝模板文件
          { src: "src/template", dest: "dist/" }
        ]
      }),
      rollupTypescript({
        outDir: "dist",
        declarationDir: "dist",
        exclude: "example",
        compilerOptions: tsconfig.compilerOptions
      })
    ],
    external: externalLib
  }
];
