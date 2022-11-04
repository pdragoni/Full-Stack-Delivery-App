const { sales, users, products, salesProducts, sequelize } = require('../database/models');
const { getByEmail } = require('./usersServices');

const getAll = async () => {
  const allSales = await sales.findAll({
    include: [
      { model: products, as: 'products' },
      { model: users, as: 'user' },
      { model: users, as: 'seller' },
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
      { model: users, as: 'user' },
      { model: users, as: 'seller' },
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

const findSalesCustomer = async (id) => {
  const result = await sales.findAll({ where: { userId: id },
    include: [
      { model: products, as: 'products' },
      { model: users, as: 'seller' },
    ],
  });
  return result;
};

const findSalesSeller = async (id) => {
  const result = await sales.findAll({ where: { sellerId: id },
    include: [
      { model: products, as: 'products' },
      { model: users, as: 'user' },
    ],
  });
  return result;
};

const findByUser = async (email) => {  
  const user = await getByEmail(email);
  if (!user || user.role === 'administrator') return null;

  const { id } = user;
  const salesByUser = user.role === 'customer' ? await findSalesCustomer(id) : await findSalesSeller(id);

  if (salesByUser.length === 0 || !salesByUser) return null;
  return salesByUser;
};

module.exports = { getAll, create, findOne, update, findByUser };