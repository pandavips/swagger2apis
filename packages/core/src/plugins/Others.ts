// 让最终产物更加适应
export const ResponsePayloadFormatPlugin = {
  befofeRender: (ctx) => {
    const { apis } = ctx.renderData;
    ctx.renderData.apis = apis.map((api) => {
      api.responseType = `IApisResCommon<${api.responseType}>`;
      return api;
    });
    return ctx;
  },
  beforeWriteFile: (ctx) => {
    const interfacesNode = ctx.renderRes.find((node) => {
      return node.fileName === "interfaces";
    });
    interfacesNode.content =
      interfacesNode.content +
      `declare interface IApisResCommon<T>{
        data: T;
        success: boolean;
        code: string;
        msg: string;
      }`;
    return ctx;
  }
};
