/* eslint-disable */
// @ts-nocheck
/**
 * !The content of the file generated by the template content, if necessary, please refer to the use of custom templates:https://www.npmjs.com/package/swagger2apis#%E5%85%B3%E4%BA%8E%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E8%87%AA%E5%B7%B1%E7%9A%84%E6%A8%A1%E6%9D%BF
 *
 */
import { adaptorFn } from "./request.ts";
/**
 * @description: pet: Addanewpettothestore
 */
export const PetPOST = (parameter = {}, ...args) => {
  const parameter = {
    url: `/pet`,
    method: "POST",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "pet: Addanewpettothestore",
      apiName: "PetPOST",
    },
  };
  for (const hook of [
    () => {
      return {
        action: "mock",
        // value: mockRule
      };
    },
  ]) {
    const result = hook(parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
    if (result.action === "mock") {
      return Promise.resolve(Mock.mock(`@string`));
    }
  }
  const responese = adaptorFn(parameter, ...args);
  for (const hook of []) {
    const result = hook(responese, parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
  }
  return responese;
};
/**
 * @description: pet: Updateanexistingpet
 */
export const PetPUT = (parameter = {}, ...args) => {
  const parameter = {
    url: `/pet`,
    method: "PUT",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "pet: Updateanexistingpet",
      apiName: "PetPUT",
    },
  };
  for (const hook of [
    () => {
      return {
        action: "mock",
        // value: mockRule
      };
    },
  ]) {
    const result = hook(parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
    if (result.action === "mock") {
      return Promise.resolve(Mock.mock(`@string`));
    }
  }
  const responese = adaptorFn(parameter, ...args);
  for (const hook of []) {
    const result = hook(responese, parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
  }
  return responese;
};
/**
 * @description: pet: Multiplestatusvaluescanbeprovidedwithcommaseparatedstrings
 */
export const Pet_FindByStatusGET = (...args) => {
  const parameter = {
    url: `/pet/findByStatus`,
    method: "GET",
    bonusInfo: {
      namespace: "ALLIN",
      description: "pet: Multiplestatusvaluescanbeprovidedwithcommaseparatedstrings",
      apiName: "Pet_FindByStatusGET",
    },
  };
  for (const hook of [
    () => {
      return {
        action: "mock",
        // value: mockRule
      };
    },
  ]) {
    const result = hook(parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
    if (result.action === "mock") {
      return Promise.resolve(
        Mock.mock(
          `|{'id':'@float(0, 1000, 0, 2)','category':'{'id':'@float(0, 1000, 0, 2)','name':'@string(5, 20)'}','name':'@string(5, 20)','photoUrls':'@string','tags':'|{'id':'@float(0, 1000, 0, 2)','name':'@string(5, 20)'}|1-5','status':'@string(5, 20)'}|1-5`,
        ),
      );
    }
  }
  const responese = adaptorFn(parameter, ...args);
  for (const hook of []) {
    const result = hook(responese, parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
  }
  return responese;
};
/**
 * @description: pet: Mulipletagscanbeprovidedwithcommaseparatedstrings.Usetag1,tag2,tag3fortesting.
 */
export const Pet_FindByTagsGET = (...args) => {
  const parameter = {
    url: `/pet/findByTags`,
    method: "GET",
    bonusInfo: {
      namespace: "ALLIN",
      description: "pet: Mulipletagscanbeprovidedwithcommaseparatedstrings.Usetag1,tag2,tag3fortesting.",
      apiName: "Pet_FindByTagsGET",
    },
  };
  for (const hook of [
    () => {
      return {
        action: "mock",
        // value: mockRule
      };
    },
  ]) {
    const result = hook(parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
    if (result.action === "mock") {
      return Promise.resolve(
        Mock.mock(
          `|{'id':'@float(0, 1000, 0, 2)','category':'{'id':'@float(0, 1000, 0, 2)','name':'@string(5, 20)'}','name':'@string(5, 20)','photoUrls':'@string','tags':'|{'id':'@float(0, 1000, 0, 2)','name':'@string(5, 20)'}|1-5','status':'@string(5, 20)'}|1-5`,
        ),
      );
    }
  }
  const responese = adaptorFn(parameter, ...args);
  for (const hook of []) {
    const result = hook(responese, parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
  }
  return responese;
};
/**
 * @description: pet: Returnsasinglepet
 */
export const Pet_PetId_$petId$GET = (parameter = "", ...args) => {
  const parameter = {
    url: `/pet/${parameter}`,
    method: "GET",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "pet: Returnsasinglepet",
      apiName: "Pet_PetId_$petId$GET",
    },
  };
  for (const hook of [
    () => {
      return {
        action: "mock",
        // value: mockRule
      };
    },
  ]) {
    const result = hook(parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
    if (result.action === "mock") {
      return Promise.resolve(
        Mock.mock(
          `{'id':'@float(0, 1000, 0, 2)','category':'{'id':'@float(0, 1000, 0, 2)','name':'@string(5, 20)'}','name':'@string(5, 20)','photoUrls':'@string','tags':'|{'id':'@float(0, 1000, 0, 2)','name':'@string(5, 20)'}|1-5','status':'@string(5, 20)'}`,
        ),
      );
    }
  }
  const responese = adaptorFn(parameter, ...args);
  for (const hook of []) {
    const result = hook(responese, parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
  }
  return responese;
};
/**
 * @description: pet: Updatesapetinthestorewithformdata
 */
export const Pet_PetId_$petId$POST = (parameter = "", ...args) => {
  const parameter = {
    url: `/pet/${parameter}`,
    method: "POST",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "pet: Updatesapetinthestorewithformdata",
      apiName: "Pet_PetId_$petId$POST",
    },
  };
  for (const hook of [
    () => {
      return {
        action: "mock",
        // value: mockRule
      };
    },
  ]) {
    const result = hook(parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
    if (result.action === "mock") {
      return Promise.resolve(Mock.mock(`@string`));
    }
  }
  const responese = adaptorFn(parameter, ...args);
  for (const hook of []) {
    const result = hook(responese, parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
  }
  return responese;
};
/**
 * @description: pet: Deletesapet
 */
export const Pet_PetId_$petId$DELETE = (parameter = "", ...args) => {
  const parameter = {
    url: `/pet/${parameter}`,
    method: "DELETE",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "pet: Deletesapet",
      apiName: "Pet_PetId_$petId$DELETE",
    },
  };
  for (const hook of [
    () => {
      return {
        action: "mock",
        // value: mockRule
      };
    },
  ]) {
    const result = hook(parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
    if (result.action === "mock") {
      return Promise.resolve(Mock.mock(`@string`));
    }
  }
  const responese = adaptorFn(parameter, ...args);
  for (const hook of []) {
    const result = hook(responese, parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
  }
  return responese;
};
/**
 * @description: pet: uploadsanimage
 */
export const Pet_PetId_UploadImage_$petId$POST = (parameter = "", ...args) => {
  const parameter = {
    url: `/pet/${parameter}/uploadImage`,
    method: "POST",
    parameter,
    bonusInfo: {
      namespace: "ALLIN",
      description: "pet: uploadsanimage",
      apiName: "Pet_PetId_UploadImage_$petId$POST",
    },
  };
  for (const hook of [
    () => {
      return {
        action: "mock",
        // value: mockRule
      };
    },
  ]) {
    const result = hook(parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
    if (result.action === "mock") {
      return Promise.resolve(Mock.mock(`{'code':'@float(0, 1000, 0, 2)','type':'@string(5, 20)','message':'@string(5, 20)'}`));
    }
  }
  const responese = adaptorFn(parameter, ...args);
  for (const hook of []) {
    const result = hook(responese, parameter, ...args);
    if (result.action === "break") {
      return Promise.resolve(result.value);
    }
  }
  return responese;
};
