import Pinyin from "pinyin";

// 判断是否是对象
export const isObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

// 判断是否是一个数组
export const isArray = (obj: any) => {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

// 判断是否是一个函数
export const isFunction = (obj: any) => {
  return Object.prototype.toString.call(obj) === "[object Function]";
};

// 判断是否是一个字符串
export const isString = (obj: any) => {
  return Object.prototype.toString.call(obj) === "[object String]";
};

// 判断是否是一个Promise
export const isPromise = (obj: any) => {
  return isObject(obj) && isFunction(obj.then) && isFunction(obj.catch) && !isFunction(obj.constructor);
};

// 单词首字母大写
export const firstUpperCase = (str: string) => str.replace(/^\S/, (s: string) => s.toUpperCase());

// 汉字转拼音首字母大写函数
export const chineseCharacter2pinyin = (character: string) => {
  if (!character) return "";
  return Pinyin(character, {
    style: Pinyin.STYLE_NORMAL
  })
    .map((p: any[]) => firstUpperCase(p[0]))
    .join("")
    .replace(/[^a-zA-Z ]/g, "");
};

// 去除字符串中所有特殊字符
export const removeSpecialCharacter = (str: string) => {
  if (!str) return "";
  // 某些字符需要保留
  const reserved = ["$"];
  // return str.replace(/[^\w\s]/gi, "");
  return str.replace(new RegExp(`[^\\w\\s${reserved.join("")}]`, "gi"), "");
};

// 判断是否是一个http url
export const isHttpUrl = (str: string) => {
  return /^https?:\/\//.test(str);
};

// 在字符串指定起始位置替换为新的字符串内容
export function replaceInRange(originalString: string, start: number, end: number, newContent: string) {
  const before = originalString.slice(0, start);
  const after = originalString.slice(start + Math.abs(end - start));
  return before + newContent + after;
}
