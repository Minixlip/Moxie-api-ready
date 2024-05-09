const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    gender: { type: String, required: true },
    adult: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    chest: {
      type: Number,
      required: true,
    },
    waist: {
      type: Number,
      required: true,
    },
    hips: {
      type: Number,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    specifications: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Products', productSchema);
