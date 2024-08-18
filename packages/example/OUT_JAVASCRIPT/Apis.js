/* eslint-disable */
// @ts-nocheck
/**
 * The content of the file generated by the script content, if necessary, please refer to the use of custom templates:我是自定义模板使用文档地址
 *
 */
import { adaptorFn } from "../request.ts";
/**
 * @description: pet-Add a new pet to the store
 */
export const PetPOST = (data = {}, ...args) => {
  return adaptorFn(
    {
      url: `/pet`,
      method: "POST",
      data,
      bonusInfo: {
        description: "pet-Add a new pet to the store",
        apiName: "PetPOST",
        dev: { hasPathParameter: false, hasBodyParameter: true, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: pet-Update an existing pet
 */
export const PetPUT = (data = {}, ...args) => {
  return adaptorFn(
    {
      url: `/pet`,
      method: "PUT",
      data,
      bonusInfo: {
        description: "pet-Update an existing pet",
        apiName: "PetPUT",
        dev: { hasPathParameter: false, hasBodyParameter: true, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: pet-Multiple status values can be provided with comma separated strings
 */
export const Pet_FindByStatusGET = (data = {}, ...args) => {
  return adaptorFn(
    {
      url: `/pet/findByStatus`,
      method: "GET",
      params: data,
      bonusInfo: {
        description: "pet-Multiple status values can be provided with comma separated strings",
        apiName: "Pet_FindByStatusGET",
        dev: { hasPathParameter: false, hasBodyParameter: false, hasQueryParameter: true, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: pet-Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 */
export const Pet_FindByTagsGET = (data = {}, ...args) => {
  return adaptorFn(
    {
      url: `/pet/findByTags`,
      method: "GET",
      params: data,
      bonusInfo: {
        description: "pet-Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.",
        apiName: "Pet_FindByTagsGET",
        dev: { hasPathParameter: false, hasBodyParameter: false, hasQueryParameter: true, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: pet-Returns a single pet
 */
export const Pet_$petId$GET = (code = "", ...args) => {
  return adaptorFn(
    {
      url: `/pet/${code}`,
      method: "GET",
      bonusInfo: {
        description: "pet-Returns a single pet",
        apiName: "Pet_$petId$GET",
        dev: { hasPathParameter: true, hasBodyParameter: false, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: pet-Updates a pet in the store with form data
 */
export const Pet_$petId$POST = (code = "", ...args) => {
  return adaptorFn(
    {
      url: `/pet/${code}`,
      method: "POST",
      data,
      bonusInfo: {
        description: "pet-Updates a pet in the store with form data",
        apiName: "Pet_$petId$POST",
        dev: { hasPathParameter: true, hasBodyParameter: false, hasQueryParameter: false, hasFormDataParameter: true, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: pet-Deletes a pet
 */
export const Pet_$petId$DELETE = (code = "", ...args) => {
  return adaptorFn(
    {
      url: `/pet/${code}`,
      method: "DELETE",
      bonusInfo: {
        description: "pet-Deletes a pet",
        apiName: "Pet_$petId$DELETE",
        dev: { hasPathParameter: true, hasBodyParameter: false, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: true },
      },
    },
    ...args,
  );
};
/**
 * @description: pet-uploads an image
 */
export const Pet_$petId$_UploadImagePOST = (code = "", ...args) => {
  return adaptorFn(
    {
      url: `/pet/${code}/uploadImage`,
      method: "POST",
      data,
      bonusInfo: {
        description: "pet-uploads an image",
        apiName: "Pet_$petId$_UploadImagePOST",
        dev: { hasPathParameter: true, hasBodyParameter: false, hasQueryParameter: false, hasFormDataParameter: true, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: store-Returns a map of status codes to quantities
 */
export const Store_InventoryGET = (...args) => {
  return adaptorFn(
    {
      url: `/store/inventory`,
      method: "GET",
      bonusInfo: {
        description: "store-Returns a map of status codes to quantities",
        apiName: "Store_InventoryGET",
        dev: { hasPathParameter: false, hasBodyParameter: false, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: store-Place an order for a pet
 */
export const Store_OrderPOST = (data = {}, ...args) => {
  return adaptorFn(
    {
      url: `/store/order`,
      method: "POST",
      data,
      bonusInfo: {
        description: "store-Place an order for a pet",
        apiName: "Store_OrderPOST",
        dev: { hasPathParameter: false, hasBodyParameter: true, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: store-For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
 */
export const Store_Order_$orderId$GET = (code = "", ...args) => {
  return adaptorFn(
    {
      url: `/store/order/${code}`,
      method: "GET",
      bonusInfo: {
        description: "store-For valid response try integer IDs with value &gt;= 1 and &lt;= 10. Other values will generated exceptions",
        apiName: "Store_Order_$orderId$GET",
        dev: { hasPathParameter: true, hasBodyParameter: false, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: store-For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
 */
export const Store_Order_$orderId$DELETE = (code = "", ...args) => {
  return adaptorFn(
    {
      url: `/store/order/${code}`,
      method: "DELETE",
      bonusInfo: {
        description: "store-For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors",
        apiName: "Store_Order_$orderId$DELETE",
        dev: { hasPathParameter: true, hasBodyParameter: false, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: user-This can only be done by the logged in user.
 */
export const UserPOST = (data = {}, ...args) => {
  return adaptorFn(
    {
      url: `/user`,
      method: "POST",
      data,
      bonusInfo: {
        description: "user-This can only be done by the logged in user.",
        apiName: "UserPOST",
        dev: { hasPathParameter: false, hasBodyParameter: true, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: user-Creates list of users with given input array
 */
export const User_CreateWithArrayPOST = (data = [], ...args) => {
  return adaptorFn(
    {
      url: `/user/createWithArray`,
      method: "POST",
      data,
      bonusInfo: {
        description: "user-Creates list of users with given input array",
        apiName: "User_CreateWithArrayPOST",
        dev: { hasPathParameter: false, hasBodyParameter: true, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: user-Creates list of users with given input array
 */
export const User_CreateWithListPOST = (data = [], ...args) => {
  return adaptorFn(
    {
      url: `/user/createWithList`,
      method: "POST",
      data,
      bonusInfo: {
        description: "user-Creates list of users with given input array",
        apiName: "User_CreateWithListPOST",
        dev: { hasPathParameter: false, hasBodyParameter: true, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: user-Logs user into the system
 */
export const User_LoginGET = (data = {}, ...args) => {
  return adaptorFn(
    {
      url: `/user/login`,
      method: "GET",
      params: data,
      bonusInfo: {
        description: "user-Logs user into the system",
        apiName: "User_LoginGET",
        dev: { hasPathParameter: false, hasBodyParameter: false, hasQueryParameter: true, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: user-Logs out current logged in user session
 */
export const User_LogoutGET = (...args) => {
  return adaptorFn(
    {
      url: `/user/logout`,
      method: "GET",
      bonusInfo: {
        description: "user-Logs out current logged in user session",
        apiName: "User_LogoutGET",
        dev: { hasPathParameter: false, hasBodyParameter: false, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: user-Get user by user name
 */
export const User_$username$GET = (code = "", ...args) => {
  return adaptorFn(
    {
      url: `/user/${code}`,
      method: "GET",
      bonusInfo: {
        description: "user-Get user by user name",
        apiName: "User_$username$GET",
        dev: { hasPathParameter: true, hasBodyParameter: false, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: user-This can only be done by the logged in user.
 */
export const User_$username$PUT = (code = {}, ...args) => {
  return adaptorFn(
    {
      url: `/user/${code}`,
      method: "PUT",
      data,
      bonusInfo: {
        description: "user-This can only be done by the logged in user.",
        apiName: "User_$username$PUT",
        dev: { hasPathParameter: true, hasBodyParameter: true, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
/**
 * @description: user-This can only be done by the logged in user.
 */
export const User_$username$DELETE = (code = "", ...args) => {
  return adaptorFn(
    {
      url: `/user/${code}`,
      method: "DELETE",
      bonusInfo: {
        description: "user-This can only be done by the logged in user.",
        apiName: "User_$username$DELETE",
        dev: { hasPathParameter: true, hasBodyParameter: false, hasQueryParameter: false, hasFormDataParameter: false, hasHeaderParameter: false },
      },
    },
    ...args,
  );
};
