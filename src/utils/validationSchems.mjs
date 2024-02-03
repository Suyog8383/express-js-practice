export const createValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "name should not be empty",
    },
    isLength: {
      options: {
        min: 2,
        max: 10,
      },
      errorMessage: "name should be between 2-10 characters",
    },
    isString: {
      errorMessage: "name must be string",
    },
  },
  city: {
    notEmpty: {
      errorMessage: "city should not be empty",
    },
    isLength: {
      options: {
        min: 2,
        max: 10,
      },
      errorMessage: "city should be between 2-10 characters",
    },
    isString: {
      errorMessage: "city must be string",
    },
  },
};

export const validationSchema = {
  filter: {
    optional: true,
    isLength: {
      options: {
        min: 2,
        max: 5,
      },
      errorMessage: "must be 2-5 characters",
    },
    isString: {
      errorMessage: "must be string",
    },
  },
  value: {
    optional: true,
    isLength: {
      options: {
        min: 2,
        max: 5,
      },
      errorMessage: "must be 2-5 characters",
    },
    isString: {
      errorMessage: "must be string",
    },
  },
};
