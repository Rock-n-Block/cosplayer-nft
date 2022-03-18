/* eslint-disable no-useless-escape */
interface ICreateValidator {
  name: { min: number; max: number };
  description: { min: number; max: number };
  properties: { name: number; type: number };
  quantity: number;
}

export const createValidator: ICreateValidator = {
  name: { min: 2, max: 50 },
  description: { min: 0, max: 500 },
  properties: { name: 1, type: 1 },
  quantity: 1,
};

interface IEditProfileValidator {
  name: { min: number; max: number };
  address: { min: number };
  description: { min: number; max: number };
  socials: {
    email: { reg: RegExp };
    site: { reg: RegExp };
    twitter: { reg: RegExp };
    instagram: { reg: RegExp };
  };
}

export const editProfileValidator: IEditProfileValidator = {
  name: { min: 1, max: 50 },
  address: { min: 42 },
  description: { min: 0, max: 500 },
  socials: {
    email: {
      reg: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    },
    site: {
      reg: /^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/i,
    },
    twitter: {
      reg: /(?:^|[^\w])(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/,
    },
    instagram: {
      reg: /(?:^|[^\w])(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/,
    },
  },
};