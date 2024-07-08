import fs from "fs-extra";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 删除制定目录下的node_modules
function removeNodeModules(dirs) {
  dirs.forEach((dir) => {
    const nodeModulesPath = resolve(dir, "node_modules");
    if (fs.existsSync(nodeModulesPath)) {
      fs.removeSync(nodeModulesPath);
    }
  });
}

// 获取一个目录下所有目录
function getPackages(path) {
  return fs.readdirSync(path).map((name) => resolve(path, name));
}

const dirs = [...getPackages(resolve(__dirname, "../example")), ...getPackages(resolve(__dirname, "../packages")), resolve(__dirname, "../")];

removeNodeModules(dirs);
