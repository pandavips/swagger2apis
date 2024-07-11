/**
 * 负责将数据与模板结合完成渲染
 */
import { firstUpperCase, removeSpecialCharacter } from "./utils";

import { IContext } from "./app";
export const getRenderData = (ctx: IContext) => {
  const { transformEdJson, config } = ctx;
  const { interfaces } = transformEdJson;
  return { apis: renderApis(ctx), interfaces, namespace: config.namespace };
};

const renderApis = (ctx: IContext) => {
  const {
    transformEdJson: { apis, interfaces },
    config: { namespace }
  } = ctx;

  return apis.map((api) => {
    const { helpInfo } = api;
    const fnName = renderReqFnName(api);
    const description = renderApiDescription(api);
    const paramsInfo = renderParams(api, namespace, interfaces);
    const responseType = renderResponeseType(api, namespace, interfaces);
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

// 类型追加namespace
const appendNamespaceOnTypeName = (name, namespace, interfaces) => {
  if (!name) return name;
  if (
    interfaces.findIndex((iter) => {
      return name.includes(iter.interfaceName);
    }) === -1
  )
    return name;

  return `${namespace}.${name}`;
};

// 渲染请求参数列表
export const renderParams = (api, namespace, interfaces) => {
  const { helpInfo, payloadType } = api;
  const { request } = payloadType;
  const { hasPathParameter, hasBodyParameter, hasQueryParameter, hasFormDataParameter } = helpInfo;

  let type = "any";
  let defaultVal: string = `{}`;

  const interfaceNameHandle = (name: string): { name: string; defaultValue: "{}" | "[]" } => {
    if (name.includes("[")) {
      return { name, defaultValue: "[]" };
    } else {
      return { name, defaultValue: "{}" };
    }
  };

  if (hasBodyParameter) {
    const p = request.find((r) => r.pos === "body");
    const res = interfaceNameHandle(p.interfaceName);
    type = res.name;
    defaultVal = res.defaultValue;
  } else if (hasPathParameter) {
    type = "string";
    defaultVal = `""`;
  } else if (hasQueryParameter) {
    const p = request.find((r) => r.pos === "query");
    const res = interfaceNameHandle(p.interfaceName);
    type = res.name;
    defaultVal = res.defaultValue;
  } else if (hasFormDataParameter) {
    const p = request.find((r) => r.pos === "formData");
    const res = interfaceNameHandle(p.interfaceName);
    type = res.name;
    defaultVal = "";
  }

  const show = hasQueryParameter || hasBodyParameter || hasPathParameter || hasFormDataParameter;
  return { type: appendNamespaceOnTypeName(type, namespace, interfaces), show, defaultVal };
};

// 渲染响应值类型
export const renderResponeseType = (api, namespace, interfaces) => {
  const { payloadType } = api;
  const { response } = payloadType;
  if (!response) return null;
  return `DeepRequired<${appendNamespaceOnTypeName(response.interfaceName, namespace, interfaces)}>`;
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
  const { plugins } = ctx;
  const { renderFn } = plugins;
  ctx.renderData = getRenderData(ctx);
  return renderFn(ctx);
};
