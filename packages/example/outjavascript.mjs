import path from "node:path";
import fs from "node:fs";
import { create, __dirname_esm, createCompileTS2JSPlugin } from "swagger2apis";
import swaggerJSON from "./json/swagger_2.json" assert { type: "json" };

const app = create(swaggerJSON, {
  outdir: path.join(__dirname_esm(import.meta.url), "./OUT_JAVASCRIPT"),
  safe: false
});

// 删除ts文件插件
const DeleteTsFilePlugin = {
  afterWriteFile: async (ctx) => {
    const { writedFileList } = ctx;
    // 过滤出ts文件
    const tsFileList = writedFileList.filter((item) => item.endsWith(".ts"));
    // 然后删除掉
    tsFileList.forEach((file) => {
      fs.unlinkSync(file);
    });
    return ctx;
  }
};

app.usePlugin(createCompileTS2JSPlugin({}));
app.usePlugin(DeleteTsFilePlugin);

app.start("../request.ts");
