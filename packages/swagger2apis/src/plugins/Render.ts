import { getCurrentDirName } from "@pdcode/utils";
import { Eta } from "eta";
import path from "node:path";
import type { RednerFn } from "../plugin";

// 入口文件名称
const ENTRY_FILE_NAME = "ApisCreator";

// 默认渲染函数
export const DefaultRender: RednerFn = async (ctx) => {
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
