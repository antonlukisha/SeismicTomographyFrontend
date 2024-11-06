import React, { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isPasswordStrong = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return password.length >= 8 && hasUpperCase && hasLowerCase && hasNumber;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

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
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
      });

      if (response.status === 201) {
        setSuccessMessage("User registered successfully!");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error.content || "Registration failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleRegister} className="w-50 mx-auto mt-5">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
      <button type="submit" className="btn btn-primary">Register</button>
    </form>
  );
};

export default RegisterForm;
