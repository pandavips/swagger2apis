import path from "node:path";
import fs from "fs-extra";
import { printSuccInfo } from "./conosle";
export * from "./conosle";
export * from "./string";
export * from "./compiler";

// 管道函数
export function pipeAsync(funcs) {
  return async function (input) {
    let result = input;
    for (const func of funcs) {
      result = await func(result);
    }
    return result;
  };
}

// 是否是一个对象
export const isObject = (obj) => {
  return obj !== null && typeof obj === "object";
};

// 在esm中模拟__dirname,调用该函数,返回当前文件所在的目录
export const __dirname_esm = (importMetaUrl) => {
  return new URL(".", importMetaUrl).pathname;
};

// 写入文件内容
export async function writeFileWithEnsureDir(filePath, content, encoding = "utf8") {
  try {
    const dir = path.dirname(filePath);
    await fs.ensureDir(dir);
    await fs.writeFile(filePath, content, encoding);
    printSuccInfo(`${filePath} 写入成功.`);
    return filePath;
  } catch (err) {
    console.error(err);
  }
}
