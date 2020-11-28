import React from 'react';

export default function GameEnd({ onStart }) {
  return (
    <div className="text-center">
      <p className="text-dark mt-5 mb-3 start-text">
        Once you start the game, type the word <br /> that you see and keep
        going
      </p>

      <button className="button button-start" onClick={onStart}>
        Start
      </button>
    </div>
  );
}
