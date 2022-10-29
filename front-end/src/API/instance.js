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
    return e;
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

export { loginUser, registerUser };
