import path from "node:path";
import {
  __dirname_esm,
  create,
  GroupRender,
  ENTRY_FILE_NAME,
  createCodeFormatterPlugin,
  createResponseWrapperPlugin,
  CleanDirPlugin,
  createCompileTS2JSPlugin,
  MockPlugin
} from "swagger2apis";
// 通常情况下,你的json应该通过网络请求去获取,这里为了方便,所以直接使用静态文件
import swaggerJSON from "./json/swagger_2.json" assert { type: "json" };

const app = create(
  // 注意这里是一个对象,不是字符串
  swaggerJSON,
  {
    outdir: path.join(
      __dirname_esm(import.meta.url),
      // 这里实际上可以理解为命令空间
      "./ALLIN"
    ),
    // 敏感信息开关
    safe: false
  }
);

// 使用代码格式化插件,你可以传入项目中的代码格式化配置来保持代码风格统一
app.usePlugin(createCodeFormatterPlugin({}));

// 有些后端喜欢在外层包一层状态层,这个插件可以将响应标注也包裹一层状态层,你很可能需要根据你司后端的数据结构来进行调整
const ApiResponseWrapperName = "ApiResponseWrapper";
const ApiResponseWrapperType = `
declare interface ${ApiResponseWrapperName}<T>{
  data: T;
  success: boolean;
  code: string;
  msg: string;
}
`;
app.usePlugin(createResponseWrapperPlugin(ApiResponseWrapperName, ApiResponseWrapperType));

// 清理工作目录
app.usePlugin(CleanDirPlugin);

// 使用mock插件
app.usePlugin(MockPlugin);

/**
 * 编译ts文件,(可选)你可以传入tsconfig和prettierConfig来灵活的调整编译配置,
 * 这个插件编译后,ts文件不会删除,因为个人觉得ts文件可以用来当做文档查看,所以没有进行删除
 * 如果你有删除ts文件的需求,可以自行写个插件来删除这些ts文件
 */
app.usePlugin(
  createCompileTS2JSPlugin(
    {
      baseUrl: "./",
      paths: {
        "@/*": ["./src/*"]
      }
    },
    {
      parser: "typescript",
      printWidth: 200,
      semi: true,
      singleQuote: false
    }
  )
);

// 如果你不希望将所有定义都放到一个文件中,可以使用GroupRender来进行分组渲染
const isGroupRender = true;
isGroupRender && app.cutstomRender(GroupRender);

// start不仅仅可以传入字符串,也可以传入一个函数,通过这个函数来灵活的实现适配器的导入
app.start((node) => {
  if (isGroupRender && node.fileName === ENTRY_FILE_NAME) {
    // 这里由于我们使用了GroupRender,主文件就不再需要导入适配器了
    return "";
  } else {
    return "import { adaptorFn } from './request.ts';";
  }
});
