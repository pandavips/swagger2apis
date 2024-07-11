import ts from "typescript";
import fs from "fs-extra";

export const compileTs = async (filePath, tsconfig) => {
  const tsFile = await fs.readFile(filePath, "utf8");
  const res = ts.transpileModule(tsFile, {
    compilerOptions: {
      target: 9,
      module: ts.ModuleKind.ESNext,
      ...tsconfig
    }
  });
  return res;
};
