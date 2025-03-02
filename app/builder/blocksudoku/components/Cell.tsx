"use client";

import { useDraggable } from "@dnd-kit/core";
import { useCellWidth } from "../hooks/useCellWidth";
import { useMemo } from "react";

export const Cell = ({
  config,
  cellId,
  isCell,
  isInValidPosition = ({ row, col }: { row: number; col: number }) => {
    throw new Error(`Invalid requst using ${row},${col}`);
  },
}: {
  config: boolean[][];
  cellId: number;
  isCell?: boolean;
  isInValidPosition?: ({
    row,
    col,
  }: {
    row: number;
    col: number;
  }) => true | false | undefined;
}) => {
  const cellWidth = useCellWidth();
  const { attributes, listeners, setNodeRef, transform, isDragging, over } =
    useDraggable({
      id: `cell_${cellId}`,
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const isValidPos = useMemo(() => {
    if (!over || isCell) return false;
    const overId = Number(String(over.id).split("_")[1]);
    return isInValidPosition({
      row: Math.floor(overId / 10),
      col: overId % 10,
    });
  }, [over, isInValidPosition, isCell]);

  const activeColor = isCell ? "bg-green-300" : "bg-blue-300 ";

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="touch-none select-none flex flex-col"
    >
      <div className="flex flex-col">
        <div
          className={`flex flex-row justify-center items-center touch-none select-none ${
            !isCell ? "pb-0" : "pb-0"
          } ${isValidPos && isDragging && !isCell ? "opacity-0" : ""}`}
          style={style}
          touch-action="none"
        >
          {config.map((row, rowId) => (
            <div key={rowId} touch-action="none">
              {row.map((val, colId) => (
                <div
                  touch-action="none"
                  key={100 + rowId * 10 + colId}
                  className={`bg-opacity-70 ${
                    val ? activeColor : "bg-opacity-0 border-transparent"
                  } border relative`}
                  style={{ width: cellWidth, height: cellWidth }}
                ></div>
              ))}
            </div>
          ))}
        </div>
        {isCell ? null : (
          <div className={`pt-16 py-4 flex items-center justify-center`}>
            <div
              className={`${
                isDragging ? "bg-opacity-0" : "bg-white"
              } h-8 w-8 rounded-full`}
            />
          </div>
        )}
      </div>
    </div>
  );
};
