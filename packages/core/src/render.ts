/**
 * 负责将数据与模板结合完成渲染
 */
import { firstUpperCase, removeSpecialCharacter, isString } from "./utils";
import type { IConfig, IContext } from "./app";
import type { ApiInfo, InterfaceInfo } from "./transform";
import { JS_BASE_TYPE, JS_BASE_TYPE_DEFAULT_VALUE } from "./dict";

const PARAMETER_NAME = "parameter";

export interface RenderData {
  apis: ApiInfo[];
  interfaces: InterfaceInfo[];
  namespace: string;
  safe: boolean;
  PARAMETER_NAME: string;
}

export interface RenderRes {
  // 文件内容
  content: string;
  // 文件拓展名
  extName: string;
  // 文件名称
  fileName: string;
}

// 渲染请求参数
export interface ParamsInfo {
  type: string;
  show: boolean;
  defaultVal?: string;
}

export const getRenderData = (ctx: IContext): RenderData => {
  const { transformEdJson, config } = ctx;
  return {
    apis: renderApis(transformEdJson.apis, config),
    interfaces: renderInterfaces(transformEdJson.interfaces),
    namespace: (config.namespace || "").toUpperCase(),
    safe: config.safe!,
    PARAMETER_NAME
  };
};

const renderApis = (apis: ApiInfo[], config: IConfig): ApiInfo[] => {
  return apis.map((api) => ({
    ...api,
    fnName: renderReqFnName(api),
    description: renderApiDescription(api),
    paramsInfo: renderParams(api, config),
    responseType: renderResponseType(api, config),
    path: renderPath(api),
    method: api.method.toUpperCase()
  }));
};

const renderInterfaces = (interfaces: any[]): InterfaceInfo[] => {
  return interfaces.map((it) => ({
    ...it,
    properties: it.properties.map((prop: any) => ({
      ...prop,
      type: renderPropertyType(prop.type)
    }))
  }));
};

// 渲染请求函数方法名
const renderReqFnName = (api: ApiInfo): string => {
  const pathParts: string[] = api.path.split("/").filter(Boolean);
  let methodName: string = pathParts
    .map((part: string) => {
      const cleanPart: string = removeSpecialCharacter(part.replace(/[{}]/g, ""));
      return firstUpperCase(cleanPart);
    })
    .join("_");

  // 如果参数位置在path上,添加_$PATH$后缀
  if (api.parameters && api.parameters.some((param) => param.position === "path")) {
    methodName = `${methodName}_$PATH$`;
  }

  return `${methodName}_${api.method.toUpperCase()}`;
};

// 渲染api描述
const renderApiDescription = (api: ApiInfo): string => `${api.tags.join(", ")}: ${api.description}`;

// 获取参数信息
const renderParams = (api: ApiInfo, config: IConfig): ParamsInfo => {
  const parameters = api.parameters;
  if (!parameters || parameters.length === 0) return { type: "", show: false };

  const parameter = parameters.find((param) => ["path", "query", "body", "formData"].includes(param.position));

  // ! 如果是路径参数,这里武断一点,直接判定为string,但是如果后期路径上有多个参数,这里需要修改
  if (parameter?.position === "path") {
    return {
      type: "string",
      show: true,
      defaultVal: "''"
    };
  }

  const type = parameter?.type ? (JS_BASE_TYPE[parameter?.type] ? JS_BASE_TYPE[parameter.type] : `${config.namespace}.${parameter.type}`) : "";

  // 计算defaultVal
  const defaultVal = JS_BASE_TYPE_DEFAULT_VALUE[type] || "{} as any";

  return {
    type,
    show: !!type,
    defaultVal
  };
};

// 渲染响应类型
const renderResponseType = (api: ApiInfo, config: IConfig): string => {
  const { response } = api;
  if (!response) return "";
  const type = renderType(response, config);
  return `${type}`;
};

// 渲染请求路径
const renderPath = (api: ApiInfo): string => {
  return api.path.replace(/{([^}]*)}/g, `\${${PARAMETER_NAME}}`);
};

// 渲染类型（包括嵌套类型）
const renderType = (type: any, config: IConfig): string => {
  if (!type) return "any";
  if (type.type === "") return `any`;
  // 基础类型或者基础类型数组
  if (JS_BASE_TYPE[type.type]) return type.type;
  // Map类型
  if (type.type.startsWith("Map<")) return type.type;
  // 其他接口类型
  return type.type ? `${config.namespace}.${type.type}` : "any";
};

// 渲染属性类型
const renderPropertyType = (type: any): string => {
  if (!type) return "";
  if (isString(type)) return type;
  if (type.type === "array") return `${renderPropertyType(type.items)}[]`;
  if (type.type === "object") return `${renderPropertyType(type.items)}`;
  return type.type;
};

export default async (ctx: IContext): Promise<RenderRes[]> => {
  const { plugins } = ctx;
  const { renderFn } = plugins;
  ctx.renderData = getRenderData(ctx);
  return renderFn(ctx);
};
