import { isObject, pipeAsync } from "./utils";
import { DefaultRender } from "./plugins/Render";
import type { IContext } from "./app";

export type IPluginLifeCycleFn = (context: IContext) => Promise<IContext> | IContext;

export interface IPlugin {
  // 数据集进行转换前
  beforeTransform?: IPluginLifeCycleFn;
  // 数据集进行转换后
  afterTransform?: IPluginLifeCycleFn;
  // 数据进行渲染前
  beforeRender?: IPluginLifeCycleFn;
  // 数据进行渲染后
  afterRender?: IPluginLifeCycleFn;
  // 文件写入前
  beforeWriteFile?: IPluginLifeCycleFn;
  // 文件写入后
  afterWriteFile?: IPluginLifeCycleFn;
}
export interface IPlugins {
  beforeTransform: IPluginLifeCycleFn[];
  afterTransform: IPluginLifeCycleFn[];
  beforeRender: IPluginLifeCycleFn[];
  afterRender: IPluginLifeCycleFn[];
  beforeWriteFile: IPluginLifeCycleFn[];
  afterWriteFile: IPluginLifeCycleFn[];
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
export const pluginRun = async (ctx: IContext, lifeCycleName: string) => {
  return ctx.plugins[lifeCycleName]?.length && (await pipeAsync(ctx.plugins[lifeCycleName])(ctx));
};

// 创建一个插件容器
export const createPlugins = () => {
  const plugins: IPlugins = {
    beforeTransform: [],
    afterTransform: [],
    beforeRender: [],
    afterRender: [],
    beforeWriteFile: [],
    afterWriteFile: [],
    renderFn: async (ctx) => {
      await pluginRun(ctx, "beforeRender");
      return DefaultRender(ctx);
    }
  };
  // 注册插件api
  const register = (plugin: IPlugin) => {
    if (!isObject(plugin)) throw new Error("请传入一个插件对象");
    Reflect.ownKeys(plugin).forEach((lifeCycle) => plugins[lifeCycle].push(plugin[lifeCycle]));
  };

  return {
    register,
    setRender: (renderFn: RednerFn) => {
      plugins.renderFn = async (ctx) => {
        await pluginRun(ctx, "beforeRender");
        return renderFn(ctx);
      };
    },
    plugins
  };
};
