import path from "node:path";
import { create, __dirname_esm, createCodeFormatterPlugin } from "swagger2apis";
import swaggerJSON from "./json/swagger_2.json" assert { type: "json" };

const app = create(swaggerJSON, {
  outdir: path.join(__dirname_esm(import.meta.url), "./BASE"),
  safe: false
});

app.usePlugin(createCodeFormatterPlugin({}));

app.start("../request.ts");
