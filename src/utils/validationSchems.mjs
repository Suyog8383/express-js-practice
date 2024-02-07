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
  username: {
    notEmpty: {
      errorMessage: "username is required",
    },
    isLength: {
      options: {
        min: 2,
        max: 15,
      },
      errorMessage: "username must be between 2-15 characters",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "password is required",
    },
    isLength: {
      options: {
        min: 2,
        max: 15,
      },
      errorMessage: "password must be between 2-15 characters",
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

export const validateUserLogin = {
  username: {
    notEmpty: {
      errorMessage: "username is required",
    },
    isLength: {
      options: {
        min: 2,
        max: 15,
      },
      errorMessage: "username must be between 2-15 characters",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "password is required",
    },
    isLength: {
      options: {
        min: 2,
        max: 15,
      },
      errorMessage: "password must be between 2-15 characters",
    },
  },
};
