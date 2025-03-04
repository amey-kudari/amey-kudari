"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Board } from "./components/Board";
import { Cell } from "./components/Cell";
import { DndContext } from "@dnd-kit/core";
import { CELL_CONFIGS } from "./constants";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

const BOARD_CONFIG = new Array(8)
  .fill(0)
  .map((row) => new Array(8).fill(false));

const getRandomConfig = () => {
  return CELL_CONFIGS[Math.floor(Math.random() * CELL_CONFIGS.length)];
};

export default function Page() {
  const [bestScore, setBestScore] = useState(-1);
  const [board, setBoard] = useState(BOARD_CONFIG);
  const [score, setScore] = useState(0);
  const paint = useCallback(
    (
      cellConfig: boolean[][] | null,
      dropLoc: { row: number; col: number },
      update = true
    ): boolean => {
      if (cellConfig === null) return false;
      const { row, col } = dropLoc;

      const boardCopy = board.map((row) => row.slice());
      for (let i = row; i < row + 3; i++) {
        for (let j = col; j < col + 3; j++)
          if (cellConfig[i - row][j - col]) {
            if (i < 8 && j < 8 && boardCopy[i][j] === false) {
              boardCopy[i][j] = true;
            } else {
              return false;
            }
          }
      }
      const fullRows: number[] = [];
      const fullCols: number[] = [];
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
      fullRows.forEach((rowId) => {
        for (let j = 0; j < boardCopy[rowId].length; j++) {
          boardCopy[rowId][j] = false;
        }
      });
      fullCols.forEach((colId) => {
        for (let i = 0; i < boardCopy.length; i++) {
          boardCopy[i][colId] = false;
        }
      });

      if (update) setBoard(boardCopy);
      return true;
    },
    [board]
  );

  const [cellConfig1, setCellConfig1] = useState<boolean[][] | null>(null);
  const [cellConfig2, setCellConfig2] = useState<boolean[][] | null>(null);
  const [cellConfig3, setCellConfig3] = useState<boolean[][] | null>(null);

  const currentCells = useMemo(
    () => [cellConfig1, cellConfig2, cellConfig3],
    [cellConfig1, cellConfig2, cellConfig3]
  );
  const currentCellConfigs = [setCellConfig1, setCellConfig2, setCellConfig3];

  const onDragEnd = (event: any) => {
    if (event.over && event.active) {
      const dropId = Number(event.over.id.split("_")[1]);
      const row = Math.floor(dropId / 10);
      const col = dropId % 10;

      const cellId = Number(event.active.id.split("_")[1]);
      if (paint(currentCells[cellId - 1], { row, col })) {
        currentCellConfigs[cellId - 1](null);
        setScore((s) => s + 1);
      }
    }
  };

  useEffect(() => {
    if (!cellConfig1 && !cellConfig2 && !cellConfig3) {
      setCellConfig1(getRandomConfig());
      setCellConfig2(getRandomConfig());
      setCellConfig3(getRandomConfig());
    }
  }, [cellConfig1, cellConfig2, cellConfig3]);

  const isGameOver = useMemo(() => {
    if (cellConfig1 || cellConfig2 || cellConfig3) {
      // check if we can add it on the board
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (cellConfig1 && paint(cellConfig1, { row: i, col: j }, false)) {
            return false;
          }
          if (cellConfig2 && paint(cellConfig2, { row: i, col: j }, false)) {
            return false;
          }
          if (cellConfig3 && paint(cellConfig3, { row: i, col: j }, false)) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  }, [cellConfig1, cellConfig2, cellConfig3, board, paint]);

  useEffect(() => {
    const savedScore = window.localStorage.getItem("blocksudoku_bestscore");
    if (savedScore) {
      setBestScore(Number(savedScore));
    }
  }, []);

  useEffect(() => {
    if (score > bestScore && score > 0) {
      window.localStorage.setItem("blocksudoku_bestscore", String(score));
    }
  }, [bestScore, score]);

  const cellBg = useMemo(() => {
    const colorId = Math.floor(score / 7);
    switch (colorId) {
      case 0:
        return "bg-blue-300";
      case 1:
        return "bg-red-300";
      case 2:
        return "bg-orange-300";
      case 3:
        return "bg-amber-300";
      case 4:
        return "bg-lime-500";
      case 5:
        return "bg-yellow-400";
      default:
        return "bg-pink-500";
    }
  }, [score]);

  const { width, height } = useWindowSize()
  console.log(width, height);

  const [screenDim, setScreenDim] = useState({ w: 0, h: 0 });
  useEffect(() => {
    setScreenDim({
      h: window.screen.availHeight,
      w: window.screen.availWidth,
    });
  }, []);

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (score > 0 && score % 7 === 0) {
      setShowConfetti(true);
      const timeoutId = setTimeout(() => {
        setShowConfetti(false);
      }, 2500);
      return () => clearTimeout(timeoutId)
    }
    return undefined
  }, [score]);

  return (
    <div className="py-2">
      {showConfetti && (score % 7) < 2 ?
        <Confetti
          width={screenDim.w}
          height={screenDim.h * 0.9}
        /> : null}
      <h1 className="text-center text-3xl">
        {score > bestScore
          ? `New high score: ${score}`
          : `Max score so far ${bestScore === -1 ? "-" : bestScore}`}
      </h1>
      <h2 className="text-center text-xl mb-2">Current score: {score}</h2>
      {isGameOver ? (
        <div className="flex items-center flex-col">
          <h1 className="text-center mt-4 text-3xl">GAME OVER!!</h1>
          <button
            className="bg-zinc-500 py-1 px-2 hover:bg-zinc-700 hover:text-white mb-2"
            onClick={() => {
              setScore(0);
              setBoard(BOARD_CONFIG);
              setCellConfig1(null);
              setCellConfig2(null);
              setCellConfig3(null);
              const savedScore = window.localStorage.getItem("blocksudoku_bestscore");
              if (savedScore) {
                setBestScore(Number(savedScore));
              }
            }}
          >
            RESTART?
          </button>
        </div>
      ) : null}
      <DndContext onDragEnd={onDragEnd}>
        <Board
          cellBg={cellBg}
          board={board}
          currentCells={currentCells}
          isValidPlacement={(cellConfig, { row, col }) =>
            paint(cellConfig, { row, col }, false)
          }
        />
        <div className="flex items-center justify-center m-2 gap-2 w-[calc(100%-8px)]">
          {cellConfig1 ? (
            <Cell
              cellBg={cellBg}
              config={cellConfig1}
              cellId={1}
              isInValidPosition={({ row, col }: { row: number; col: number }) =>
                paint(cellConfig1, { row, col }, false)
              }
            />
          ) : null}
          {cellConfig2 ? (
            <Cell
              cellBg={cellBg}
              config={cellConfig2}
              cellId={2}
              isInValidPosition={({ row, col }: { row: number; col: number }) =>
                paint(cellConfig2, { row, col }, false)
              }
            />
          ) : null}
          {cellConfig3 ? (
            <Cell
              cellBg={cellBg}
              config={cellConfig3}
              cellId={3}
              isInValidPosition={({ row, col }: { row: number; col: number }) =>
                paint(cellConfig3, { row, col }, false)
              }
            />
          ) : null}
        </div>
      </DndContext>
      {score ? <a href="https://github.com/amey-kudari/amey-kudari/tree/main/app/builder/blocksudoku" className="block mt-4 w-full text-center text-blue-500 underline" target="_blank">Contribute!</a> : (
        <p className="text-center px-4">
          You can grab pieces by holding the handle / dot under them!
        </p>
      )}
    </div>
  );
}
