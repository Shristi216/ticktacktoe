import React, { useCallback, useState, useEffect } from 'react';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import SquareComponent from './SquareComponent';
import './App.css';
import particlesOptions from "./particles.json";
const initialState = ["", "", "", "", "", "", "", "", ""];
function App() {
  const [gameState, updateGameState] = useState(initialState);
  const [isXChance, updateIsXChance] = useState(false);
  const onSquareClicked = (index) => {
    let strings = Array.from(gameState);

    //  <FaHeart style={{color: '	#FF69B4', fontSize: '50px'}}/> : <FaRegHeart 	style={{color: '	#FF69B4', fontSize: '50px'}}/>
    strings[index] = isXChance ? "X" : "O";
    updateGameState(strings);
    updateIsXChance(!isXChance);
  }
  useEffect(() => {

    const winner = checkWinner();

    if (winner) {
      < SquareComponent className="b-bottom-right" state={gameState[winner]} onClick={() => onSquareClicked(winner)} />
      alert(`YAY! ${winner} has won the Game!`)
      updateGameState(initialState)
    }
  }, [gameState])
  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        return gameState[a];
      }
    }
    return null;
  }
  const particlesInit = useCallback(main => {
    loadFull(main);
  }, [])

  return (
    <div className="App">
      <Particles options={particlesOptions} init={particlesInit} />
      <header className="App-header">
        <p className="heading-text"> TIC TAC TOE </p>
        <div className="basic">
          <div className="row jc-center">
            < SquareComponent className="b-bottom-right" state={gameState[0]} onClick={() => onSquareClicked(0)} />
            < SquareComponent className="b-bottom-right" state={gameState[1]} onClick={() => onSquareClicked(1)} />
            < SquareComponent className="b-bottom" state={gameState[2]} onClick={() => onSquareClicked(2)} />
          </div>
        </div>
        <div className="basic">
          <div className="row jc-center">

            < SquareComponent className="b-bottom-right" state={gameState[3]} onClick={() => onSquareClicked(3)} />
            < SquareComponent className="b-bottom-right" state={gameState[4]} onClick={() => onSquareClicked(4)} />
            < SquareComponent className="b-bottom" state={gameState[5]} onClick={() => onSquareClicked(5)} />
          </div>
        </div>
        <div className="basic">
          <div className="row jc-center">
            < SquareComponent className="b-right " state={gameState[6]} onClick={() => onSquareClicked(6)} />
            < SquareComponent className="b-right" state={gameState[7]} onClick={() => onSquareClicked(7)} />
            < SquareComponent state={gameState[8]} onClick={() => onSquareClicked(8)} />
          </div>
        </div>
        <button className="clear-button" onClick={() => updateGameState(initialState)}><div className="nameb">NEW GAME</div></button>



      </header>
    </div>
  );
}

export default App;
