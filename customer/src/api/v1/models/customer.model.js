const { Schema, model } = require("mongoose");
const logger = require("../scripts/logger/customer.log");

const customerSchema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
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

const customerAddress = new Schema(
  {
    street: { type: String },
    postalCode: { type: String },
    country: { type: String },
    city: { type: String },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    versionKey: false,
    timestamps: true,
  }
);

module.exports = {
  customerSchema: model("customer", customerSchema),
  customerAddress: model("address", customerAddress),
};
