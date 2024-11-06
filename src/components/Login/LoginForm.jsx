import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/user/loginUser';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';
import LoginButton from './LoginButton';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await loginUser(username, password);
      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        navigate('/protected');
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Authentication failed!');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField label="Username" value={username} onChange={setUsername} type="text" />
      <InputField label="Password" value={password} onChange={setPassword} type="password" />
      <LoginButton loading={loading} />
      {error && <ErrorMessage message={error} />}
    </form>
  );
};

export default LoginForm;