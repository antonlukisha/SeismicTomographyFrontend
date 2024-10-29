import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Перенаправление на страницу входа, если токен отсутствует
    }
  }, [navigate]);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Only accessible after logging in.</p>
    </div>
  );
}

export default ProtectedPage;
