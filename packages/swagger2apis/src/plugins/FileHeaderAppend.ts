import { IContext } from "../app";
import type { IPlugin } from "../plugin";

export const createFileHeaderAppendPlugin = (headerString, testFn: (node, ctx: IContext) => boolean = () => true): IPlugin => {
  return {
    afterRender(ctx) {
      const { renderRes } = ctx;
      renderRes.forEach((node) => {
        if (testFn(node, ctx)) node.content = headerString + node.content;
      });
      return ctx;
    }
  };
};

export const warnInfo = `/* eslint-disable */
// @ts-nocheck
/**
 * 该文件内容由脚本内容生成,如需修改,请修改脚本文件后重新生成
 */
`;

// 警告信息插件
export const FileHeaderAppendWarning: IPlugin = createFileHeaderAppendPlugin(warnInfo);
