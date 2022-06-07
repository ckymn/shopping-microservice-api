const { v4: uuidv4 } = require("uuid");
const events = require("events");
const {
  createService,
  profileService,
  loginService,
  addressService,
  updateService,
} = require("../services/customer.service");
const httpStatus = require("http-status");
const passwordToHash = require("../utils/helper.utils");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt.utils");

const createController = async (req, res) => {
  const { body } = req;
  const password = passwordToHash(body.password);
  try {
    const customer = await createService({ ...body, password });
    if (!customer) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: "FAILED",
        data: { error: "Data save problems" },
      });
    } else {
      res.status(httpStatus.CREATED).send({
        status: "OK",
        data: customer,
      });
    }
  } catch (error) {
    return res.status(error?.status || httpStatus.INTERNAL_SERVER_ERROR).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const updateController = async (req, res) => {
  const { body, user } = req;

  try {
    const customer = await updateService(user.id, body);
    if (!customer) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: "FAILED",
        data: { error: "Data update problems" },
      });
    } else {
      return res.status(httpStatus.OK).send({
        status: "OK",
        data: customer,
      });
    }
  } catch (error) {
    return res.status(error?.status || httpStatus.INTERNAL_SERVER_ERROR).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const loginController = async (req, res) => {
  const { body } = req;
  try {
    const customer = await loginService(body);

    if (!customer) {
      return res.status(httpStatus.NOT_FOUND).send({
        status: "FAILED",
        data: { error: "Data not found" },
      });
    } else {
      // accessToken, refreshToken
      const result = {
        ...customer.toObject(),
        tokens: {
          access_token: generateAccessToken(customer),
          refresh_token: generateRefreshToken(customer),
        },
      };
      delete result.password;
      res.status(httpStatus.OK).send({
        status: "OK",
        data: result,
      });
    }
  } catch (error) {
    return res.status(error?.status || httpStatus.INTERNAL_SERVER_ERROR).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const profileController = async (req, res) => {
  const { user } = req;
  try {
    const customers = await profileService(user);
    if (!customers) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: "FAILED",
        data: { error: "Data save problems" },
      });
    } else {
      res.status(httpStatus.OK).send({
        status: "OK",
        data: customers,
      });
    }
  } catch (error) {
    return res.status(error?.status || httpStatus.INTERNAL_SERVER_ERROR).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const addressController = async (req, res) => {
  const { body, user } = req;
  try {
    const address = await addressService(user.id, body);
    if (!address) {
      return res.status(httpStatus.BAD_REQUEST).send({
        status: "FAILED",
        data: { error: "Data save problems" },
      });
    } else {
      res.status(httpStatus.CREATED).send({
        status: "OK",
        data: address,
      });
    }
  } catch (error) {
    return res.status(error?.status || httpStatus.INTERNAL_SERVER_ERROR).send({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const newPassword =
      uuidv4()?.split("-")[0] || `usr-${new Date().getTime()}`;
    updateService();
  } catch (error) {}
};

module.exports = {
  createController,
  loginController,
  profileController,
  addressController,
  updateController,
  resetPassword,
};
