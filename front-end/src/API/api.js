import axios from 'axios';

const instance = axios.create({
  baseURL: 'localhost:3000',
});

const loginUser = async ({ email, password }) => {
  instance.post('login', { email, password })
    .catch((error) => error.response.data);
};

export default loginUser;
