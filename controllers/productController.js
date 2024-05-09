const Product = require("../models/ProductModel");
const mongoose = require("mongoose");

const addProduct = async (req, res) => {
  const {
    name,
    price,
    img,
    gender,
    adult,
    description,
    size,
    chest,
    waist,
    hips,
    height,
    material,
    specifications,
  } = req.body;

  try {
    product = await Product.create({
      name,
      price,
      img,
      gender,
      adult,
      description,
      size,
      chest,
      waist,
      hips,
      height,
      material,
      specifications,
    });
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  const { category } = req.body;

  try {
    if (!category) {
      throw Error("No category selected");
    }
    if (category === "ALL") {
      const products = await Product.find({});
      res.status(200).json({ products });
    }
    if (category === "MEN") {
      const products = await Product.find({ gender: "male", adult: true });

      res.status(200).json({ products });
    }
    if (category === "WOMEN") {
      const products = await Product.find({ gender: "female", adult: true });
      res.status(200).json({ products });
    }
    if (category === "KIDS") {
      const products = await Product.find({ adult: false });
      res.status(200).json({ products });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getProduct = async (req, res) => {
  const { itemname } = req.body;

  console.log(itemname);
  try {
    if (!itemname) {
      throw Error("No category selected");
    }

    const items = await Product.find({ name: itemname });

    if (!items) {
      throw Error("No item found");
    }

    const item = items[0];

    res.status(200).json({ item });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
};
