import { compileTs, writeFileWithEnsureDir } from "../utils";
import prettier from "prettier";
import type { IPlugin } from "../plugin";

// ts file > js file
export const createCompileTS2JSPlugin = (tsconfig = {}, prettierConfig = {}): IPlugin => {
  const blackExtNameList = [".d.ts"];
  return {
    afterWriteFile: async (ctx) => {
      const { writedFileList } = ctx;
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
        await writeFileWithEnsureDir(jsFileFullPath!, content, "utf8");
      }
      return ctx;
    }
  };
};
