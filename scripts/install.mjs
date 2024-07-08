import { execSync } from "node:child_process";

// 重新安装依赖
function reinstall() {
  execSync("pnpm i", {
    stdio: "inherit"
  });
}

reinstall();
