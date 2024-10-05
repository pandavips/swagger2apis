// 显示一些统计信息
import type { IPlugin } from "../plugin";

// 文件内容格式化插件
export const StatisticsPlugin: IPlugin = {
  beforeTransform: async (ctx) => {
    console.time("time consuming");
    return ctx;
  },

  afterWriteFile: async (ctx) => {
    const { renderData } = ctx;

    console.log(`本次生成了${renderData.apis.length}个接口函数`);
    console.log(`本次生成了${renderData.interfaces.length}个接口类型`);

    console.timeEnd("time consuming");
    return ctx;
  }
};
