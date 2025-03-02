"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Board } from './components/Board';
import { Cell, CELL_CONFIGS } from './components/Cell';
import { DndContext } from '@dnd-kit/core';


const BOARD_CONFIG = new Array(8).fill(0).map(row => new Array(8).fill(false));

const getRandomConfig = () => {
  return CELL_CONFIGS[Math.floor(Math.random() * CELL_CONFIGS.length)]
}

export default function Page() {
  const [bestScore, setBestScore] = useState(-1);
  const [board, setBoard] = useState(BOARD_CONFIG);
  const [score, setScore] = useState(0);
  const paint = ((cellConfig: boolean[][] | null, dropLoc: { row: number; col: number }): boolean => {
    if (cellConfig === null) return false;
    const { row, col } = dropLoc;

    console.log({ row, col, cellConfig });

    const boardCopy = board.map(row => row.slice());
    console.log(boardCopy);
    for (let i = row; i < row + 3; i++) {
      for (let j = col; j < col + 3; j++) if (cellConfig[i - row][j - col]) {
        if (i < 8 && j < 8 && boardCopy[i][j] === false) {
          boardCopy[i][j] = true;
        } else {
          return false;
        }
      }
    }
    const fullRows: number[] = []
    const fullCols: number[] = []
    for (let i = 0; i < boardCopy.length; i++) {
      let isFull = true;
      for (let j = 0; j < boardCopy[i].length; j++) {
        isFull = isFull && boardCopy[i][j];
      }
      if (isFull) fullRows.push(i);
    }
    for (let j = 0; j < boardCopy[0].length; j++) {
      let isFull = true;
      for (let i = 0; i < boardCopy.length; i++) {
        isFull = isFull && boardCopy[i][j];
      }
      if (isFull) fullCols.push(j);
    }
    fullRows.forEach(rowId => {
      for (let j = 0; j < boardCopy[rowId].length; j++) {
        boardCopy[rowId][j] = false;
      }
    })
    fullCols.forEach(colId => {
      for (let i = 0; i < boardCopy.length; i++) {
        boardCopy[i][colId] = false;
      }
    })

    setBoard(boardCopy);
    return true;
  })
  const [cellConfig1, setCellConfig1] = useState<boolean[][] | null>(null);
  const [cellConfig2, setCellConfig2] = useState<boolean[][] | null>(null);
  const [cellConfig3, setCellConfig3] = useState<boolean[][] | null>(null);

  const currentCells = useMemo(() => [cellConfig1, cellConfig2, cellConfig3], [cellConfig1, cellConfig2, cellConfig3]);
  const currentCellConfigs = [setCellConfig1, setCellConfig2, setCellConfig3];

  const onDragEnd = (event: any) => {
    if (event.over && event.active) {
      const dropId = Number(event.over.id.split('_')[1])
      const row = Math.floor(dropId / 10);
      const col = dropId % 10;

      const cellId = Number(event.active.id.split('_')[1])
      if (paint(currentCells[cellId - 1], { row, col })) {
        currentCellConfigs[cellId - 1](null);
        setScore(s => s + 1);
      }
    }
  }

  useEffect(() => {
    if (!cellConfig1 && !cellConfig2 && !cellConfig3) {
      setCellConfig1(getRandomConfig());
      setCellConfig2(getRandomConfig());
      setCellConfig3(getRandomConfig());
    }
  }, [cellConfig1, cellConfig2, cellConfig3])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedScore = window.localStorage.getItem('blocksudoku_bestscore');
      if (savedScore) {
        setBestScore(Number(savedScore))
      }
    }
  }, [])

  useEffect(() => {
    if (score > bestScore && bestScore > -1) {
      window.localStorage.setItem('blocksudoku_bestscore', String(score));
    }
  }, [bestScore, score]);

  return <div touch-action="none" className='py-2'>
    <h1 className='text-center text-3xl'>Max score so far {bestScore === -1 ? '-' : Math.max(bestScore, score)}</h1>
    <h2 className='text-center text-xl mb-2'>Current score: {score}</h2>
    <DndContext onDragEnd={onDragEnd}>
      <Board board={board} currentCells={currentCells} />
      <div className='flex items-center w-full justify-center m-2 gap-2'>
        {cellConfig1 ? <Cell config={cellConfig1} cellId={1} /> : null}
        {cellConfig2 ? <Cell config={cellConfig2} cellId={2} /> : null}
        {cellConfig3 ? <Cell config={cellConfig3} cellId={3} /> : null}
      </div>
    </DndContext>
  </div>
}