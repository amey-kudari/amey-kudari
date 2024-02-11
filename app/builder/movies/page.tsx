"use client";
import { useEffect, useState } from "react";
import { CreateRoom } from "./create/CreateRoom";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Triangle } from "react-loader-spinner";

const Page = () => {
  const router = useRouter();

  const [roomid, setRoomId] = useState<string>("");
  const [passcode, setPassCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const roomidFromParams = new URLSearchParams(window?.location?.search).get(
      "roomid"
    );
    const roomIdFromLC = localStorage.getItem("activeroom");
    const computedRoomId = roomidFromParams ?? roomIdFromLC;
    if (computedRoomId) setRoomId(computedRoomId);
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    axios
      .get(`/api/movieRoom/getRoom?roomid=${roomid}&pass=${passcode}`)
      .then((res) => {
        console.log("AMEY", res);
        localStorage.setItem("room", JSON.stringify(res.data.data));
        router.push("/builder/movies/room");
      })
      .catch(() => {
        alert("Invalid Room Id or Passcode");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <h1 className="text-5xl mb-2 mx-2">Movie Room!</h1>
      <p className="mx-2 text-center mb-4">
        Designed for people who want to see movies together, and archive and
        remember them!
      </p>
      <form
        className="bg-zinc-950 sm:bg-zinc-900 border-zinc-800 flex flex-col p-6 m-4 w-full sm:w-1/4 mt-2 items-center"
        onSubmit={onSubmit}
      >
        <input
          placeholder="Room Id"
          className="bg-zinc-500 border border-zinc-500 active:border-zinc-300 p-2 outline-none mb-4 w-full"
          value={roomid}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <input
          placeholder="Passcode"
          type="password"
          className="bg-zinc-500 border border-zinc-500 active:border-zinc-300 p-2 outline-none mb-4 w-full"
          value={passcode}
          onChange={(e) => setPassCode(e.target.value)}
        />
        <button
          className="bg-zinc-500 w-64 p-3 hover:bg-zinc-700 hover:text-white"
          type="submit"
          disabled={loading}
        >
          Enter room!
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
      <Link
        className="text-cyan-500 hover:underline"
        href="/builder/movies/create"
      >
        Dont have a room? Create a new one!
      </Link>
    </div>
  );
};

export default Page;
