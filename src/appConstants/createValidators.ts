interface ICreateValidator {
  name: { min: number; max: number };
  description: { min: number; max: number };
  totalSupply: { min: number; max: number };
  minBid: number;
  minPrice: number;
  royalty: { min: number; max: number };
}

export const createValidator: ICreateValidator = {
  name: { min: 2, max: 50 },
  description: { min: 0, max: 500 },
  totalSupply: { min: 1, max: 100 },
  minBid: 0.001,
  minPrice: 0.001,
  royalty: { min: 0.001, max: 50 },
};

interface IEditProfileValidator {
  name: { min: number; max: number };
  address: { min: number };
  bio: { min: number; max: number };
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
  bio: { min: 0, max: 500 },
  socials: {
    email: {
      reg: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    },
    site: {
      reg: /^(http:\/\/|https:\/\/)?([a-z0-9][a-z0-9-]*\.)+[a-z0-9][a-z0-9-]{2,}$/i,
    },
    twitter: {
      reg: /(?:^|[^\w])([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/,
    },
    instagram: {
      reg: /(?:^|[^\w])([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/,
    },
  },
};
