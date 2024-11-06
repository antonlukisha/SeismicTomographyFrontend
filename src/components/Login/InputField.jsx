import React from 'react';

const InputField = ({ label, value, onChange, type }) => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontWeight: 'bold' }}>{label}:</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
      />
    </div>
  );
  
  export default InputField;