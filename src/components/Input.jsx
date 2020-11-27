import React from 'react';

export default function Input({ onChange }) {
  return (
    <div className="text-center">
      <input
        type="text"
        className="input mt-1"
        placeholder="Start typing the above word..."
        onChange={onChange}
        autoFocus
      />
    </div>
  );
}
