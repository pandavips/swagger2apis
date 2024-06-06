import fs from "fs";
import path from "node:path";
import url from "node:url";
import { printSuccInfo } from "./conosle";

export const writeFile = async (pathFile: string, content: string) => {
  const resolvePath = path.resolve(pathFile);
  const dirPath = path.join(resolvePath, "../");
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(pathFile, content);
  printSuccInfo("写入文件成功", resolvePath);
  return resolvePath;
};

export const readFileAsString = async (pathFile: string) => {
  return fs.readFileSync(pathFile, "utf-8");
};

// 在esm中获取当前目录
export const getCurrentDirName = (importMetaUrl = import.meta.url) => {
  return path.dirname(url.fileURLToPath(importMetaUrl));
};
