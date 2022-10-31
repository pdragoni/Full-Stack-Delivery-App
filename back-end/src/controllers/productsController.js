const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  try {
    const products = await productsServices.getAll();

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsServices.findOne(id);

    if (!product) return res.status(404).json({ message: 'Not Found' });

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAll, findOne };