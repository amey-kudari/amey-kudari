"use client";

import { useDraggable } from "@dnd-kit/core";
import { useEffect, useState } from "react";

const ROWS = [0, 1, 2, 3, 4, 5, 6, 7]
const COLS = [0, 1, 2, 3, 4, 5, 6, 7]


export const CELL_CONFIGS = [
  [[true, true, true], [true, false, false], [true, false, false]],
  [[true, true, false], [true, false, false], [false, false, false]],
  [[true, true, true], [false, false, false], [false, false, false]],
  [[true, true, false], [false, false, false], [false, false, false]],
  [[true, false, false], [true, false, false], [true, false, false]],
  [[true, false, false], [true, false, false], [false, false, false]],
]


export const Cell = ({ config, cellId, isCell }: { config: boolean[][], cellId: number, isCell?: boolean }) => {
  const [cellWidth, setCellWidth] = useState(0);
  useEffect(() => {
    const totalWidth = window.screen.availWidth;
    setCellWidth(Math.min(totalWidth, 50));
  }, []);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `cell_${cellId}`,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const activeColor = isCell ? "bg-green-300" : "bg-blue-300  bg-opacity-70";

  return <div className="flex flex-row justify-center items-center touch-none select-none" style={style} ref={setNodeRef} {...attributes} {...listeners} touch-action="none">
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
}