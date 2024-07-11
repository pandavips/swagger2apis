import { IContext } from "../app";
import type { IPlugin } from "../plugin";

// 向文本中添加一些额外文本
export const createFileHeaderAppendPlugin = (
  makeString: (node, ctx: IContext) => string,
  testFn: (node, ctx: IContext) => boolean = () => true
): IPlugin => {
  return {
    afterRender(ctx) {
      const { renderRes } = ctx;
      renderRes.forEach((node) => {
        if (testFn(node, ctx)) node.content = makeString(node, ctx) + node.content;
      });
      return ctx;
    }
  };
};

// 警告信息
export const FileHeaderAppendWarning: IPlugin = createFileHeaderAppendPlugin(
  () => `
/**
 * 该文件内容由脚本内容生成,如果有需求,请参考自定义模板的使用:
    // TODO 自定义模板使用文档地址
 *
 *
 */
`
);
// 禁止lint工具的检查
export const FileHeaderAppendNocheck: IPlugin = createFileHeaderAppendPlugin(
  () => `/* eslint-disable */
// @ts-nocheck
`
);

// 导入类型定义文件
export const FileHeaderAppendImportType: IPlugin = createFileHeaderAppendPlugin(
  (_, ctx) => {
    const {
      renderData: { interfaces }
    } = ctx;
    return `import type{ ${[
      ...new Set(
        interfaces.map((typeNode) => {
          return typeNode.interfaceName;
        })
      )
    ].join()} } from "./interfaces.d.ts"`;
  },
  (node) => {
    return node.extName === "ts";
  }
);
