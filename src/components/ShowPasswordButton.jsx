import React from 'react';

const ShowPasswordButton = ({ label, isVisible, setIsVisible }) => (
  <div className="mb-3 form-check">
    <input
      type="checkbox"
      className="form-check-input"
      id="showPassword"
      checked={isVisible}
      onChange={() => setIsVisible(!isVisible)}
    />
    <label className="form-check-label" htmlFor="showPassword">
      {label}
    </label>
  </div>
);

export default ShowPasswordButton;
