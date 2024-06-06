import { getCurrentDirName, removeSpecialCharacter } from "@pdcode/utils";
import { Eta } from "eta";
import path from "node:path";
import type { RednerFn } from "../plugin";
import { IContext } from "../app";

// 入口文件名称
const ENTRY_FILE_NAME = "ApisCreator";
const keywords = [
  "abstract",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
  "enum",
  "extends",
  "super",
  "module",
  "import",
  "process"
];

// 默认渲染函数
export const renderByEta: RednerFn = async (ctx) => {
  const { renderData } = ctx;
  const eta = new (Eta as any)({
    views: path.join(getCurrentDirName(import.meta.url), "./template")
  });
  return [
    {
      content: eta.render("./apis", renderData),
      extName: "ts",
      fileName: ENTRY_FILE_NAME
    },
    {
      content: eta.render("./interfaces", renderData),
      extName: "d.ts",
      fileName: "interfaces"
    }
  ];
};

// apis数据整理分组
export const apisRenderDataGrouped = (apis: any[]) => {
  // 整理分组
  const res = new Map();
  apis.forEach((api, index) => {
    const moduleFileName = removeSpecialCharacter(api.path.split("/")[1] || "orphan" + index);
    const moduleDescription = api.raw.tags?.[0];
    const newApi = { ...api, moduleFileName, moduleDescription };
    if (res.has(moduleFileName)) {
      const curApi = res.get(moduleFileName);
      curApi.rows.push(newApi);
      curApi.descriptions.add(moduleDescription);
    } else {
      res.set(moduleFileName, {
        rows: [newApi],
        descriptions: new Set([moduleDescription])
      });
    }
  });

  return res;
};

// 创建汇总入口文件
export const createApiFileEntryRenderData = (apisDataGrouped: Map<string, any>, moduleDirName: string): any => {
  let content = ``;
  const keys = [...apisDataGrouped.entries()].map(([key]) => key);
  [...apisDataGrouped.entries()].map(([key, val]) => {
    content += `// ${[...val.descriptions].join("+")} \n`;
    content += `import ${keywords.includes(key) ? key + "_1" : key} from './${moduleDirName}/${key}'\n`;
  });

  content += `export default (request)=> ({\n`;
  keys.forEach((key) => {
    content += `  ...${keywords.includes(key) ? key + "_1" : key}(request),\n`;
  });
  content += `})\n`;
  return {
    content,
    extName: `ts`,
    fileName: ENTRY_FILE_NAME
  };
};

// 自定义渲染器实现按照组模块化放置api文件
export const createApiFileModularRender = (moduleDirName: string) => {
  return (ctx: IContext) => {
    const { renderData, config } = ctx;
    const { outDir } = config;
    const eta = new (Eta as any)({
      views: path.join(getCurrentDirName(import.meta.url), "./template")
    });
    const { apis } = renderData;
    // 整理分组
    const map = new Map();
    apis.forEach((api) => {
      const moduleFileName = api.path.split("/")[1] || "orphan";
      const moduleDescription = api.raw.tags?.[0];
      const newApi = { ...api, moduleFileName, moduleDescription };
      if (map.has(moduleFileName)) {
        const curApi = map.get(moduleFileName);
        curApi.rows.push(newApi);
        curApi.descriptions.add(moduleDescription);
      } else {
        map.set(moduleFileName, {
          rows: [newApi],
          descriptions: new Set([moduleDescription])
        });
      }
    });

    const apisDataGrouped = apisRenderDataGrouped(apis);
    // 生成渲染数据
    const apisRenderData = [...apisDataGrouped.entries()].map(([key, value]) => {
      return {
        content: eta.render("./apis", { apis: value.rows }),
        extName: `ts`,
        fileName: key,
        path: path.join(outDir!, "./" + moduleDirName + "/")
      };
    });

    // 创建入口文件渲染数据
    const indexRenderData = createApiFileEntryRenderData(apisDataGrouped, moduleDirName);

    return [
      indexRenderData,
      ...apisRenderData,
      {
        content: eta.render("./interfaces", renderData),
        extName: "d.ts",
        fileName: "interfaces"
      }
    ];
  };
};
