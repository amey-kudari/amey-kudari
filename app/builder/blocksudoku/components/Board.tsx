"use client";

import { useDroppable } from "@dnd-kit/core";
import { Cell } from "./Cell";
import { useCellWidth } from "../hooks/useCellWidth";

const ROWS = [0, 1, 2, 3, 4, 5, 6, 7]
const COLS = [0, 1, 2, 3, 4, 5, 6, 7]

function Droppable({ id, cellWidth, currentCells }: { id: number, cellWidth: number, currentCells: (boolean[][] | null)[] }) {
  const { active, isOver, setNodeRef } = useDroppable({
    id: `droppable_${id}`,
  });

  const style = {
    width: cellWidth * 0.95,
    height: cellWidth * 0.95,
  };

  const overConfig = isOver ? currentCells[Number(String(active?.id).split('_')[1]) - 1] : null;

  return (
    <div ref={setNodeRef} style={style} className={`absolute top-0 left-0 bg-opacity-0 ${isOver ? "border-green-300" : "border-slate-300"}`}>
      {overConfig ? <div className="absolute top-0 left-0 z-50" touch-action="none">
        <Cell config={overConfig} cellId={id * 100} isCell touch-action="none" />
      </div> : null}
    </div>
  );
}

export const Board = ({ board, currentCells }: { board: boolean[][], currentCells: (boolean[][] | null)[] }) => {
  const cellWidth = useCellWidth();

  return <div className="flex flex-row justify-center items-center" touch-action="none">
    {board.map((row, rowId) => <div key={rowId} touch-action="none">
      {row.map((val, colId) => <div key={100 + rowId * 10 + colId} className={`${val ? "bg-blue-300" : "bg-slate-200"} border border-slate-500 relative`} style={{ width: cellWidth, height: cellWidth }} touch-action="none">
        <Droppable id={rowId * 10 + colId} cellWidth={cellWidth} currentCells={currentCells} touch-action="none" />
      </div>)}
    </div>)}
  </div>
}