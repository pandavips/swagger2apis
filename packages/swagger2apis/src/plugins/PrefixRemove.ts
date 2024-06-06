// 擦除url前缀插件

import { IPlugin } from "../plugin";

export const createPrefixRemovePlugin = (prefix: string): IPlugin => {
  return {
    beforeTransform(ctx) {
      const { rawJSON } = ctx;
      const { paths } = rawJSON;
      const newPaths: any = {};
      Reflect.ownKeys(paths).forEach((path) => {
        newPaths[(path as string).slice(prefix.length)] = paths[path];
      });
      ctx.rawJSON.paths = newPaths;
      return ctx;
    }
  };
};
