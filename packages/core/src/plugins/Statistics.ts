// 显示一些统计信息
import type { IPlugin } from "../plugin";
import { printSuccInfo } from "../utils";

// 文件内容格式化插件
export const StatisticsPlugin: IPlugin = {
  beforeTransform: async (ctx) => {
    console.time("总耗时");
    return ctx;
  },

  afterWriteFile: async (ctx) => {
    const { renderData, renderRes, writedFileList, config } = ctx;

    printSuccInfo(`本次生成代码行数: ${renderRes.map((node) => node.content.split("\n").length).reduce((a, b) => a + b, 0)}`);
    printSuccInfo(`本次生成了${renderData.apis.length}个接口函数`);
    printSuccInfo(`本次生成了${renderData.interfaces.length}个接口类型`);
    printSuccInfo(`输出目录: ${config.outdir}`);
    printSuccInfo(`共输出了${writedFileList.length}个文件,分别为:\n${writedFileList.map((file) => file).join("\n")}`);

    console.timeEnd("总耗时");
    return ctx;
  }
};
