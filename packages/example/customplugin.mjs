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

const app = create(swaggerJSON, {
  outdir: path.join(__dirname_esm(import.meta.url), "./CUSTOM_PLUGIN")
});

plugins.forEach(app.usePlugin);

app.start("../../xxx");
