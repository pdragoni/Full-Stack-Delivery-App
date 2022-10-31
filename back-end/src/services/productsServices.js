const { products } = require('../database/models');

const getAll = async () => {
  const allProducts = await products.findAll();
  return allProducts;
};

const findOne = async (id) => {
  const product = await products.findByPk(id);
  if (!product) return null;
  return product;
};

module.exports = { getAll, findOne };