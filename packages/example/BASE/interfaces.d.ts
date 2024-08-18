/* eslint-disable */
// @ts-nocheck

/**
 * The content of the file generated by the template content, if necessary, please refer to the use of custom templates:https://www.npmjs.com/package/swagger2apis#%E5%85%B3%E4%BA%8E%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E8%87%AA%E5%B7%B1%E7%9A%84%E6%A8%A1%E6%9D%BF
 *
 */
declare namespace BASE {
  interface IOrder {
    /**没有提供描述 */
    id?: number;
    /**没有提供描述 */
    petId?: number;
    /**没有提供描述 */
    quantity?: number;
    /**没有提供描述 */
    shipDate?: string;
    /**OrderStatus */
    status?: string;
    /**没有提供描述 */
    complete?: boolean;
  }
  interface ICategory {
    /**没有提供描述 */
    id?: number;
    /**没有提供描述 */
    name?: string;
  }
  interface IUser {
    /**没有提供描述 */
    id?: number;
    /**没有提供描述 */
    username?: string;
    /**没有提供描述 */
    firstName?: string;
    /**没有提供描述 */
    lastName?: string;
    /**没有提供描述 */
    email?: string;
    /**没有提供描述 */
    password?: string;
    /**没有提供描述 */
    phone?: string;
    /**UserStatus */
    userStatus?: number;
  }
  interface ITag {
    /**没有提供描述 */
    id?: number;
    /**没有提供描述 */
    name?: string;
  }
  interface IPet {
    /**没有提供描述 */
    id?: number;
    /**没有提供描述 */
    category?: ICategory;
    /**没有提供描述 */
    name?: string;
    /**没有提供描述 */
    photoUrls?: string[];
    /**没有提供描述 */
    tags?: ITag[];
    /**petstatusinthestore */
    status?: string;
  }
  interface IApiResponse {
    /**没有提供描述 */
    code?: number;
    /**没有提供描述 */
    type?: string;
    /**没有提供描述 */
    message?: string;
  }
  interface IPetfindByStatusQueryParams {
    /**Statusvaluesthatneedtobeconsideredforfilter */
    status?: string[];
  }
  interface IPetfindByTagsQueryParams {
    /**Tagstofilterby */
    tags?: string[];
  }
  interface IUserloginQueryParams {
    /**Theusernameforlogin */
    username?: string;
    /**Thepasswordforloginincleartext */
    password?: string;
  }
}

global.BASE = BASE;
