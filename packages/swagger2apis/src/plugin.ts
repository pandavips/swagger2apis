import { isObject, pipeAsync } from "@pdcode/utils";
import { renderByEta } from "./plugins/Render";
import type { IContext } from "./app";

export interface IPlugin {
  // 数据集进行转换前
  beforeTransform?: (context: IContext) => Promise<IContext> | IContext;
  // 数据集进行转换后
  afterTransform?: (context: IContext) => Promise<IContext> | IContext;
  // 数据进行渲染前
  befofeRender?: (context: IContext) => Promise<IContext> | IContext;
  // 数据进行渲染后
  afterRender?: (context: IContext) => Promise<IContext> | IContext;
  // 文件写入前
  beforeWriteFile?: (context: IContext) => Promise<IContext> | IContext;
  // 文件写入后
  afterWriteFile?: (context: IContext) => Promise<IContext> | IContext;
}
export interface IPlugins {
  beforeTransform: IPlugin[];
  afterTransform: IPlugin[];
  befofeRender: IPlugin[];
  afterRender: IPlugin[];
  beforeWriteFile: IPlugin[];
  afterWriteFile: IPlugin[];
  renderFn: RednerFn;
}

export interface IRenderFnRetureTypeItem {
  content: string;
  extName: string;
  fileName: string;
}
export type IRenderFnRetureType = IRenderFnRetureTypeItem[];
export type RednerFn = (context: IContext) => Promise<IRenderFnRetureType>;

// 执行插件
export const pluginRun = async (ctx: IContext, lifeCycleName) => {
  return ctx.plugins[lifeCycleName]?.length && (await pipeAsync(ctx.plugins[lifeCycleName])(ctx));
};

// 创建一个插件容器
export const createPlugins = () => {
  const plugins: IPlugins = {
    beforeTransform: [],
    afterTransform: [],
    befofeRender: [],
    afterRender: [],
    beforeWriteFile: [],
    afterWriteFile: [],
    renderFn: async (ctx) => {
      await pluginRun(ctx, "befofeRender");
      return renderByEta(ctx);
    }
  };

  return {
    // 注册插件api
    register: (plugin) => {
      if (!isObject(plugin)) throw new Error("请传入一个插件对象");
      Reflect.ownKeys(plugin).forEach((lifeCycle) => plugins[lifeCycle].push(plugin[lifeCycle]));
    },
    setRender: (renderFn: RednerFn) => {
      plugins.renderFn = async (ctx) => {
        await pluginRun(ctx, "befofeRender");
        return renderFn(ctx);
      };
    },
    plugins
  };
};
