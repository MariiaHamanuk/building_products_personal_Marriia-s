'use client';

import { useState, useEffect } from 'react';

import styles from './styles.module.css'


export default function Home() {
  const [ firstTurn, setFirstTurn ] = useState(null)
  const [cells, setCells] = useState(Array(9).fill(null));
  const [ win, setWin ] = useState(null)

  function onClickHandler(cellIndex) {
    if (cells[cellIndex] != null) return;
    if (win != null) return;
    const updatedCells = [...cells];
    updatedCells[cellIndex] = firstTurn;
    setCells(updatedCells);
    setFirstTurn(firstTurn === 'x' ? '0' : 'x');

    console.log(`Clicked: ${cellIndex}`);
  };

  function whoWon(cells) {
    if (cells[0] === cells[1] && cells[1] === cells[2] && cells[1]) return `THE WINNER IS ${cells[0]}`;
    if (cells[3] === cells[4] && cells[4] === cells[5] && cells[4]) return `THE WINNER IS ${cells[3]}`;
    if (cells[6] === cells[7] && cells[7] === cells[8] && cells[7]) return `THE WINNER IS ${cells[6]}`;
    if (cells[0] === cells[3] && cells[3] === cells[6] && cells[3]) return `THE WINNER IS ${cells[0]}`;
    if (cells[1] === cells[4] && cells[4] === cells[7] && cells[4]) return `THE WINNER IS ${cells[1]}`;
    if (cells[2] === cells[5] && cells[5] === cells[8] && cells[5]) return `THE WINNER IS ${cells[2]}`;
    if (cells[0] === cells[4] && cells[4] === cells[8] && cells[4]) return `THE WINNER IS ${cells[0]}`;
    if (cells[2] === cells[4] && cells[4] === cells[6] && cells[4]) return `THE WINNER IS ${cells[2]}`;
    if (!cells.includes(null)) return 'DRAW';
    return null;
  }; 
    

  useEffect(() => {
    setFirstTurn(Math.random() < 0.5 ? '0' : 'x');
  }, [])
  useEffect(()=> {
    setWin(whoWon(cells))
  }, [cells]);

  return (
    <div className={styles.container}>
      <h2 className={styles.turn}>First Turn: {firstTurn}</h2>

      <div className={styles.grid}>
        {cells.map((item, index) => (
          <div key={index} className={styles.cell} onClick={() => onClickHandler(index)}>
            {item}
          </div>
        ))}
      </div>
      {win && <h1 className={styles.win}>{win}</h1>}
    </div>
  );
}
