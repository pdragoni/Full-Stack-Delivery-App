import axios from 'axios';
import { getLocalStorage } from '../helpers/localStorage';

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

const getOrders = async () => {
  try {
    const { email } = getLocalStorage('user');
    const response = await instance.get('/sales/user', { email });
    // console.log(response);
    return response.data;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

export { loginUser, registerUser, getProducts, getOrders };
