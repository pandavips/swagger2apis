import fs from "fs-extra";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取一个目录下所有目录
function getPackages(path) {
  return fs.readdirSync(path).map((name) => resolve(path, name));
}

const dirs = [...getPackages(resolve(__dirname, "../packages"))];

// 在目录执行build命令
function build() {
  dirs.forEach((dir) => {
    const packageJsonPath = resolve(dir, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      execSync("pnpm run build", {
        cwd: dir,
        stdio: "inherit"
      });
    }
  });
}

build();
