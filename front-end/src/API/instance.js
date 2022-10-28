import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

const loginUser = async ({ email, password }) => {
  try {
    const response = await instance.post('/users/login', { email, password });
    console.log(response);
    return response;
  } catch (e) {
    return e;
  }
};

export default loginUser;
