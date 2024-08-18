export const request = () => {
  /**
   * any code
   * Implementing your request function
   */
  return "res";
};

interface IApiInfo {
  url: string;
  method: string;
  data?: any;
  params?: any;
}

export default (apiInfo: IApiInfo, ...args: any) => {
  /**
   * any code
   * Implementing call your request function
   */
  console.log(apiInfo, "apiInfo");
  console.log(args, "args");
  const { url, method, data, params } = apiInfo;
  console.log({
    url,
    method,
    data,
    params
  });
};
