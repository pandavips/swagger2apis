import type { IPlugin } from "../plugin";

/** 在api描述中插入载荷类型描述内容,减少上下翻飞 */
export const ApiTypeInDescription: IPlugin = {
  befofeRender: (ctx) => {
    const { renderData } = ctx;
    const { apis, interfaces } = renderData;
    ctx.renderData.apis = apis.map((api) => {
      // 找出对应的类型定义
      const apiInterfaces = interfaces.filter((it) => {
        if (it.interfaceName === api.responseType) {
          it.pos = "res =>>";
          return true;
        }
        if (it.interfaceName === api.paramsInfo.type) {
          it.pos = "req =>>";
          return true;
        }
      });
      // 将类型挂载到api信息上
      api.interfaces = apiInterfaces || [];
      return api;
    });

    return ctx;
  }
};
