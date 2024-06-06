// 文件内容格式化插件

import type { Options } from "prettier";
import prettier from "prettier";
import type { IPlugin } from "../plugin";

export const createCodeFormatterPlugin = (config: Options = {}): IPlugin => {
  return {
    beforeWriteFile: async (ctx) => {
      const { renderRes } = ctx;
      for await (const node of renderRes) {
        node.content = await prettier.format(node.content, {
          parser: "typescript",
          printWidth: 200,
          semi: true,
          singleQuote: false,
          ...config
        });
      }
      return ctx;
    }
  };
};
export const CodeFormatter: IPlugin = createCodeFormatterPlugin();
