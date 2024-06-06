import { compileTs, writeFile } from "@pdcode/utils";
import prettier from "prettier";
import type { IPlugin } from "../plugin";

export const createCompileTS2JSPlugin = (tsconfig = {}, prettierConfig = {}): IPlugin => {
  // 下面的文件不进行编译
  const blackExtNameList = [".d.ts"];
  return {
    afterWriteFile: async (ctx) => {
      const { writedFileList } = ctx;
      // 过滤出ts文件
      const tsFiles = writedFileList.filter((path) => {
        return path.endsWith(".ts") && !blackExtNameList.every((extName) => path.endsWith(extName));
      });
      for await (const filePath of tsFiles) {
        const res = await compileTs(filePath, tsconfig);
        const content = await prettier.format(res.outputText, {
          parser: "typescript",
          printWidth: 200,
          semi: true,
          singleQuote: false,
          ...prettierConfig
        });
        const jsFilePathNoExtName = filePath.split(".").at(-2);
        const jsFileFullPath = jsFilePathNoExtName + `.js`;
        writedFileList.push(jsFileFullPath);
        // 将编译后的 JavaScript 文件写入磁盘
        writeFile(jsFileFullPath!, content);
      }
      return ctx;
    }
  };
};
