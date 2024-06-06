// 管道函数
export function pipeAsync(funcs) {
  return async function (input) {
    let result = input;
    for (const func of funcs) {
      result = await func(result);
    }
    return result;
  };
}
