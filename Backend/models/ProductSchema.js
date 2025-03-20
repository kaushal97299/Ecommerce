const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    pname: { type: String, required: true, trim: true, maxlength: 100 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    discount: { type: Number, min: 0, max: 100 },
    offerEndDate: { type: Date },
    image: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\.(jpg|jpeg|png|gif)$/i.test(v);
        },
        message: "Invalid image format! Only JPG, JPEG, PNG, and GIF are allowed.",
      },
    },
    finalPrice: { type: Number, min: 0 }, // Add finalPrice
  },
  { timestamps: true }
);

// Calculate finalPrice before saving
productSchema.pre("save", function (next) {
  if (this.discount) {
    this.finalPrice = this.price - (this.price * this.discount) / 100;
  } else {
    this.finalPrice = this.price;
  }
  next();
});

module.exports = mongoose.model("AddProducts", productSchema);
