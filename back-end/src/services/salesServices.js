const { sales, products, salesProducts, sequelize } = require('../database/models');
import { findByUser } from '../controllers/usersServices';

const getAll = async () => {
  const allSales = await sales.findAll({
    include: [
      { model: products, as: 'products' },
    ],
  });
  return allSales;
};

const create = async (data) => {
  const saleObject = {
    ...data,
    status: 'Pendente',
  };
  const createdSale = await sequelize.transaction(async (t) => {
    const newSale = await sales.create(saleObject, { transaction: t });
    const newSalesProducts = data.sale.map((each) => ({
      saleId: newSale.dataValues.id,
      productId: each.productId,
      quantity: each.quantity,
    }));
    await salesProducts.bulkCreate(newSalesProducts, { transaction: t });
    return newSale;
  });
  return createdSale;
};

const findOne = async (id) => {
  const sale = await sales.findByPk(id, {
    include: [
      { model: products, as: 'products' },
    ],
  });
  if (!sale) return null;
  return sale;
};

const update = async ({ id, status }) => {
  const sale = await sales.findByPk(id);
  if (!sale) return null;

  const updatedSale = await sales.update({ status }, { where: { id } });
  return updatedSale;
};

const findByUser = async (email) => {  
  const user = await findByUser(email);
  if (!user) return null;

  const { id:userId } = user;
  const salesByUser = await sales.findAll({ where: { userId },
    include: [
      { model: products, as: 'products' },
    ],
  });

  if (salesByUser.length === 0 || !salesByUser) return null;
  return salesByUser;
};

module.exports = { getAll, create, findOne, update, findByUser };