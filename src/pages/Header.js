
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../AuthContext';

const Header = () => {
  const { isAuthenticated, user } = useAuthState();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated && (
          <>
            <li>
              <Link to="/items">Items</Link>
            </li>
            <li>
              <Link to="/stock">Stock Management</Link>
            </li>
            {user && user.role === 'admin' && (
              <li>
                <Link to="/admin">Admin Section</Link>
              </li>
            )}
          </>
        )}
        <li>
          <Link to="/pos">Point of Sale</Link>
        </li>
        <li>
          <Link to="/checkout">Checkout</Link>
        </li>
        {isAuthenticated ? (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
