import React from 'react';

const LoginButton = ({ loading }) => (
  <button
    type="submit"
    disabled={loading}
    className="btn btn-primary w-100 mt-3"
  >
    {loading ? 'Вход...' : 'Войти'}
  </button>
);

export default LoginButton;
