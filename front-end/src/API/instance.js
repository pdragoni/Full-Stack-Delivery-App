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
    const response = await instance.post('/sales/user', { email });
    return response.data;
  } catch (error) {
    return null;
  }
};

const getOrderById = async (id) => {
  try {
    const response = await instance.get(`/sales/${id}`);
    if (!response) return null;
    return response.data;
  } catch (error) {
    console.log(error);
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
  const headers = {
    headers: {
      authorization: token,
    },
  };
  const response = await instance.post('/sales', order, headers);
  return response.data;
};

const createUserByAdm = async (form, token) => {
  const headers = {
    headers: {
      authorization: token,
    },
  };
  try {
    const response = await instance.post('/admin/register', { ...form }, headers);
    return response.data;
  } catch (error) {
    return null;
  }
};
const updateOrder = async (value, id) => {
  const body = {
    status: value,
  };
  try {
    const response = await instance.put(`/sales/${id}`, body);
    return response.data;
  } catch (error) {
    return null;
  }
};

const getUsers = async () => {
  try {
    const response = await instance.get('/users');
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
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
  createUserByAdm,
  updateOrder,
  getUsers,
};
