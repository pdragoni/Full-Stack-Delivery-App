const usersServices = require('../services/usersServices');

const getAll = async (_req, res) => {
  try {
    const users = await usersServices.getAll();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersServices.login({ email, password });

    if (!user) return res.status(404).json({ message: 'Not Found' });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await usersServices.register({ name, email, password });

    if (!result) return res.status(409).json({ message: 'Conflict' });

    return res.status(201).json({ token: result });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAll, login, register };