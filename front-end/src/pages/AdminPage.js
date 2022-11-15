import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AdminRegisterForm from '../components/AdminRegisterForm';
import { getUsers } from '../API/instance';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const defaultTestidString = 'admin_manage__element-user-table';
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      const filteredUsers = response.filter((user) => user.role !== 'administrator');
      setUsers(filteredUsers);
    };
    fetchUsers();
  }, []);
  return (
    <div className="admin-page-container">
      <Navbar />
      <AdminRegisterForm />
      <div className="users-list-container">
        <ul>
          {users.map((user, index) => (
            <li key={ index }>
              <p data-testid={ `${defaultTestidString}-item-number-${index}` }>
                {index + 1}
              </p>
              <p data-testid={ `${defaultTestidString}-name` }>{user.name}</p>
              <p data-testid={ `${defaultTestidString}-email` }>{user.email}</p>
              <p data-testid={ `${defaultTestidString}-role` }>{user.role}</p>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

/*

- 69: data-testid={ `${defaultTestidString}-item-number-${index}`}
- 70: data-testid={ `${defaultTestidString}-name-${index}`
- 71: data-testid={ `${defaultTestidString}-email-${index}`
- 72: data-testid={ `${defaultTestidString}-role-${index}`

*/
