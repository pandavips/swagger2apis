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
  parameter?: any;
  bonusInfo: any;
}

export const adaptorFn = (apiInfo: IApiInfo, ...args: any): any => {
  /**
   * any code
   * Implementing call your request function
   */
  console.log(apiInfo, "apiInfo");
  console.log(args, "args");
  const { url, method, data, parameter } = apiInfo;
  console.log({
    url,
    method,
    data,
    parameter
  });
};
