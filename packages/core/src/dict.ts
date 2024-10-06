// 将java类型转换为javascript类型
export const JavaType2JavaScriptType = {
  integer: "number",
  number: "number",
  long: "number",
  string: "string",
  boolean: "boolean",
  array: "array",
  object: "Record<string, any>",
  timestamp: "string",
  any: "any",
  void: "any",
  int: "number",
  double: "number",
  float: "number",
  short: "number",
  byte: "number",
  char: "string",
  date: "string",
  datetime: "string"
};
// js基础类型
export const JS_BASE_TYPE = {
  number: "number",
  string: "string",
  boolean: "boolean",
  any: "any",
  void: "void",
  Map: "Map",
  object: "object",
  "string[]": "string[]",
  "number[]": "number[]",
  "boolean[]": "boolean[]",
  "any[]": "any[]",
  "object[]": "object[]",
  Record: "Record"
};

// js基础类型默认值
export const JS_BASE_TYPE_DEFAULT_VALUE = {
  number: "",
  string: "",
  boolean: ""
};

export const DOCUMENT_URL = {
  // 插件
  PLUGIN: "https://www.npmjs.com/package/swagger2apis#%E6%8F%92%E4%BB%B6%E7%B3%BB%E7%BB%9F%E7%AE%80%E8%BF%B0",
  // 适配器
  ADAPTOR: "https://www.npmjs.com/package/swagger2apis#%E5%85%B3%E4%BA%8E%E9%80%82%E9%85%8D%E5%99%A8",
  // 自定义模板
  CUSTOM_TEMPLATE:
    "https://www.npmjs.com/package/swagger2apis#%E5%85%B3%E4%BA%8E%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E8%87%AA%E5%B7%B1%E7%9A%84%E6%A8%A1%E6%9D%BF",
  // safe mode
  SAFE_MODE: "https://www.npmjs.com/package/swagger2apis#%E5%85%B3%E4%BA%8Esafemode"
};
