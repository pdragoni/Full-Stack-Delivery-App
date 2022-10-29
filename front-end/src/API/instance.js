import axios from 'axios';

const instance = axios.create({
<<<<<<< HEAD
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
=======
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

export default loginUser;
>>>>>>> 737b75319582be6cc55182ae0cdb88ffe007a53c
