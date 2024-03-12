import React from 'react';
import { userAuth } from '../context';
import { useNavigate } from 'react-router-dom';

export const Private = () => {
  const { state, dispatch } = useAuth();
  const history = useNavigate();

  useEffect(() => {
    actions.authenticatePrivate();
  }, [actions]);
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem('access_token');
    history.push('/api.login');
  };

  return (
    <div>
      <h2>Private Dashboard</h2>
      <p>Welcome, {state.userId ? `User ${state.userId}` : 'Guest'}</p>
      <button onClick={handleLogout}>Logout</button>
      {userData && (
        <div>
          <h3>User Data</h3>
          <ul>
            <li>Email: {userData.email}</li>
            <li>Password: {userData.password}</li>
          </ul>
        </div>
      )}
    </div>
  );
};
