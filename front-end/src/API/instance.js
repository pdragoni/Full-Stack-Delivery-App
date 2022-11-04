import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

const loginUser = async ({ email, password }) => {
  try {
    const response = await instance.post('/users/login', { email, password });
    // console.log(response);
    return response;
  } catch (e) {
    // console.log(e);
    return null;
  }
};

const registerUser = async ({ name, email, password }) => {
  try {
    const response = await instance.post('/users/register', { name, email, password });
    return response.data;
  } catch (error) {
    return null;
  }
};

const getProducts = async () => {
  try {
    const response = await instance.get('/products');
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

const getAllSellers = async () => {
  try {
    const response = await instance.get('/admin/sellers');
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOrders = async (email) => {
  try {
    const response = await instance.get('/sales/user', { email });
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

const getOrderById = async (id) => {
  try {
    const response = await instance.get(`/sales/${id}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

const getUserId = async (email) => {
  try {
    const response = await instance.get('/users');
    const user = response.data.find((u) => u.email === email);
    return user.id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createOrder = async (order, token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  const response = await instance.post('/sales', order, config);
  return response.data;
};

export {
  loginUser,
  registerUser,
  getProducts,
  getAllSellers,
  getUserId,
  createOrder,
  getOrders,
  getOrderById,
};
