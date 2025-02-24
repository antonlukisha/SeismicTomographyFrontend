import React from 'react';

const RegisterButton = ({ loading }) => (
  <button
    type="submit"
    disabled={loading}
    className="btn btn-primary w-100 mt-3"
  >
    {loading ? 'Регистрация...' : 'Зарегистрироваться'}
  </button>
);

export default RegisterButton;
