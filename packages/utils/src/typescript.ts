import ts from "typescript";
import { readFileAsString } from "./file";

// 编译ts到js
export const compileTs = async (filePath, tsconfig) => {
  const tsFile = await readFileAsString(filePath);
  // 编译 TypeScript 文件
  const res = ts.transpileModule(tsFile, {
    compilerOptions: {
      target: 9,
      module: ts.ModuleKind.ESNext,
      ...tsconfig
    }
  });
  return res;
};
