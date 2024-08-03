import path from "node:path";
import { create, __dirname_esm, createFileHeaderAppendPlugin } from "swagger2apis";

import swaggerJSON from "./json/swagger_2.json" assert { type: "json" };

const plugins = [
  createFileHeaderAppendPlugin(
    () => `import adaptorFn from './api/adaptorFn'
  `,
    (node) => {
      return node.extName === "ts";
    }
  )
];

const repeatCount = 9999;
const jsonRes = {
  ...swaggerJSON,
  paths: Reflect.ownKeys(swaggerJSON.paths).reduce((pre, key) => {
    const obj = {};
    for (let i = 0; i < repeatCount; i++) {
      obj[key + i] = swaggerJSON.paths[key];
    }
    return {
      ...pre,
      ...obj
    };
  }, swaggerJSON.paths)
};

const app = create(jsonRes, {
  outdir: path.join(__dirname_esm(import.meta.url), "./out")
});
plugins.forEach(app.usePlugin);
app.start("../xxx/xxx");
