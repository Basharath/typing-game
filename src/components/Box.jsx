import React, { useState, useEffect, useCallback } from 'react';
import Word from './Word';
import Timer from './Timer';
import Input from './Input';
import GameEnd from './GameEnd';
import Difficulty from './Difficulty';
import wordList from './WordList';
import StartGame from './StartGame';

export default function Box() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem('highscore') || 0
  );
  const [counter, setCounter] = useState(5);
  const [timer, setTimer] = useState('');
  const [mount, setMount] = useState(true);
  const [level, setLevel] = useState(localStorage.getItem('level') || 'medium');
  const [increment, setIncrement] = useState(incrementChange(level));
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

  function incrementChange(type) {
    const bonusTime = type === 'hard' ? 1 : type === 'medium' ? 2 : 3;
    return bonusTime;
  }

  function difficultyChange({ currentTarget: option }) {
    const bonusTime = incrementChange(option.value);

    const difficultyLevel = option.value;
    localStorage.setItem('level', difficultyLevel);

    setIncrement(bonusTime);
    setLevel(difficultyLevel);
    setWord(selectWord());
  }

  function selectWord() {
    const list = wordList[level];
    const item = Math.floor(Math.random() * list.length);
    return list[item];
  }

  function handleStart() {
    setMount(false);
    setCounter(5);
    setScore(0);
    // setWord(selectWord());
  }

  return (
    <div className="container">
      <div className="container-body">
        <Difficulty onChange={difficultyChange} difficultyLevel={level} />
        <h1 className="title">Typing Game</h1>
        {counter === 0 ? (
          <GameEnd score={score} highScore={highScore} onStart={handleStart} />
        ) : mount === true && !timer ? (
          <StartGame onStart={handleStart} />
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
