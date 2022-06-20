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

class Customer {
  async createController(req, res) {
    const { body } = req;
    const password = passwordToHash(body.password);
    try {
      const customer = await CustomerService.create({ ...body, password });
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
      return res
        .status(error?.status || httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          status: "FAILED",
          data: { error: error?.message || error },
        });
    }
  }

  async loginController(req, res) {
    const { body } = req;
    const password = passwordToHash(body.password).toString();
    try {
      const customer = await CustomerService.listOne({
        $and: [{ email: body.email }, { password }],
      });

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
      return res
        .status(error?.status || httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          status: "FAILED",
          data: { error: error?.message || error },
        });
    }
  }

  async updateController(req, res) {
    const { body, user } = req;
    const password = passwordToHash(body.password).toString();
    try {
      const customer = await CustomerService.update(
        { _id: user.id },
        { ...body, password: password }
      );
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
      return res
        .status(error?.status || httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          status: "FAILED",
          data: { error: error?.message || error },
        });
    }
  }

  async deleteController(req, res) {
    const { params } = req;
    try {
      const customer = await CustomerService.delete({ _id: params.id });
      if (!customer) {
        return res.status(httpStatus.NOT_FOUND).send({
          status: "FAILED",
          data: { error: "Data delete not found" },
        });
      } else {
        return res.status(httpStatus.OK).send({
          status: "OK",
          data: "Customer delete success",
        });
      }
    } catch (error) {
      return res
        .status(error?.status || httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          status: "FAILED",
          data: { error: error?.message || error },
        });
    }
  }

  async profileController(req, res) {
    const { user } = req;
    try {
      const customers = await CustomerService.listOne({ _id: user.id });
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
      return res
        .status(error?.status || httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          status: "FAILED",
          data: { error: error?.message || error },
        });
    }
  }

  async addressController(req, res) {
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
      return res
        .status(error?.status || httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          status: "FAILED",
          data: { error: error?.message || error },
        });
    }
  }

  async resetPasswordContoller(req, res) {
    const { body } = req;
    try {
      const newPassword =
        uuidv4()?.split("-")[0] || `usr-${new Date().getTime()}`;

      const customer = await CustomerService.update(
        { email: body.email },
        { password: passwordToHash(newPassword).toString() }
      );
      if (!customer) {
        return res.status(httpStatus.NOT_FOUND).send({
          status: "FAILED",
          data: { error: "Customer not found" },
        });
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
      return res
        .status(error?.status || httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          status: "FAILED",
          data: { error: error?.message || error },
        });
    }
  }

  async updateProfileImage(req, res) {
    const { files } = req;
    try {
      if (!files?.profile_image) {
        return res.status(httpStatus.BAD_REQUEST).send({
          status: "FAILED",
          data: { error: "There is not enough data" },
        });
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
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
              status: "FAILED",
              data: { error: err },
            });
          } else {
            const updateImageToDatabase = await CustomerService.update(
              { _id: req.user.id },
              { profile_image: fileName }
            );

            if (!updateImageToDatabase) {
              return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                status: "FAILED",
                data: {
                  error:
                    "Image Upload Success but Image save to database problem",
                },
              });
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
      return res
        .status(error?.status || httpStatus.INTERNAL_SERVER_ERROR)
        .send({
          status: "FAILED",
          data: { error: error?.message || error },
        });
    }
  }
}

module.exports = new Customer();
