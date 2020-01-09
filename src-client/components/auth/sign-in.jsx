import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStore } from '../../store';
import API from '../../api/api';

const SignIn = ({ history, store }) => {
  const defaults = { email: '', password: '' };
  
  const [user, setUser] = useState(defaults);
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate fields before submitting
    Object.keys(user).forEach((field) => validateField(field));

    const hasErrors = Object.values(formErrors).some((e) => e);
    if (!user || hasErrors) return;

    API.post('auth/login', user)
      .then(({ data }) => {
        setError(null);
        store.set('user', data.user);
        localStorage.setItem('token', data.token);
        history.push('/');
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);
    validateField(name, value);
  };

  const validateField = (fieldName, value = user[fieldName]) => {
    const updatedFormErrors = { ...formErrors };
    let valid;

    switch (fieldName) {
      case 'email':
        valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        updatedFormErrors.email = valid ? '' : 'Email is invalid';
        break;
      case 'password':
        valid = value.length >= 6;
        updatedFormErrors.password = valid ? '' : 'Password is too short';
        break;
      default:
        break;
    }

    setFormErrors(updatedFormErrors);
  };

  const errorClass = (error) => (error ? 'is-invalid' : '');

  return (
    <div className="card text-left mb-3">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger">
              Invalid credentials
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errorClass(formErrors.email)}`}
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={user.email}
            />
            {formErrors.email && (
              <div className="invalid-feedback">
                {formErrors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errorClass(formErrors.password)}`}
              id="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              value={user.password}
            />
            {formErrors.password && (
              <div className="invalid-feedback">
                {formErrors.password}
              </div>
            )}
          </div>

          <div className="btn-group" role="group" aria-label="">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default withStore(SignIn);
