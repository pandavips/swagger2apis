import chalk from "chalk";

// 打印绿色成功类信息
export const printSuccInfo = (...args) => {
  console.log(chalk.green(...args));
};

// 打印红色错误类信息
export const printErrInfo = (...args) => {
  console.log(chalk.red(...args));
};

// 打印黄色警告类信息
export const printWarnInfo = (...args) => {
  console.log(chalk.yellow(...args));
};

// 常规信息
export const printInfo = console.log;
