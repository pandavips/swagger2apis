// 兼容以前版本的一些插件
import type { IPlugin } from "../plugin";
import { firstUpperCase } from "@pdcode/utils";
import { printWarnInfo } from "@pdcode/utils";

// 兼容以前版本的请求方法名
export const CompatibleApiFnNameOnOldversionHandle: IPlugin = {
  befofeRender(ctx) {
    const { renderData } = ctx;
    const { apis } = renderData;

    // 检测重复key的数据支撑
    const keyMap = new Set<string>();

    ctx.renderData.apis = apis
      .map((api) => {
        const { helpInfo, fnName } = api;
        // 首先去掉下划线
        const newFnName = fnName.replaceAll("_", "");
        // 检查是否有重复的key
        if (keyMap.has(newFnName)) {
          printWarnInfo(`检测到重复方法名[${newFnName}]的出现,原方法名[${fnName}]跳过本次兼容`);
          return api;
        }
        keyMap.add(newFnName);
        api.fnName = newFnName;

        // path参数处理,在以前的版本中出现过两种命名方案 bycode和bycode[codename]
        if (helpInfo.hasPathParameter) {
          // 匹配$xxx$
          const reg = /\$(.*?)\$/;
          const matchRes = api.fnName.match(reg);
          if (!matchRes) return [api];
          const codeName = matchRes[1];
          const fnName1 = api.fnName.replace(`$${codeName}$`, "ByCode");
          const fnName2 = api.fnName.replace(`$${codeName}$`, "ByCode" + firstUpperCase(codeName));
          return [
            api,
            {
              ...api,
              fnName: fnName1
            },
            {
              ...api,
              fnName: fnName2
            }
          ];
        }
        return api;
      })
      .flat();
    return ctx;
  }
};
