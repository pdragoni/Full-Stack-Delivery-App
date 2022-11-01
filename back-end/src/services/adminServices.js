const { users } = require('../database/models');
const { createToken, generateHash } = require('../helpers');

const getAllSellers = async () => {
  const sellers = await users.findAll({ where: { role: 'seller' } });
  return sellers;
};

const registerByAdmin = async ({ name, email, password, role }) => {
  const userEmail = await users.findOne({ where: { email } });
  const userName = await users.findOne({ where: { name } });
  if (userEmail || userName) return null;
  const hash = generateHash(password);
  const { dataValues } = await users.create({ name, email, password: hash, role });
  const token = createToken({ dataValues });

  return { ...dataValues, token };
};

module.exports = { getAllSellers, registerByAdmin };