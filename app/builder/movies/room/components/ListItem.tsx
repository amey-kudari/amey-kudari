"use client";
// libs
import React, { useState } from "react";
import axios from "axios";

// components
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { Triangle } from "react-loader-spinner";

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
        updateRoom(() => setProgLoading(false));
      })
      .catch((err) => {
        setIL(false);
        alert("Error updating movie progress, please try again");
      });
  };

  const [i1, setI1] = useState<string>(movie.i1 ?? "");
  const [i2, setI2] = useState<string>(movie.i2 ?? "");

  const [iloading, setIL] = useState(false);
  const setImpressions = () => {
    const updatedMovie = {
      ...movie,
      i1,
      i2,
    };

    setIL(true);
    axios
      .post("/api/movieRoom/updateWatchdMovieImpressions", {
        movie: updatedMovie,
        roomid: room.roomid,
      })
      .then((res) => {
        updateRoom(() => setIL(false));
      })
      .catch((err) => {
        setIL(false);
        alert("Error updating movie impression, please try again");
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
          className={`grid overflow-hidden ${
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
            <h4>Watched</h4>
            <table>
              <tr>
                <td className="flex items-center gap-3">
                  <input
                    min="0"
                    max="100"
                    step="1"
                    type="range"
                    className={`${
                      movie.w1 === 100 ? "accent-green-500" : "accent-blue-500"
                    } ${movie.w1 === 0 ? "accent-red-500" : ""}`}
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
                    className={`${
                      movie.w2 === 100 ? "accent-green-500" : "accent-blue-500"
                    } ${movie.w2 === 0 ? "accent-red-500" : ""}`}
                    value={movie.w2 ?? 0}
                    disabled={progLoading}
                  />
                  <span> by {room.user2}</span>
                </td>
              </tr>
            </table>
          </div>
          <div className="text-left mt-2">
            <h4>Impressions</h4>
            <table>
              <tr>
                <td className="inline-flex items-center mb-2 mr-2">
                  {room.user1}
                </td>
                <td className="inline-flex items-center mb-1">
                  <input
                    className={`bg-zinc-500 border border-zinc-500 active:border-zinc-300 p-1 outline-none ${room.user === room.user1 && iloading ? 'text-slate-300' : ''}`}
                    style={{ width: "43ch" }}
                    disabled={room.user !== room.user1 || iloading}
                    value={i1}
                    onChange={(e) =>
                      setI1((pi1) =>
                        e.target.value.length > 40 ? pi1 : e.target.value
                      )
                    }
                  />
                  {i1 !== (movie.i1 ?? "") && !iloading ? (
                    <button className="px-2 py-1 border border-slate-500 hover:bg-slate-700" onClick={setImpressions}>
                      Save
                    </button>
                  ) : null}
                  {room.user === room.user1 && iloading ? (
                    <Triangle height="25" width="25" color="#fff" />
                  ) : null}
                </td>
              </tr>
              <tr>
                <td className="inline-flex items-center mb-2 mr-2">
                  {room.user2}
                </td>
                <td className="inline-flex items-center mb-2">
                  <input
                    className={`bg-zinc-500 border border-zinc-500 active:border-zinc-300 p-1 outline-none ${room.user === room.user2 && iloading ? 'text-slate-300' : ''}`}
                    style={{ width: "43ch" }}
                    disabled={room.user !== room.user2 || iloading}
                    value={i2}
                    onChange={(e) =>
                      setI2((pi2) =>
                        e.target.value.length > 40 ? pi2 : e.target.value
                      )
                    }
                  />
                  {i2 !== (movie.i2 ?? "") && !iloading ? (
                    <button className="p-2 m-2" onClick={setImpressions}>Save</button>
                  ) : null}
                  {room.user === room.user2 && iloading ? (
                    <Triangle height="25" width="25" color="#fff" />
                  ) : null}
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
