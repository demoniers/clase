import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../redux/actions/userActions';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    // Simulación de una llamada a una API
    const fetchedUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];
    dispatch(setUsers(fetchedUsers));
  }, [dispatch]);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
