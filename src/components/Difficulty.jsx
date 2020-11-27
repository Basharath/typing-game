import React from 'react';

export default function Difficulty({ onChange, difficultyLevel }) {
  return (
    <div className="top">
      <select onChange={onChange} className="selection" value={difficultyLevel}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button
        className="button button-reset"
        onClick={() => window.location.reload()}
      >
        Reset
      </button>
    </div>
  );
}
