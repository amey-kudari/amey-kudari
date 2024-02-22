"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Triangle } from "react-loader-spinner";

export const CreateRoom = () => {
  // user1, pass1, user2, pass2
  const [user1, setUser1] = useState<string>();
  const [pass1, setPass1] = useState<string>();
  const [cpass1, setCPass1] = useState<string>();
  const [blur1, setblur1] = useState<boolean>(false);

  const [user2, setUser2] = useState<string>();
  const [pass2, setPass2] = useState<string>();
  const [cpass2, setCPass2] = useState<string>();
  const [blur2, setblur2] = useState<boolean>(false);

  const [roomid, setRoomId] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (pass1 == cpass1 && pass2 == cpass2 && pass1 != pass2 && !loading) {
      setLoading(true);
      axios
        .post("/api/movieRoom/create", { user1, pass1, user2, pass2 })
        .then((res) => {
          console.log(res);
          window.localStorage.setItem('activeroom', res.data.roomid);
          setRoomId(res.data.roomid);
        })
        .catch((err) => console.log("ERROR", err))
        .finally(() => setLoading(false));
    }
  };

  if (roomid)
    return (
      <div className="bg-zinc-950 border-zinc-800 border flex flex-col p-6 m-4 w-full sm:w-1/2 mt-2 items-center">
        <h3 className="text-3xl">Room ID : {roomid}</h3>
        <Link
          href={`/builder/movies?roomid=${roomid}`}
          className="text-cyan-500 hover:underline"
        >
          Shareable room link!
        </Link>
      </div>
    );

  return (
    <>
      <form
        className="bg-zinc-950 border-zinc-800 border flex flex-col p-6 m-4 w-full sm:w-1/2 mt-2 items-center"
        onSubmit={onSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-16 w-full">
          <div className="flex flex-col items-center">
            <h3 className="mb-2">First memeber</h3>
            <input
              placeholder="Name of first member"
              className="bg-zinc-600 border border-zinc-600 active:border-zinc-300 py-2 px-4 outline-none mb-4 w-full"
              value={user1}
              onChange={(e) => setUser1(e.target.value)}
              required
            />
            <input
              placeholder="Passcode of first member"
              type="password"
              className="bg-zinc-600 border border-zinc-600 active:border-zinc-300 py-2 px-4 outline-none mb-4 w-full"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
              required
            />
            <input
              placeholder="Confirm Passcode of first member"
              type="password"
              className={`bg-zinc-600 border border-zinc-600 active:border-zinc-300 py-2 px-4 outline-none w-full ${
                blur1 && pass1 && pass1 !== cpass1
                  ? "outline-1 outline-red-500"
                  : "mb-4"
              }`}
              value={cpass1}
              onChange={(e) => setCPass1(e.target.value)}
              onBlur={() => setblur1(true)}
              required
            />
            {blur1 && pass1 && pass1 !== cpass1 ? (
              <sub className="mb-4 mt-2 text-red-500">
                Passwords do not match
              </sub>
            ) : null}
          </div>
          <div className="flex flex-col items-center">
            <h3 className="mb-2">Second memeber</h3>
            <input
              placeholder="Name of second member"
              className="bg-zinc-600 border border-zinc-600 active:border-zinc-300 py-2 px-4 outline-none mb-4 w-full"
              value={user2}
              onChange={(e) => setUser2(e.target.value)}
              required
            />
            <input
              placeholder="Passcode of second member"
              type="password"
              className="bg-zinc-600 border border-zinc-600 active:border-zinc-300 py-2 px-4 outline-none mb-4 w-full"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
              required
            />
            <input
              placeholder="Confirm Passcode of first member"
              type="password"
              className={`bg-zinc-600 border border-zinc-600 active:border-zinc-300 py-2 px-4 outline-none w-full ${
                blur2 && pass2 && pass2 !== cpass2
                  ? "outline-1 outline-red-500"
                  : "mb-4"
              }`}
              value={cpass2}
              onBlur={() => setblur2(true)}
              onChange={(e) => setCPass2(e.target.value)}
              required
            />
            {blur2 && pass2 && pass2 !== cpass2 ? (
              <sub className="mb-4 mt-2 text-red-500">
                Passwords do not match
              </sub>
            ) : null}
            {blur2 && pass1 && pass2 && pass1 == pass2 ? (
              <sub className="mb-4 mt-2 text-red-500">
                Both users can not have the same password
              </sub>
            ) : null}
          </div>
        </div>
        <button
          className="bg-zinc-600 w-64 p-3 hover:bg-zinc-700 hover:text-white"
          type="submit"
          disabled={loading}
        >
          Create room!
        </button>
        {loading ? (
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#eee"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : null}
      </form>
      <h4>Add yourself and another person you want to watch anything with!</h4>
      <p>OR</p>
    </>
  );
};
