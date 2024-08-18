# swagger2apis 3.x

根据文档json快速生成api接口定义文件,从繁琐低级的工作中抽身,降低沟通成本,支持渐进式的引入.后端更新接口文档>我们重新说生成>后端的所有修改在git的diff下一目了然.

在3.x中我们只生产数据,而数据的消费方式完全由你来决定,这意味着更高的灵活性以及拓展性.

## 安装

```shell
# 强烈建议使用蚂蚁大佬的ni,因为可以无视包管理器差异
npm i @antfu/ni -g
# 然后
ni swagger2apis -D
```

## 使用

在你项目中任意位置新建一个脚本,内容如下:

```js
import path from "node:path";
import { create, __dirname_esm, createCodeFormatterPlugin } from "swagger2apis";

const swaggerJSON = "你以任意方式获取到的文档json对象(注意,这里传入的不是字符串,而是parse后的对象)";

const app = create(swaggerJSON, {
  outdir: path.join(
    __dirname_esm(import.meta.url),
    // 这里实际上可以理解为命令空间
    "./apis"
  ),
  // 开关后会影响一些敏感信息的输出,默认关闭
  safe: false
});

// 这里可以传入你自己项目的prettier配置
app.usePlugin(createCodeFormatterPlugin({}));

// 这里传入的是适配器的导入地址,请根据你的实际项目进行调整
app.start("../request.ts");
```

执行一下这个文件,你就会发现你的项目中多了一些文件,这些文件就是我们最终想获取的产物了.

在这个示例中,展示了最简易的常规用法.我们先使用`create`api创建了一个实例,并注册了一个插件,然后调用了start并传入了`适配器(关于适配器,请见下文)`的导入路径;虽然这是最常规的用法,但实际上这已经满足了绝大部分情况.关于更多细节,请继续阅读下文~

## 关于适配器

阅读这一块之前,希望你可以先去阅读下那些新生成的文件,放心,此举不费吹灰之力.你可以在代码中看到,我们生成的接口定义函数最终都会调用一个叫`adaptorFn`函数,并最终返回这个函数执行完毕后的结果.

适配器函数,你其实也可以理解为数据消费函数.我们通过整理json获取到的数据,最终会传递到这个函数里,执行完毕后,而这个函数是需要你自己去实现的,这意味着所传递进去的数据如何被使用,完全取决于你的实现方式,你可以用这个函数去桥接你的请求函数,也可以另做他用.但是我们最主要的场景肯定还是用这个函数来桥接我们的请求函数了.在我们调用`start`的时候,我们需要传递进去这个适配器的导入path,在这个过程中,你可能不会一次成功,多试一两回,观察一下试错再纠正就可以了.

## 插件系统简述

没有实现你的最终需求?或许你需要使用插件来完成这些工作。该工具实现了一个mini的插件系统,以便于实现你的特殊需求。

请容我先用一个流程图来说明这个工具整个运作流程(不涉及自定义插件的影响下)：

```mermaid
graph LR
    A[调用插件的`create`方法获取实例] --> B[使用实例来预先设置插件等信息]
    B --> C[调用实例的`start`方法]
    C --> D[转换层开始工作,它负责将传递进来的数据进行粗加工]
    D --> E[渲染层开始工作,它在接到数据后将其整理成模板文件需要的形状,以避免在模板里写过多的逻辑;渲染层会将所有需要生成的内容组织成一个文件列表]
    E --> F[写入层开始工作,将所有文件列表写入,完成整个流程]
```

我们清楚了这个流程更容易让我么理解插件的运行机制,我们的插件其实无非就是在这些声明周期之间插入我们自己的逻辑,所以我们理所当然的想到,我们的插件也应该会有生命周期的存在,是的:

