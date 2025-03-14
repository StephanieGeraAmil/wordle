import { useState, useEffect } from 'react';
import axios from 'axios';
import {Line} from './Line';

import './App.css';
const API_URL =
  // 'https://api.frontendexpert.io/api/fe/wordle-words';
  'https://api.allorigins.win/get?url=https://api.frontendexpert.io/api/fe/wordle-words';
const WORD_LENGTH = 5;
const GUESSES_NUMBER = 6;


function App() {
const [validWords, setValidWords] = useState<Array<string>>([]);
  const [solution, setSolution] = useState<string>("");
  const [guesses, setGuesses] = useState(Array(GUESSES_NUMBER).fill(null));
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<string>('on');

  useEffect(() => {
    const fetchWord = async () => {
      const response = await axios.get(API_URL);
      const data = response.data.contents;
      const words = JSON.parse(data);
      setValidWords(words);
      const randomIndex = Math.floor(Math.random() * words.length);
      const word = words[randomIndex];
      setSolution(word.toUpperCase());
    }
    fetchWord();
  }, []);
  const checkIfGameOver = () => { 
    if (guesses[GUESSES_NUMBER - 1] != null) {
      setGameStatus('lost');
    }
    const reachedSolution = guesses.find(guess => guess === solution);  
    if(reachedSolution) {
      setGameStatus('won');
    }
  }
  useEffect(() => { 
    checkIfGameOver();
  },[guesses])

  useEffect(() => { 

    const handleTyping = (e: KeyboardEvent) => {
  
   
      if (e.key === 'Enter') {
        if(currentGuess.length !== WORD_LENGTH || !validWords.find(word=>word==currentGuess)) return;
        setGuesses(prevGuesses => [...prevGuesses.filter(guess => guess != null), currentGuess, ...Array(WORD_LENGTH - prevGuesses.filter(guess => guess != null).length).fill(null)]);
        setCurrentGuess('');
      } else if (e.key === 'Backspace') {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (e.key.match(/[a-zA-Z]/) && currentGuess.length <WORD_LENGTH) {
        setCurrentGuess(currentGuess + e.key.toUpperCase());
      }
    }
  if(gameStatus == 'on'){
    window.addEventListener('keydown', handleTyping);
            }
    return () => window.removeEventListener('keydown', handleTyping);
  },[currentGuess])
  
  return <>
      <h1>WORDLE</h1>
      <div className='board'>  
        {guesses.map((guess, index) => {
          const isCurrentGuess = index === guesses.findIndex(guess => guess == null);
            return <Line guess={isCurrentGuess ? currentGuess : guess ?? ''} solution={solution} isCurrentGuess={isCurrentGuess} key={index} />
        })}
      </div>
      {gameStatus == 'lost' && <p>{solution}</p>}
      {gameStatus=='won' && <p >Congrats!!</p>}
   
    </>
}

export default App;
