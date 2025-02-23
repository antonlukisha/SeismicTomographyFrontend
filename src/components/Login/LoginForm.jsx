import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/user/loginUser';
import InputField from '../InputField';
import Message from '../Message';
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

    const user = {
      username,
      password,
    };

    setLoading(true);
    try {
      console.log(user);
      const response = await loginUser(user);
      //const data = await response.json();
      //localStorage.setItem('token', data.access_token);
      // Добавление редиректа на страницу
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      <InputField label="Username" value={username} onChange={setUsername} type="text" />
      <InputField label="Password" value={password} onChange={setPassword} type="password" />
      <LoginButton loading={loading} />
      {error && <Message message={error} type="danger" />}
      <div className="mt-3 text-center">
        <p className="mb-0">
          Don’t have an account?{' '}
          <a href="/register" className="text-primary">
            Register here
          </a>.
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
