"use client";

import { useDraggable } from "@dnd-kit/core";
import { useCellWidth } from "../hooks/useCellWidth";

const ROWS = [0, 1, 2, 3, 4, 5, 6, 7]
const COLS = [0, 1, 2, 3, 4, 5, 6, 7]


export const CELL_CONFIGS = [
  [[true, false, false], [false, false, false], [false, false, false]], // 1

  [[true, true, false], [false, false, false], [false, false, false]],  // 2x1
  [[true, false, false], [true, false, false], [false, false, false]],

  [[true, true, true], [false, false, false], [false, false, false]], // 3x1
  [[true, false, false], [true, false, false], [true, false, false]],

  [[true, true, false], [true, true, false], [false, false, false]], // 2x2 full

  [[true, true, true], [true, true, true], [false, false, false]], // 3x2 full
  [[true, true, false], [true, true, false], [true, true, false]],

  [[true, true, true], [true, true, true], [true, true, true]], // 3x3 full

  [[true, true, true], [true, false, false], [true, false, false]], // big full L
  [[true, false, false], [true, false, false], [true, true, true]],
  [[true, true, true], [false, false, true], [false, false, true]],
  [[false, false, true], [false, false, true], [true, true, true]],

  [[true, true, false], [true, false, false], [true, false, false]], // big lower L
  [[true, false, false], [true, false, false], [true, true, false]],
  [[true, true, false], [false, true, false], [false, true, false]],
  [[false, true, false], [false, true, false], [true, true, false]],

  [[true, true, false], [true, false, false], [false, false, false]], // little L
  [[true, false, false], [true, true, false], [false, false, false]],
  [[true, true, false], [false, true, false], [false, false, false]],
  [[false, true, true], [true, true, false], [false, false, false]],

  [[true, true, true], [false, true, false], [false, false, false]], // T
  [[true, false, false], [true, true, false], [true, false, false]],
  [[false, true, false], [true, true, true], [false, false, false]],
  [[false, true, false], [true, true, true], [false, false, false]],

]


export const Cell = ({ config, cellId, isCell }: { config: boolean[][], cellId: number, isCell?: boolean }) => {
  const cellWidth = useCellWidth();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `cell_${cellId}`,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const activeColor = isCell ? "bg-green-300 bg-opacity-70" : "bg-blue-300  bg-opacity-70";

  return <div ref={setNodeRef} {...attributes} {...listeners} className="touch-none select-none flex flex-col">
    <div className={`flex flex-row justify-center items-center touch-none select-none ${!isCell ? 'pb-16' : 'mb-0'}`} style={style} touch-action="none">
      {config.map((row, rowId) => <div key={rowId} touch-action="none">
        {row.map((val, colId) =>
          <div
            touch-action="none"
            key={100 + rowId * 10 + colId}
            className={`${val ? (activeColor) : "bg-opacity-0 border-transparent"} border relative`}
            style={{ width: cellWidth, height: cellWidth }}>

          </div>)}
      </div>)}
    </div>
  </div>
}