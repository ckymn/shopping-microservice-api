const { Schema, model } = require("mongoose");
const logger = require("../scripts/logger/customer.log");

const customerOrder = new Schema(
  {
    orderId: { type: String },
    customerId: { type: String },
    amount: { type: Number },
    status: { type: String },
    txnId: { type: String },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "product", require: true },
        unit: { type: Number, require: true },
      },
    ],
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

const customerProduct = new Schema(
  {
    name: { type: String, require: true, unique: true },
    desc: { type: String },
    banner: { type: String },
    type: { type: String },
    unit: { type: String },
    price: { type: String },
    available: { type: String },
    suplier: { tyep: String },
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
  customerOrder: model("order", customerOrder),
  customerProduct: model("product", customerProduct),
};
