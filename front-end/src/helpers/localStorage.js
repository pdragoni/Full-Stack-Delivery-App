const setLocalStorage = (key, value) => {
  if (typeof value === 'string') localStorage.setItem(key, value);
  else localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => localStorage.getItem(key);

const setLocalUser = (user) => {
  const entries = Object.entries(user);
  entries.forEach((entry) => {
    const [key, value] = entry;
    setLocalStorage(key, value);
  });
};

export { setLocalStorage, getLocalStorage, setLocalUser };
