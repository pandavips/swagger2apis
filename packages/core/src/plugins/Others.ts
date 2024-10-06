import { IPlugin } from "../plugin";
import fs from "node:fs";

// 有些后端喜欢在外层包一层状态层, 这个插件可以将响应标注也包裹一层状态层,你可以进行修改使用
export const createResponseWrapperPlugin = (
  interfaceName: string = `IApiResponse`,
  interfaceType: string = `
  declare interface ${interfaceName}<T>{data: T;
    success: boolean;
    code: string;
    msg: string;
  }
    `
): IPlugin => {
  return {
    befofeRender: (ctx) => {
      const { apis } = ctx.renderData;
      ctx.renderData.apis = apis.map((api) => {
        api.responseType = `${interfaceName}<${api.responseType}>`;
        return api;
      });
      return ctx;
    },
    beforeWriteFile: (ctx) => {
      const interfacesNode = ctx.renderRes.find((node) => {
        return node.extName === "d.ts";
      });
      interfacesNode!.content = interfaceType + interfacesNode!.content;
      return ctx;
    }
  };
};

// 清理工作目录
export const CleanDirPlugin = {
  beforeWriteFile: (ctx) => {
    const outDir = ctx.config.outdir;
    if (fs.existsSync(outDir)) {
      fs.rmdirSync(outDir, { recursive: true });
    }
    return ctx;
  }
};
