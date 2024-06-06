import { writeFile } from "@pdcode/utils";
import path from "node:path";
import { printSuccInfo } from "@pdcode/utils";
import type { IPlugins, RednerFn } from "./plugin";
import { createPlugins, pluginRun } from "./plugin";
import render from "./render";
import transform from "./transform";

interface Config {
  // 输出目录
  outDir?: string;
}
export interface IContext {
  rawJSON: any;
  plugins: IPlugins;
  config: Config;
  setRender: (renderFn: RednerFn) => void;
  // 转换层处理后的数据
  transformEdJson: any;
  // 待渲染数据
  renderData: any;
  // 最终渲染结果
  renderRes: any[];
  // 写入的文件path列表
  writedFileList: string[];
}

const defaultConfig: Config = {
  outDir: path.join(path.resolve(process.argv[1]), "../")
};
export const create = (rawJSON = "", config?: Config) => {
  const finalConfig = {
    ...defaultConfig,
    ...(config || {})
  };

  const { plugins, register, setRender } = createPlugins();

  const context: IContext = {
    rawJSON,
    plugins,
    setRender,
    config: finalConfig,
    transformEdJson: void 0,
    renderData: void 0,
    renderRes: [],
    writedFileList: []
  };

  const app = {
    // 注册插件
    usePlugin: (plugin) => {
      register(plugin);
    },
    cutstomRender: (renderFn: RednerFn) => {
      setRender(renderFn);
    },
    start: (() => {
      let once = false;
      return async () => {
        if (once) throw new Error("start函数应该只被调用一次,如果你有需求多次处理应该考虑使用插件系统来完成~");
        // 启动转换层
        await pluginRun(context, "beforeTransform");
        context.transformEdJson = transform(context);
        await pluginRun(context, "afterTransform");
        // 启动渲染层
        context.renderRes = await render(context);
        await pluginRun(context, "afterRender");
        // 写入文件
        await pluginRun(context, "beforeWriteFile");
        for await (const node of context.renderRes) {
          const path = (node.path || finalConfig.outDir) + node.fileName + "." + node.extName;
          const file = await writeFile(path, node.content);
          context.writedFileList.push(file);
        }
        await pluginRun(context, "afterWriteFile");
        once = true;
        printSuccInfo("流程完成~enjoy it~");
      };
    })()
  };

  return app;
};

export default create;
