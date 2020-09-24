const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const productSchema = new Schema(
  {
    productName: {
      type: String,
      trim: true,
      required: [true, "Please insert name of product."],
    },
    barcode: {
      type: Number,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Please insert price of product."],
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: [true, "You need to insert a date."],
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, "Please insert quantity of product."],
      default: 0,
    },
    availability: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: [true, "You need an owner id"],
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
