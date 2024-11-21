/* eslint-disable */
// @ts-nocheck
/**
 * !The content of the file generated by the template content, if necessary, please refer to the use of custom templates:https://www.npmjs.com/package/swagger2apis#%E5%85%B3%E4%BA%8E%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E8%87%AA%E5%B7%B1%E7%9A%84%E6%A8%A1%E6%9D%BF
 *
 */
import { adaptorFn } from "./request.ts";
/**
 * @description: store: Returnsamapofstatuscodestoquantities
 */
export const Store_InventoryGET = (...args) => {
  const parameter = {
    url: `/store/inventory`,
    method: "GET",
    bonusInfo: {
      namespace: "ALLIN",
      description: "store: Returnsamapofstatuscodestoquantities",
      apiName: "Store_InventoryGET",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
/**
 * @description: store: Placeanorderforapet
 */
export const Store_OrderPOST = (parameter = {}, ...args) => {
  const parameter = {
    url: `/store/order`,
    method: "POST",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "store: Placeanorderforapet",
      apiName: "Store_OrderPOST",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
/**
 * @description: store: ForvalidresponsetryintegerIDswithvalue>=1and<=10.Othervalueswillgeneratedexceptions
 */
export const Store_Order_OrderId_$orderId$GET = (parameter = "", ...args) => {
  const parameter = {
    url: `/store/order/${parameter}`,
    method: "GET",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "store: ForvalidresponsetryintegerIDswithvalue&gt;=1and&lt;=10.Othervalueswillgeneratedexceptions",
      apiName: "Store_Order_OrderId_$orderId$GET",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
/**
 * @description: store: ForvalidresponsetryintegerIDswithpositiveintegervalue.Negativeornon-integervalueswillgenerateAPIerrors
 */
export const Store_Order_OrderId_$orderId$DELETE = (parameter = "", ...args) => {
  const parameter = {
    url: `/store/order/${parameter}`,
    method: "DELETE",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "store: ForvalidresponsetryintegerIDswithpositiveintegervalue.Negativeornon-integervalueswillgenerateAPIerrors",
      apiName: "Store_Order_OrderId_$orderId$DELETE",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
