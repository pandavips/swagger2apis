import path from "node:path";
import { DOCUMENT_URL } from "./dict";
import { printErrInfo, printSuccInfo, printWarnInfo, writeFileWithEnsureDir } from "./utils";
import type { IPlugin, IPlugins, RednerFn } from "./plugin";
import { createPlugins, pluginRun } from "./plugin";
import type { AdaptorPath } from "./plugins";
import type { ApiInfo, InterfaceInfo } from "./transform";
import { FileHeaderAppendWarning, FileHeaderAppendNocheck, FileHeaderAppendAdaptorFnPath } from "./plugins";

import render from "./render";
import type { RenderData, RenderRes } from "./render";
import transform from "./transform";

export interface IConfig {
  // 输出目录
  outdir?: string;
  // 命令空间
  namespace?: string;
  // safe mode
  safe?: boolean;
}

export interface IContext {
  // 传递进来的原始文档json
  rawJSON: any;
  // 插件集
  plugins: IPlugins;
  config: IConfig;
  // 设置渲染函数
  setRender: (renderFn: RednerFn) => void;
  // 转换层处理后的数据
  transformEdJson: {
    apis: ApiInfo[];
    interfaces: InterfaceInfo[];
    raw: any;
  };
  // 待渲染数据
  renderData: RenderData;
  // 最终渲染结果(待写入的文件列表)
  renderRes: RenderRes[];
  // 已经写入的文件path列表
  writedFileList: string[];
}

// 默认配置
const defaultConfig: IConfig = {
  outdir: path.join(path.resolve(process.argv[1]), "../"),
  safe: true
};

export const create = (rawJSON = "", config: IConfig = {}) => {
  printWarnInfo(
    `Currently has ${config.safe ? "Enabled manually" : "Disabled by default"} [SAFE_MODE], for more on safe mode see:${DOCUMENT_URL.SAFE_MODE}`
  );

  const finalConfig = {
    ...defaultConfig,
    ...config
  };
  finalConfig.namespace = config.namespace || path.basename(finalConfig.outdir!);

  const { plugins, register, setRender } = createPlugins();

  const context: IContext = {
    rawJSON: JSON.parse(JSON.stringify(rawJSON).replaceAll(" ", "")),

    plugins,
    setRender,
    config: finalConfig,
    transformEdJson: {
      apis: [],
      interfaces: [],
      raw: {}
    },
    renderData: {} as RenderData,
    renderRes: [],
    writedFileList: []
  };

  const app = {
    // 注册插件
    usePlugin: (plugin: IPlugin) => {
      register(plugin);
      return app;
    },
    cutstomRender: (renderFn: RednerFn) => {
      setRender(renderFn);
      return app;
    },
    start: (() => {
      let once = false;

      return async (adaptorFnPath: AdaptorPath) => {
        if (once)
          throw new Error(`start should only be called once, you may need to use a plugin system for your needs, see the:${DOCUMENT_URL.PLUGIN}`);
        once = true;

        console.time("time consumed");

        if (adaptorFnPath === void 0) {
          return printErrInfo(`Please tell us where to import the adapter, for adapters see:${DOCUMENT_URL.ADAPTOR}`);
        }
        // 注册一些固定的内置插件
        register(FileHeaderAppendAdaptorFnPath(adaptorFnPath));
        register(FileHeaderAppendWarning);
        register(FileHeaderAppendNocheck);

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
          const filepath = path.join(finalConfig.outdir || "", `${node.fileName}.${node.extName}`);

          const file = await writeFileWithEnsureDir(filepath, node.content, "utf8");

          context.writedFileList.push(file);
        }
        await pluginRun(context, "afterWriteFile");

        console.timeEnd("time consumed");

        printSuccInfo("done~enjoy it~");

        return context;
      };
    })()
  };

  return app;
};

export default create;
