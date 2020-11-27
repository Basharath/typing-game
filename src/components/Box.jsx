import React, { useState, useEffect, useCallback } from 'react';
import Word from './Word';
import Timer from './Timer';
import Input from './Input';
import GameEnd from './GameEnd';
import Difficulty from './Difficulty';
import wordList from './WordList';

export default function Box() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem('highscore') || 0
  );
  const [counter, setCounter] = useState(5);
  const [timer, setTimer] = useState('');
  const [mount, setMount] = useState(false);
  const [increment, setIncrement] = useState(4);
  const [level, setLevel] = useState(localStorage.getItem('level') || 'medium');
  const [word, setWord] = useState(selectWord());

  const updateHighScore = useCallback(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highscore', score);
    }
  }, [score, highScore]);

  useEffect(() => {
    if (!mount) {
      setMount(true);
      ticker();
    }
    if (counter === 0) {
      clearInterval(timer);
      updateHighScore();
    }
  }, [counter, mount, timer, updateHighScore]);

  function ticker() {
    const interval = setInterval(() => {
      setCounter((prevCount) => prevCount - 1);
    }, 1000);
    setTimer(interval);
  }

  function handleChange({ currentTarget: input }) {
    const typedText = input.value;
    if (typedText === word) {
      setWord(selectWord());
      setScore((prevScore) => prevScore + 1);
      input.value = '';
      setCounter((prevCount) => prevCount + increment);
    }
  }

  function difficultyChange({ currentTarget: option }) {
    const bonusTime =
      option.value === 'hard' ? 1 : option.value === 'medium' ? 2 : 3;

    const difficultyLevel = option.value;

    localStorage.setItem('level', difficultyLevel);

    setIncrement(bonusTime);
    setLevel(difficultyLevel);
  }

  function selectWord() {
    const list = wordList[level];
    const item = Math.floor(Math.random() * list.length);
    return list[item];
  }

  return (
    <div className="container">
      <div className="container-body">
        <Difficulty onChange={difficultyChange} difficultyLevel={level} />
        <h1 className="title">Typing Game</h1>
        {counter === 0 ? (
          <GameEnd score={score} highScore={highScore} />
        ) : (
          <>
            <Timer score={score} counter={counter} highScore={highScore} />
            <Word word={word} />
            <Input onChange={handleChange} />
          </>
        )}
      </div>
    </div>
  );
}
