const { Schema, model } = require("mongoose");
const logger = require("../scripts/logger/customer.log");

const customerSchema = new Schema(
  {
    email: String,
    password: String,
    salt: String,
    phone: String,
    address: [{ type: Schema.Types.ObjectId, ref: "address", require: true }],
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          require: true,
        },
        unit: { type: Number, require: true },
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
        require: true,
      },
    ],
    orders: [{ type: Schema.Types.ObjectId, ref: "order", require: true }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    versionKey: false,
    timestamps: true,
  }
);

customerSchema.post("save", (doc, next) => {
  logger.log({
    level: "info",
    message: doc,
  });
  next();
});

module.exports = model("customer", customerSchema);
