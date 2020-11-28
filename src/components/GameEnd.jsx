import React from 'react';

export default function GameEnd({ score, highScore, onStart }) {
  return (
    <div className="text-center">
      <h3 className="text-dark">Time up!</h3>
      <p className="final-score mb-4">
        Your score: {score} <br /> Your highest score: {highScore}
      </p>
      <button className="btn btn-dark" onClick={onStart}>
        Start again
      </button>
    </div>
  );
}
