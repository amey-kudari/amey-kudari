"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { FaCalendarCheck, FaCalendarMinus } from "react-icons/fa";
import { Triangle } from "react-loader-spinner";
import axios from "axios";

export const ListItem = ({
  room,
  movie,
  onDelete,
  selectedMovie,
  setSelectedMovie,
  updateRoom,
}: {
  room: any;
  movie: any;
  onDelete: (name: string) => void;
  selectedMovie: string;
  setSelectedMovie: (a: string) => void;
  updateRoom: (cb?: () => void) => void;
}) => {
  const onToggleComplete = (movie: any) => {
    console.log(movie);
  };

  const [myProgress, setMyProgress] = useState<number>(
    room.user === room.user1 ? movie.w1 ?? 0 : movie.w2 ?? 0
  );

  const [progLoading, setProgLoading] = useState(false);

  const setProgress = () => {
    const updatedMovie = {
      ...movie,
      w1: room.user === room.user1 ? myProgress : movie.w1,
      w2: room.user !== room.user1 ? myProgress : movie.w2,
    };
    // if(room.user === room.user1) movie.w1 = myProgress; else movie.w2 = myProgress;
    setProgLoading(true);
    axios
      .post("/api/movieRoom/updateWatchdMovie", {
        movie: updatedMovie,
        roomid: room.roomid,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert("Error updating movie progress, please try again");
      })
      .finally(() => {
        updateRoom(() => setProgLoading(false));
      });
  };
  return (
    <li key={movie.name} className="">
      <button
        className={`w-full p-2 rounded-lg ${
          movie.name === selectedMovie
            ? "bg-slate-600 mt-2 cursor-default"
            : "bg-slate-500 hover:bg-slate-700"
        }`}
        onClick={() => setSelectedMovie(movie.name)}
      >
        <div
          className={`grid transition-all duration-50 overflow-hidden ease-in	${
            selectedMovie === movie.name ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="flex items-center justify-center">
            <Link href={movie.url}>
              <h1 className="flex justify-center items-center hover:underline text-blue-400">
                {movie.name} <sub>({movie.addedBy})</sub>{" "}
              </h1>
            </Link>
          </div>
          <div className="text-left">
            <h4>Watched by</h4>
            <table>
              <tr>
                <td className="flex items-center gap-3">
                  <input
                    min="0"
                    max="100"
                    step="1"
                    type="range"
                    className={`${movie.w1 === 100 ? "accent-green-500" : "accent-blue-500"} ${
                      movie.w1 === 0 ? "accent-red-500" : ""
                    }`}
                    value={movie.w1 ?? 0}
                    disabled={progLoading}
                  />
                  <span> by {room.user1}</span>
                </td>
              </tr>
              <tr>
                <td className="flex items-center gap-3">
                  <input
                    min="0"
                    max="100"
                    step="1"
                    type="range"
                    className={`${movie.w2 === 100 ? "accent-green-500" : "accent-blue-500"} ${
                      movie.w2 === 0 ? "accent-red-500" : ""
                    }`}
                    value={movie.w2 ?? 0}
                    disabled={progLoading}
                  />
                  <span> by {room.user2}</span>
                </td>
              </tr>
            </table>
          </div>
          <div className="flex items-center">
            <div className="flex-1"></div>
            {progLoading ? (
              <Triangle height="25" width="25" color="#fff" />
            ) : null}
            <input
              min="0"
              max="100"
              step="1"
              type="range"
              className={`cursor-grabbing ${
                myProgress === 100 ? "accent-green-500" : ""
              } ${myProgress === 0 ? "accent-red-500" : ""}`}
              value={myProgress}
              onChange={(e) => {
                console.log(e.target.value);
                setMyProgress(Number(e.target.value));
              }}
              onMouseUp={setProgress}
              onTouchEnd={setProgress}
              title="Set your progress"
            />
            <button
              className="hover:text-red-500 ml-1"
              onClick={() => onDelete(movie.name)}
            >
              <MdDelete size={25} />
            </button>
          </div>
        </div>
        {selectedMovie === movie.name ? null : (
          <h1 className="flex justify-center items-center">
            {movie.name} <sub>({movie.addedBy})</sub>{" "}
          </h1>
        )}
      </button>
    </li>
  );
};
