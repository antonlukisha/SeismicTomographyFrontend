import React from 'react';

const LoginButton = ({ loading }) => (
  <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem', fontSize: '1rem', fontWeight: 'bold' }}>
    {loading ? 'Logging in...' : 'Login'}
  </button>
);

export default LoginButton;