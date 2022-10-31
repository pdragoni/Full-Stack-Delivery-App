const { users } = require('../database/models');
const { createToken, generateHash } = require('../helpers');

const getAll = async () => {
  const user = await users.findAll({ attributes: { exclude: ['password'] } });
  return user;
};

const login = async ({ email, password }) => {
  const data = await users.findOne({ where: { email } });
  const hash = generateHash(password);
  if (!data || data.password !== hash) return null;
  const token = createToken({ data });
  const { dataValues } = data;
  const result = { ...dataValues, token };
  return result;
};

const register = async ({ name, email, password }) => {
  const userEmail = await users.findOne({ where: { email } });
  const userName = await users.findOne({ where: { name } });
  if (userEmail || userName) return null;
  const hash = generateHash(password);
  const { dataValues } = await users.create({ name, email, password: hash, role: 'customer' });
  const token = createToken({ dataValues });

  return { ...dataValues, token };
};

module.exports = { getAll, login, register };