import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPasswordStrong } from '../../utils/validators'
import { registerUser } from '../../api/user/registerUser';
import Message from '../Message';
import InputField from '../InputField';
import ShowPasswordButton from '../ShowPasswordButton';
import RegisterButton from './RegisterButton';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate(); // Хук для редиректа

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!isPasswordStrong(password)) {
      setErrorMessage("Password must be at least 8 characters long and include uppercase, lowercase, and a number");
      return;
    }

    const newUser = {
      username,
      password,
      role: "user",
      sign_up_date: new Date().toISOString(),
      last_login_date: new Date().toISOString(),
    };

    try {
        const response = await registerUser(newUser);
        console.log(response);
        console.log(response);

        // Поскольку мы ожидаем успешный ответ с кодом 201, проверяем это
        setSuccessMessage("Registration successful!");

        // Добавление редиректа на страницу логина
        setTimeout(() => {
          navigate('/login');
        }, 2000); // редирект через 2 секунды
    } catch (error) {
        setErrorMessage(error.message || "An error occurred. Please try again later.");
        console.error(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 border rounded shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Registration</h2>
      <InputField label="Username" value={username} onChange={setUsername} type="text" />
      <InputField label="Password" value={password} onChange={setPassword} type={isVisible ? 'text' : 'password'} />
      <InputField label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} type="password" />
      <ShowPasswordButton label="Show password" isVisible={isVisible} setIsVisible={setIsVisible} />
      <Message message={errorMessage} type="danger" />
      <Message message={successMessage} type="success" />
      <RegisterButton loading={loading} />
    </form>
  );
};

export default RegisterForm;
