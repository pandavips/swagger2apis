import { __dirname_esm, removeSpecialCharacter, chineseCharacter2pinyin } from "../utils";
import { Eta } from "eta";
import path from "node:path";
import type { RednerFn } from "../plugin";

// 入口文件名称
export const ENTRY_FILE_NAME = "Apis";

// 默认渲染函数
export const DefaultRender: RednerFn = async (ctx) => {
  const { renderData } = ctx;
  const eta = new (Eta as any)({
    views: path.join(__dirname_esm(import.meta.url), "./template")
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
      fileName: ENTRY_FILE_NAME
    }
  ];
};

// 分组渲染器
export const GroupRender: RednerFn = async (ctx) => {
  const { renderData } = ctx;
  const { apis } = renderData;
  const eta = new (Eta as any)({
    views: path.join(__dirname_esm(import.meta.url), "./template")
  });

  // 按标签分组API
  const apiGroups = apis.reduce((acc, api) => {
    const tag = api.tags[0] || "other";
    if (!acc[tag]) acc[tag] = [];
    acc[tag].push(api);
    return acc;
  }, {});

  let entryFileContent = ``;

  const renderResApis = Object.entries(apiGroups).map(([tag, groupApis]) => {
    // 模块名,文件名
    const fileName = chineseCharacter2pinyin(removeSpecialCharacter(tag));
    entryFileContent += `
// ${tag}
export * from "./${fileName}"
    `;
    return {
      fileName,
      extName: "ts",
      content: eta.render("./apis", { ...renderData, apis: groupApis })
    };
  });

  // 入口文件
  const entryFile = {
    fileName: ENTRY_FILE_NAME,
    extName: "ts",
    content: entryFileContent
  };

  return [
    {
      content: eta.render("./interfaces", renderData),
      extName: "d.ts",
      fileName: ENTRY_FILE_NAME
    },
    entryFile,
    ...renderResApis
  ];
};
