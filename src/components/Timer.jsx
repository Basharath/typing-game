import React from 'react';

export default function Timer({ counter, score, highScore }) {
  return (
    <div className="row my-3">
      <div className="col text-center  timeleft">
        <div className="align-self-center">
          Seconds left: <span>{counter + 's'}</span>
        </div>
      </div>
      <div className="col text-right mr-5 score">
        <div>
          Score: <span>{score}</span>
        </div>
        <div>
          High score: <span>{highScore}</span>
        </div>
      </div>
    </div>
  );
}
