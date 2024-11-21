/* eslint-disable */
// @ts-nocheck
/**
 * !The content of the file generated by the template content, if necessary, please refer to the use of custom templates:https://www.npmjs.com/package/swagger2apis#%E5%85%B3%E4%BA%8E%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E8%87%AA%E5%B7%B1%E7%9A%84%E6%A8%A1%E6%9D%BF
 *
 */
import { adaptorFn } from "./request.ts";
/**
 * @description: user: Thiscanonlybedonebytheloggedinuser.
 */
export const UserPOST = (parameter = {}, ...args) => {
  const parameter = {
    url: `/user`,
    method: "POST",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "user: Thiscanonlybedonebytheloggedinuser.",
      apiName: "UserPOST",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
/**
 * @description: user: Createslistofuserswithgiveninputarray
 */
export const User_CreateWithArrayPOST = (parameter = {}, ...args) => {
  const parameter = {
    url: `/user/createWithArray`,
    method: "POST",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "user: Createslistofuserswithgiveninputarray",
      apiName: "User_CreateWithArrayPOST",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
/**
 * @description: user: Createslistofuserswithgiveninputarray
 */
export const User_CreateWithListPOST = (parameter = {}, ...args) => {
  const parameter = {
    url: `/user/createWithList`,
    method: "POST",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "user: Createslistofuserswithgiveninputarray",
      apiName: "User_CreateWithListPOST",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
/**
 * @description: user: Logsuserintothesystem
 */
export const User_LoginGET = (...args) => {
  const parameter = {
    url: `/user/login`,
    method: "GET",
    bonusInfo: {
      namespace: "ALLIN",
      description: "user: Logsuserintothesystem",
      apiName: "User_LoginGET",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
/**
 * @description: user: Logsoutcurrentloggedinusersession
 */
export const User_LogoutGET = (...args) => {
  const parameter = {
    url: `/user/logout`,
    method: "GET",
    bonusInfo: {
      namespace: "ALLIN",
      description: "user: Logsoutcurrentloggedinusersession",
      apiName: "User_LogoutGET",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
/**
 * @description: user: Getuserbyusername
 */
export const User_Username_$username$GET = (parameter = "", ...args) => {
  const parameter = {
    url: `/user/${parameter}`,
    method: "GET",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "user: Getuserbyusername",
      apiName: "User_Username_$username$GET",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
/**
 * @description: user: Thiscanonlybedonebytheloggedinuser.
 */
export const User_Username_$username$PUT = (parameter = "", ...args) => {
  const parameter = {
    url: `/user/${parameter}`,
    method: "PUT",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "user: Thiscanonlybedonebytheloggedinuser.",
      apiName: "User_Username_$username$PUT",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
/**
 * @description: user: Thiscanonlybedonebytheloggedinuser.
 */
export const User_Username_$username$DELETE = (parameter = "", ...args) => {
  const parameter = {
    url: `/user/${parameter}`,
    method: "DELETE",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "user: Thiscanonlybedonebytheloggedinuser.",
      apiName: "User_Username_$username$DELETE",
    },
  };
  const responese = adaptorFn(parameter, ...args);
  return responese;
};
