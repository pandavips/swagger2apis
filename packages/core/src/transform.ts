/**
 * 转换层,负责将json数据收集整理成方便模板渲染的数据
 */

import { chineseCharacter2pinyin, isString, removeSpecialCharacter } from "./utils";
import { JavaType2JavaScriptType } from "./dict";

let currentApi: any = null;
export const transform = (rawJSON) => {
  // 我们目前只需要关注两个字段就可以完成所有工作
  // path是接口的核心数据
  // definitions是接口的数据交互载荷类型,我们将使用它来生成ts的接口文件
  const { paths, definitions } = rawJSON;

  const interfaces = generateDefinitions(definitions);
  const apis = generateApis(paths);

  return {
    apis,
    interfaces,
    raw: rawJSON
  };
};

// 生成接口数据
export const generateApis = (paths: any): any[] => {
  return Reflect.ownKeys(paths)
    .map((path) => {
      const pathData = paths[path];
      return genApiProps({
        path,
        pathData
      });
    })
    .flat();
};

// 生成api剩余属性
const genApiProps = (data) => {
  const methods = Reflect.ownKeys(data.pathData);
  return methods.map((method) => {
    const methodData = data.pathData[method];
    const { tags, summary, description, responses, parameters: methodDataParameters } = methodData;

    const res = (currentApi = {
      // 分组
      tags,
      // 请求路径
      path: data.path,
      // 请求方法
      method: method,
      // 描述
      description: description || summary || "",
      // 载荷类型
      payloadType: {
        request: null,
        response: resolveResponese(responses)
      },
      // 辅助信息
      helpInfo: null,
      raw: data
    });
    const { parameters, helpInfo } = resolveParameters(methodDataParameters);

    res.helpInfo = helpInfo;
    res.payloadType.request = parameters;

    currentApi = null;
    return res;
  });
};

// 解析参数类型
const resolveParameters = (rawParameters) => {
  const result: any = {
    parameters: [],
    helpInfo: {
      // 是否存在路径参数
      hasPathParameter: false,
      // 是否存在body参数
      hasBodyParameter: false,
      // 是否存在query参数
      hasQueryParameter: false,
      // 是否存在表单参数
      hasFormDataParameter: false,
      // 是否存在header参数
      hasHeaderParameter: false
    }
  };
  rawParameters.forEach((p) => {
    const parameterRes: any = {
      name: "",
      description: "",
      interfaceName: null,
      required: false,
      // 参数位置
      pos: null,
      raw: p
    };
    // 参数位置 path|query|body|formData|header
    const { in: pos, name: pName = "", required, description, schema } = p;

    parameterRes.name = pName;
    parameterRes.description = description;
    parameterRes.required = required;
    parameterRes.pos = pos;

    switch (pos) {
      case "path":
        result.helpInfo.hasPathParameter = true;
        break;
      case "body":
        result.helpInfo.hasBodyParameter = true;
        parameterRes.interfaceName = generateTypeName(schema);
        break;
      case "query":
        if (result.helpInfo.hasQueryParameter) break;
        result.helpInfo.hasQueryParameter = true;
        // query参数汇总处理
        parameterRes.interfaceName = queryParamsHandler(coverQueryParameters2Bodyfit(rawParameters.filter((p: any) => p.in === "query")));
        break;
      case "formData":
        result.helpInfo.hasFormDataParameter = true;
        parameterRes.interfaceName = "FormData"; // query参数汇总处理
        break;
      case "header":
        result.helpInfo.hasHeaderParameter = true;
        break;
      default:
        break;
    }
    result.parameters.push(parameterRes);
  });

  return result;
};

// query参数处理
const queryParamsHandler = (queryProps) => {
  const props = resolveProperties(queryProps);
  const { template, coverProps } = createPropsInfoTemplate();

  const interfaceName = INTERFACE_PREFIX + chineseCharacter2pinyin(removeSpecialCharacter(currentApi.path)) + "QueryParams";
  const description = currentApi.description || currentApi.path + " Query参数";

  coverProps({
    interfaceName,
    props,
    description,
    raw: { props, currentApi }
  });

  (generateDefinitions as any).addInterface(template);

  return interfaceName;
};

