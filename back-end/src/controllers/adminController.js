const adminServices = require('../services/adminServices');

const getAllSellers = async (_req, res) => {
  try {
    const sellers = await adminServices.getAllSellers();

    return res.status(200).json(sellers);
  } catch (error) {
    console.log(error);
  }
};

const registerByAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newSeller = await adminServices.registerByAdmin({ name, email, password, role });

    if (!newSeller) return res.status(409).json({ message: 'Conflict' });
    const { token } = newSeller;
    return res.status(201).json({ name, email, role, token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllSellers, registerByAdmin };