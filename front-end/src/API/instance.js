import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
});

const loginUser = async ({ email, password }) => {
  instance.post('users/login', { email, password })
    .catch((error) => error.response.data);
  console.log(email, password);
};

const registerUser = async ({ name, email, password }) => {
  await instance.post('users/register', { name, email, password })
    .catch((error) => console.log(error));
};

export default loginUser;
export { registerUser };
