import React, { useState, useEffect } from 'react';

const Message = ({ message, type }) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    console.log(message);
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message || !showMessage) return null;

  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
};

export default Message;
