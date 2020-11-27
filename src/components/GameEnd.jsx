import React from 'react';

export default function GameEnd({ score, highScore }) {
  return (
    <div className="text-center">
      <h3 className="text-dark">Time ran out</h3>
      <p className="final-score mb-4">
        Your score: {score} <br /> Your highest score: {highScore}
      </p>
      <button className="btn btn-dark" onClick={() => window.location.reload()}>
        Start again
      </button>
    </div>
  );
}
