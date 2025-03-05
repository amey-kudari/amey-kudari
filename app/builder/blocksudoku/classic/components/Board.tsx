"use client";

import { useDroppable } from "@dnd-kit/core";
import { Cell } from "./Cell";
import { useCellWidth } from "../hooks/useCellWidth";

function Droppable({
  id,
  cellWidth,
  currentCells,
  isValidPlacement,
}: {
  id: number;
  cellWidth: number;
  currentCells: (boolean[][] | null)[];
  isValidPlacement: (
    cellConfig: boolean[][] | null,
    { row, col }: { row: number; col: number }
  ) => boolean;
}) {
  const { active, isOver, setNodeRef } = useDroppable({
    id: `droppable_${id}`,
  });

  const style = {
    width: cellWidth * 0.95,
    height: cellWidth * 0.95,
  };

  const overConfig = isOver
    ? currentCells[Number(String(active?.id).split("_")[1]) - 1]
    : null;

  const isOverValid = overConfig
    ? isValidPlacement(overConfig, { row: Math.floor(id / 10), col: id % 10 })
    : null;

  const canOverBeValid = active?.id ? isValidPlacement(
    currentCells[Number(String(active.id).split("_")[1]) - 1],
    { row: Math.floor(id / 10), col: id % 10 }
  ) : null;

  if (!canOverBeValid) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`absolute top-0 left-0 bg-opacity-0 ${isOver ? "border-green-300" : "border-slate-300"
        }`}
    >
      {overConfig && isOverValid ? (
        <div className="absolute top-0 left-0 z-50" touch-action="none">
          <Cell
            cellBg="bg-green-300"
            config={overConfig}
            cellId={id * 100}
            isCell
            touch-action="none"
          />
        </div>
      ) : null}
    </div>
  );
}

export const Board = ({
  cellBg,
  board,
  currentCells,
  isValidPlacement,
}: {
  cellBg: string;
  board: boolean[][];
  currentCells: (boolean[][] | null)[];
  isValidPlacement: (
    cellConfig: boolean[][] | null,
    { row, col }: { row: number; col: number }
  ) => boolean;
}) => {
  const cellWidth = useCellWidth();

  return (
    <div
      className="flex flex-row justify-center items-center"
      touch-action="none"
    >
      {board.map((row, rowId) => (
        <div key={rowId} touch-action="none">
          {row.map((val, colId) => (
            <div
              key={100 + rowId * 10 + colId}
              className={`${val ? cellBg : "bg-slate-200"
                } border border-slate-500 relative`}
              style={{ width: cellWidth, height: cellWidth }}
              touch-action="none"
            >
              <Droppable
                id={rowId * 10 + colId}
                cellWidth={cellWidth}
                currentCells={currentCells}
                isValidPlacement={isValidPlacement}
                touch-action="none"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
