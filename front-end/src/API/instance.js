import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

const loginUser = async ({ email, password }) => {
  instance.post('users/login', { email, password })
    .catch((error) => error.response.data);
};

export default loginUser;
