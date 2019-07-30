import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStore } from '../store';
import logo from '../logo.svg';
import API from '../api/api';

const Header = ({ store }) => {
  const [user, setUser] = useState(store.get('user'));

  useEffect(() => {
    if (!user) {
      API.get('auth/me').then(({ data }) => {
        store.set('user', data);
        setUser(data);
      });
    }
  }, [user, store]);

  const handleLogout = () => {
    store.set('user', {});
    localStorage.removeItem('token');
    setUser({});
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">
          Welcome to React. This demo was modified to include &lt;POSTS&gt; module
        </h1>
        {user && user.id && (
          <p>
            {'Hello, '}
            {user.firstName}
            {' '}
            {user.lastName}
          </p>
        )}
        <div className="d-flex justify-content-center">
          {!user?.id && (
            <Link to="/sign_in" className="btn btn-success mr-2">
              Sign In
            </Link>
          )}
          {!user?.id && (
            <Link to="/sign_up" className="btn btn-success mr-2">
              Sign Up
            </Link>
          )}
          {user?.id && (
            <button type="button" onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};

export default withStore(Header);