// 解析响应数据
const resolveResponese = (responses) => {
  // 我们暂时只关注200正常响应的请求
  const okData = responses["200"];

  const res: any = {
    description: "",
    interfaceName: null,
    raw: okData
  };

  if (!okData) return null;
  const { description, schema } = okData;
  res.description = description;
  res.interfaceName = generateTypeName(schema);
  return res;
};

// 生成类型定义数据
export const generateDefinitions = (definitions: any): any[] => {
  const interfaceList = Reflect.ownKeys(definitions).map((key) => {
    const raw = definitions[key];

    const { properties, required: requiredProps, title: description } = raw;
    const { template, coverProps } = createPropsInfoTemplate();
    coverProps({
      interfaceName: null,
      props: [],
      description: description || "接口文档没有提供描述",
      raw
    });

    // 类型名称
    template.interfaceName = generateTypeName(key);

    // 开始解析属性
    template.props = resolveProperties(properties, requiredProps);

    return template;
  });
  (generateDefinitions as any).addInterface = (node) => {
    interfaceList.push(node);
  };

  return interfaceList;
};

const createPropsInfoTemplate = (props = {}): any => {
  const template = {
    interfaceName: null,
    // 属性集
    props: [],
    // 描述
    description: null,
    raw: null,
    ...props
  };
  return {
    coverProps: (converProps) => {
      return Object.assign(template, converProps);
    },
    template
  };
};

// 转换query参数到body props格式,避免写两套逻辑
const coverQueryParameters2Bodyfit = (parameters: any) => {
  const res = {};
  parameters.forEach((p) => {
    res[p.name] = p;
  });
  return res;
};

// 解析properties
export const resolveProperties = (properties: any, requiredProps: string[] = []) => {
  if (!properties) return [];
  return Reflect.ownKeys(properties).map((propName) => {
    const rawProp = properties[propName];
    const { type, $ref, items, description, allowEmptyValue } = rawProp;

    const prop = {
      // {
      // 字段
      name: propName,
      // 描述
      description: description || "没有提供描述",
      // 类型
      interfaceName: "",
      // 是否必填
      required: !allowEmptyValue || requiredProps.includes(propName as string)
    };
    // 数组类型
    if (items) {
      const { type: itemType, $ref: item$ref } = items;
      // 引用类型
      if (item$ref) {
        prop.interfaceName = generateTypeNameBy$ref(item$ref) + "[]";
      } else {
        // 基础类型
        prop.interfaceName = JavaType2JavaScriptType[itemType] + "[]";
      }
    }
    // 对象类型
    else if ($ref) {
      prop.interfaceName = generateTypeNameBy$ref($ref) + "";
    }
    // 基础类型
    else {
      prop.interfaceName = JavaType2JavaScriptType[type];
    }

    return prop;
  });
};

const INTERFACE_PREFIX = "I";
const generateTypeNameBy$ref = (ref: string) => {
  if (!ref) return null;
  return INTERFACE_PREFIX + chineseCharacter2pinyin(ref.split("definitions/").at(-1)!);
};

// 生成类型名称
const generateTypeName = (schema: any) => {
  // 如果是传递的字符串
  if (isString(schema)) return generateTypeNameBy$ref(schema);
  if (!schema) return null;
  const { type, $ref, items } = schema;
  // 如果是数组,也分两种情况：基础类型数组+引用类型数组
  if (items) {
    const { type: itemType, $ref: item$ref } = items;
    // 引用类型
    if (item$ref) return generateTypeNameBy$ref(item$ref) + "[]";
    // 基础类型
    return JavaType2JavaScriptType[itemType] + "[]";
  }
  // 对象类型
  else if ($ref) {
    return generateTypeNameBy$ref($ref);
  }
  // 基础类型
  else {
    return JavaType2JavaScriptType[type] || JavaType2JavaScriptType["any"] + "[]";
  }
};

export default (context) => {
  const rawJSON = context.rawJSON;
  return transform(rawJSON);
};
