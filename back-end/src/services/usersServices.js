const { users } = require('../database/models');
const { createToken, generateHash } = require('../helpers');

const getAll = async () => {
  const user = await users.findAll({ attributes: { exclude: ['password'] } });

  return user;
};

const login = async ({ email, password }) => {
  const { dataValues } = await users.findOne({ where: { email } });
  const hash = generateHash(password);
  if (!dataValues || dataValues?.password !== hash) return null;
  const token = createToken({ dataValues });
  const result = { ...dataValues, token };
  return result;
};

const register = async ({ name, email, password }) => {
  const user = await users.findOne({ where: { email } });
  if (user) return null;
  const hash = generateHash(password);
  const newUser = await users.create({ name, email, password: hash, role: 'customer' });
  const token = createToken({ newUser });
  return token;
};

module.exports = { getAll, login, register };