```ts
export interface IPlugin {
  // 数据集进行转换前
  beforeTransform?: (context: IContext) => Promise<IContext> | IContext;
  // 数据集进行转换后
  afterTransform?: (context: IContext) => Promise<IContext> | IContext;
  // 数据进行渲染前
  befofeRender?: (context: IContext) => Promise<IContext> | IContext;
  // 数据进行渲染后
  afterRender?: (context: IContext) => Promise<IContext> | IContext;
  // 文件写入前
  beforeWriteFile?: (context: IContext) => Promise<IContext> | IContext;
  // 文件写入后
  afterWriteFile?: (context: IContext) => Promise<IContext> | IContext;
}
```

一个插件至少有一个或者更多的生命周期钩子才能称得上是一个插件.我们可以分别在关键节点使用插件的钩子来插入我们自己的逻辑,来干预最终的运行结果.你可能会好奇,为什么需要`xxxafter`和`xxxbefore`,难道不可以在关键节点之间放置一个钩子隔离即可吗?这样确实可以,但是我们还是细分了钩子,这样是为了在未来更好的让我们的逻辑放置到更清晰的层级.

下边就是一个插件,它的作用是在我们将ts编译为js后,删除掉原先ts文件的功能:

```js
// 删除ts文件插件
const DeleteTsFilePlugin = {
  afterWriteFile: async (ctx) => {
    const { writedFileList } = ctx;
    // 过滤出ts文件
    const tsFileList = writedFileList.filter((item) => item.endsWith(".ts") && !item.endsWith(".d.ts"));
    // 然后删除掉
    tsFileList.forEach((file) => {
      fs.unlinkSync(file);
    });
    return ctx;
  }
};
```

它使用了`afterWriteFile`钩子来完成了工作,并从`ctx`参数拿到关键数据完成了后续的工作.这个ctx你可以理解为全局上下文,插件每一个插件的生命周期都会接收到它,它是这样一个接口形状:

```ts
export interface IContext {
  // 传递进来的原始数据
  rawJSON: any;
  // 目前加载的插件集,所以你甚至可以使用插件来操作插件
  plugins: IPlugins;
  // 配置
  config: Config;
  // 设置渲染层函数.是的,你可以直接使用自己的渲染器来接管整个渲染工作
  setRender: (renderFn: RednerFn) => void;
  // 转换层处理后的数据
  transformEdJson: any;
  // 渲染层处理后,待渲染数据
  renderData: any;
  // 结合模板形成最终渲染结果,其实描述为待写入项数据更贴切
  renderRes: any[];
  // 写入的文件path列表
  writedFileList: string[];
}
```

这样我们就很清楚的了解了插件的运行流程了,总结就是一个插件可以有多个生命周期钩子,他们会在关键节点插入我们自己的逻辑来完成需求.

## 关于如何使用自己的模板

关于本项目使用的模板引擎,目前使用版本:3.1.1(几乎没有学习成本,模板引擎都大同小异):
<https://www.npmjs.com/package/eta>

默认项目模板位置(安装该包后,你可以将其复制出来继续自己的加工):`\node_modules\swagger2apis\dist\template`,
然后就是实现并设置自己的渲染器

```js
import { Eta } from "eta";
const MyRender = async (ctx) => {
  const { renderData } = ctx;
  const eta = new Eta({
    views: "你的模板文件夹路径"
  });
  return [
    {
      content: eta.render("./apis", renderData),
      extName: "ts",
      fileName: ENTRY_FILE_NAME
    },
    {
      content: eta.render("./interfaces", renderData),
      extName: "d.ts",
      fileName: "interfaces"
    }
  ];
};
app.cutstomRender(MyRender);
```

这样你就可以为所欲为的生成任意内容了~

## 关于safemode

这个选项的配置会影响最终生成的文件内容,如果开启safemode,那么生成的文件中会尽可能的将敏感信息移除.主要用途是为了增加安全性,最直接的副作用是会减少提供给适配器函数的数据量,仅提供网络请求所需的基本数据.

## 最后

`openapi3`的用户可以使用转换工具将文档json转换swagger2的格式,然后再尝试使用本工具.

我司内部使用的东西,所以可能出现没有覆盖到你的需求,以及未知的边缘case,如果出现的问题,欢迎提交issue或者pr.
