const { v4: uuidv4 } = require("uuid");
const eventEmitter = require("../scripts/events/eventEmitter");
const path = require("path");
const httpStatus = require("http-status");
const passwordToHash = require("../utils/helper.utils");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt.utils");
const CustomerService = require("../services/customer.service");
const ApiError = require("../errors/ErrorHandler");

class Customer {
  async createController(req, res, next) {
    const { body } = req;
    const password = passwordToHash(body.password);
    try {
      const customer = await CustomerService.create({ ...body, password });
      if (!customer) {
        return next(new ApiError("Data save problems", httpStatus.BAD_REQUEST));
      } else {
        res.status(httpStatus.CREATED).send({
          status: "OK",
          data: customer,
        });
      }
    } catch (error) {
      return next(new ApiError(error?.message));
    }
  }

  async loginController(req, res, next) {
    const { body } = req;
    const password = passwordToHash(body.password).toString();
    try {
      const customer = await CustomerService.listOne({
        $and: [{ email: body.email }, { password }],
      });

      if (!customer) {
        return next(
          new ApiError("Customer find problem", httpStatus.NOT_FOUND)
        );
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
      return next(new ApiError(error?.message));
    }
  }

  async updateController(req, res, next) {
    const { body, user } = req;
    const password = passwordToHash(body.password).toString();
    try {
      const customer = await CustomerService.update(
        { _id: user.id },
        { ...body, password: password }
      );
      if (!customer) {
        return next(
          new ApiError("Data update problems", httpStatus.BAD_REQUEST)
        );
      } else {
        return res.status(httpStatus.OK).send({
          status: "OK",
          data: customer,
        });
      }
    } catch (error) {
      return next(new ApiError(error?.message));
    }
  }

  async deleteController(req, res, next) {
    const { params } = req;
    try {
      const customer = await CustomerService.delete({ _id: params.id });
      if (!customer) {
        return next(
          new ApiError("Data delete problems", httpStatus.BAD_REQUEST)
        );
      } else {
        return res.status(httpStatus.OK).send({
          status: "OK",
          data: "Customer delete success",
        });
      }
    } catch (error) {
      return next(new ApiError(error?.message));
    }
  }

  async profileController(req, res, next) {
    const { user } = req;
    try {
      const customers = await CustomerService.listOne({ _id: user.id });
      if (!customers) {
        return next(new ApiError("Data save problems", httpStatus.BAD_REQUEST));
      } else {
        res.status(httpStatus.OK).send({
          status: "OK",
          data: customers,
        });
      }
    } catch (error) {
      return next(new ApiError(error?.message));
    }
  }

  async addressController(req, res, next) {
    const { body, user } = req;
    try {
      const address = await CustomerService.addAdress({ _id: user.id }, body);
      const customer = await CustomerService.update(
        { _id: user.id },
        {
          $push: {
            address: address._id,
          },
        }
      );
      if (!address) {
        return next(new ApiError("Data save problems", httpStatus.BAD_REQUEST));
      } else {
        res.status(httpStatus.CREATED).send({
          status: "OK",
          data: address,
        });
      }
    } catch (error) {
      return next(new ApiError(error?.message));
    }
  }

  async resetPasswordContoller(req, res, next) {
    const { body } = req;
    try {
      const newPassword =
        uuidv4()?.split("-")[0] || `usr-${new Date().getTime()}`;

      const customer = await CustomerService.update(
        { email: body.email },
        { password: passwordToHash(newPassword).toString() }
      );
      if (!customer) {
        return next(new ApiError("Customer not found", httpStatus.NOT_FOUND));
      } else {
        // ! eventEmitter
        eventEmitter.emit("send_email", {
          to: customer.email,
          subject: "Sifre Sifirlama",
          html: `Talebiniz Uzerine Sifre Sifirlama Islemi Gerceklesmistir. <br /> Giris Yaptiktan Sonra Sifre Sifrenizi Degistirmeyi Unutmayin! <br /> Yeni Sifreniz : <b> ${newPassword}</b>`,
        });
        return res.status(httpStatus.OK).send({
          status: "OK",
          data: customer,
        });
      }
    } catch (error) {
      return next(new ApiError(error?.message));
    }
  }

  async updateProfileImage(req, res, next) {
    const { files } = req;
    try {
      if (!files?.profile_image) {
        return next(
          new ApiError("There is not enough data", httpStatus.BAD_REQUEST)
        );
      } else {
        const fileName = `${req.user.id}${path.extname(
          files.profile_image.name
        )}`;
        const folderPath = path.join(
          __dirname,
          "../",
          "uploads/users",
          fileName
        );
        files.profile_image.mv(folderPath, async (err) => {
          if (err) {
            return next(new ApiError(err, httpStatus.INTERNAL_SERVER_ERROR));
          } else {
            const updateImageToDatabase = await CustomerService.update(
              { _id: req.user.id },
              { profile_image: fileName }
            );

            if (!updateImageToDatabase) {
              return next(
                new ApiError(
                  "Image Upload Success but Image save to database problem",
                  httpStatus.INTERNAL_SERVER_ERROR
                )
              );
            } else {
              return res.status(httpStatus.OK).send({
                status: "OK",
                data: updateImageToDatabase,
              });
            }
          }
        });
      }
    } catch (error) {
      return next(new ApiError(error?.message));
    }
  }
}

module.exports = new Customer();
