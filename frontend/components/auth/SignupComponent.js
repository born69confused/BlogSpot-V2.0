import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { signup, isAuth, preSignup } from '../../actions/auth';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';

const Signupcomponent = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  };

  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const { name, email, password, loading, error, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ values });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };
    preSignup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  const showLoading = () =>
    loading ? (
      <div className="alert alert-warning text-center">
        <i class="fas fa-spinner fa-lg me-3"></i>Loading...
      </div>
    ) : (
      ''
    );
  const showError = () =>
    error ? (
      <div className="alert alert-danger text-center">
        <i class="fas fa-exclamation-triangle fa-lg me-3"></i>
        {error}
      </div>
    ) : (
      ''
    );
  const showMessage = () =>
    message ? (
      <div className="alert alert-info text-center">{message}</div>
    ) : (
      ''
    );

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div class="form-outline mt-4">
          <label class="form-label fs-5 mb-0" for="typeName">
            Name
          </label>
          <input
            type="name"
            id="typeName"
            name="name"
            value={name}
            onChange={handleChange}
            className="form-control fs-6 ps-3 pt-1 pb-0"
            disabled={loading}
            style={{ borderBottom: '2px solid gray', width: '100%' }}
          />
        </div>
        <div class="form-outline mt-4">
          <label class="form-label fs-5 mb-0" for="typeEmail">
            Email Address
          </label>
          <input
            type="email"
            id="typeEmail"
            name="email"
            value={email}
            onChange={handleChange}
            className="form-control fs-6 ps-3 pt-1 pb-0"
            disabled={loading}
            style={{ borderBottom: '2px solid gray', width: '100%' }}
          />
        </div>
        <div class="form-outline mt-4">
          <label class="form-label fs-5 mb-0" for="typePassword">
            Password
          </label>
          <input
            type="password"
            id="typePassword"
            name="password"
            value={password}
            onChange={handleChange}
            minLength="6"
            className="form-control fs-6 ps-3 pt-1 pb-0"
            disabled={loading}
            style={{ borderBottom: '2px solid gray', width: '100%' }}
          />
        </div>
        <button
          className="btn btn-primary btn-rounded btn-raised btn-lg mt-3 mb-4 fs-7 shadow-2-strong"
          disabled={loading}
        >
          <i class="fas fa-check pe-2 fa-lg"></i> Submit
        </button>
      </form>
    );
  };

  return (
    <Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
      <p className="mt-1 mb-3 fw-bold">OR</p>
      <LoginGoogle />
      <Link href="/auth/password/forgot">
        <a className="fs-6 float-end text-danger">
          Need help? Reset password...
        </a>
      </Link>
    </Fragment>
  );
};

export default Signupcomponent;
