const salesServices = require('../services/salesServices');

const getAll = async (_req, res) => {
  try {
    const sales = await salesServices.getAll();

    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
  }
};

const create = async (req, res) => {
  try {
    const newSale = await salesServices.create(req.body);

    return res.status(201).json({ message: 'Created', newSale });
  } catch (error) {
    console.log(error);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.findOne(id);

    if (!sale) return res.status(404).json({ message: 'Not Found' });
    return res.status(200).json(sale);
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedSale = await salesServices.update({ id, status });

    if (!updatedSale) return res.status(404).json({ message: 'Not Found' });
    return res.status(200).json({ message: 'Status Updated' });
  } catch (error) {
    console.log(error);
  }
};

const findByUser = async (req, res) => {
  try {
    const { email } = req.body;
    const salesByUser = await salesServices.findByUser(email);
    if (!salesByUser) return res.status(404).json({ message: 'Not Found' });
    return res.status(200).json(salesByUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAll, create, findOne, update, findByUser };