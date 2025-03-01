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
  const [board, setBoard] = useState(BOARD_CONFIG);
  const [round, setRound] = useState(0);
  const pastCells = useRef([]);
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
    // return false
    setBoard(boardCopy);
    // console.log(cellConfig, dropLoc);
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
      }
      console.log('EVENT', { row, col, cellId, aid: event.active.id });
    }
  }

  useEffect(() => {
    setCellConfig1(getRandomConfig());
    setCellConfig2(getRandomConfig());
    setCellConfig3(getRandomConfig());
  }, [round])
  return <div touch-action="none">
    <DndContext onDragEnd={onDragEnd} touch-action="none">
      <Board board={board} currentCells={currentCells} touch-action="none" />
      <div className='flex items-center w-full justify-center m-2 gap-2' touch-action="none">
        {cellConfig1 ? <Cell config={cellConfig1} cellId={1} /> : null}
        {cellConfig2 ? <Cell config={cellConfig2} cellId={2} /> : null}
        {cellConfig3 ? <Cell config={cellConfig3} cellId={3} /> : null}
      </div>
    </DndContext>
  </div>
}