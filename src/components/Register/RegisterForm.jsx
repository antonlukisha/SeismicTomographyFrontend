import React, { useState, useEffect } from 'react';
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
    if (password !== confirmPassword) {
      setErrorMessage("Пароли не совпадают");
      return;
    }

    if (!isPasswordStrong(password)) {
      setErrorMessage("Пароль должен иметь не менее 8 символов, включать в себя нижний и верхний регистр, а также цифры");
      return;
    }

    const newUser = {
      username,
      password,
      role: "user",
      sign_up_date: new Date().toISOString(),
      last_login_date: new Date().toISOString(),
    };

    setLoading(true);
    try {
        const response = await registerUser(newUser);
        console.log(response);
        console.log(response);

        // Поскольку мы ожидаем успешный ответ с кодом 201, проверяем это
        setSuccessMessage("Регистрация прошла успешно!");

        // Добавление редиректа на страницу логина
        setTimeout(() => {
          navigate('/login');
        }, 2000); // редирект через 2 секунды
    } catch (error) {
        setErrorMessage(error.message || "Произошла ошибка. Пожалуйста, повторите попытку позже.");
        console.error(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 border rounded shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Регистрация</h2>
      <InputField label="Имя пользователя" value={username} onChange={setUsername} type="text" />
      <InputField label="Пароль" value={password} onChange={setPassword} type={isVisible ? 'text' : 'password'} />
      <InputField label="Подтвердите пароль" value={confirmPassword} onChange={setConfirmPassword} type="password" />
      <ShowPasswordButton label="Показать пароль" isVisible={isVisible} setIsVisible={setIsVisible} />
      <Message message={errorMessage} type="danger" />
      <Message message={successMessage} type="success" />
      <RegisterButton loading={loading} />
    </form>
  );
};

export default RegisterForm;
