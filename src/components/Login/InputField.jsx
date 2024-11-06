import React from 'react';

const InputField = ({ label, value, onChange, type }) => (
  <div className="mb-3">
    <label className="form-label">{label}:</label>
    <input
      type={type}
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default InputField;