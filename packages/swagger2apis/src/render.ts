/**
 * 负责将数据与模板结合完成渲染
 */
import { firstUpperCase, removeSpecialCharacter } from "@pdcode/utils";

import { IContext } from "./app";
export const getRenderData = (transformEdJson: any) => {
  const { apis: apisData, interfaces } = transformEdJson;
  return { apis: renderApis(apisData), interfaces };
};

const renderApis = (apisData) => {
  return apisData.map((api) => {
    const { helpInfo } = api;
    const fnName = renderReqFnName(api);
    const description = renderApiDescription(api);
    const paramsInfo = renderParams(api);
    const responseType = renderResponeseType(api);
    const path = renderPath(api);
    const method = renderMethod(api);
    return {
      helpInfo,
      fnName,
      description,
      paramsInfo,
      responseType,
      path,
      method,
      raw: api
    };
  });
};

// 渲染请求函数方法名
export const renderReqFnName = (api) => {
  const { helpInfo } = api;
  const { hasPathParameter } = helpInfo;
  let path = api.path;
  hasPathParameter && (path = api.path.replaceAll(/[{}]/g, "$"));
  return (
    path
      .split("/")
      .slice(1)
      .map((str) => removeSpecialCharacter(firstUpperCase(str)))
      .join("_") + api.method.toUpperCase()
  );
};

// 渲染api描述
export const renderApiDescription = (api) => {
  return `${api.tags}-${api.description}`;
};

// 渲染请求参数列表
export const renderParams = (api) => {
  const { helpInfo, payloadType } = api;
  const { request } = payloadType;
  const { hasPathParameter, hasBodyParameter, hasQueryParameter, hasFormDataParameter } = helpInfo;

  let type = "any";
  let rawType = "any";
  let defaultVal: string = `{}`;

  // 由于文档json数据无法区分属性是否真的为必填,所以默认将所有属性设置为可选,所以这里对interfaceName进行特殊处理:
  // - 如果是对象类型,则将interfaceName设置为`Partial<${interfaceName}>`
  // - 如果是数组类型,则将interfaceName设置为`Partial<${interfaceName}>[]`
  const interfaceNameHandle = (name: string): { name: string; defaultValue: "{}" | "[]" } => {
    if (name.includes("[")) {
      return { name: `Partial<${name.replace("[", "").replace("]", "")}>[]`, defaultValue: "[]" };
    } else {
      return { name: `Partial<${name}>`, defaultValue: "{}" };
    }
  };

  if (hasBodyParameter) {
    const p = request.find((r) => r.pos === "body");
    const res = interfaceNameHandle(p.interfaceName);
    type = res.name;
    defaultVal = res.defaultValue;
    rawType = p.interfaceName;
  } else if (hasPathParameter) {
    type = "string";
    defaultVal = `""`;
  } else if (hasQueryParameter) {
    const p = request.find((r) => r.pos === "query");
    const res = interfaceNameHandle(p.interfaceName);
    type = res.name;
    defaultVal = res.defaultValue;
    rawType = p.interfaceName;
  } else if (hasFormDataParameter) {
    const p = request.find((r) => r.pos === "formData");
    const res = interfaceNameHandle(p.interfaceName);
    type = res.name;
    defaultVal = res.defaultValue;
    rawType = p.interfaceName;
  }

  const show = hasQueryParameter || hasBodyParameter || hasPathParameter || hasFormDataParameter;

  return { type, show, defaultVal, rawType };
};

// 渲染响应值类型
export const renderResponeseType = (api) => {
  const { payloadType } = api;
  const { response } = payloadType;
  if (!response) return null;
  return response.interfaceName;
};

// 渲染请求路径
export const renderPath = (api) => {
  const { helpInfo } = api;
  const { hasPathParameter } = helpInfo;
  let path = api.path;
  hasPathParameter && (path = api.path.replaceAll(/{([^}]*)}/g, "${code}"));
  return path;
};

// 渲染请求方法
function renderMethod(api: any) {
  return api.method.toUpperCase();
}

export default async (ctx: IContext) => {
  const { transformEdJson, plugins } = ctx;
  const { renderFn } = plugins;
  ctx.renderData = getRenderData(transformEdJson);
  return renderFn(ctx);
};
