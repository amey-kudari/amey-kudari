"use client";

// libs
import { useCallback, useEffect, useState } from "react";

// components
import Link from "next/link";
import { Triangle } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();

  const [room, setRoom] = useState({
    user1: "",
    user2: "",
    movies: [],
    roomid: "",
    user: "",
    pass1: "",
    pass2: "",
  });
  const [name, setName] = useState<string>();
  const [url, setUrl] = useState<string>();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [loading, setloading] = useState(false);
  useEffect(() => {
    const roomString = window.localStorage.getItem("room");
    if (!roomString) {
      router.push("/builder/movies");
    } else setRoom(JSON.parse(roomString));
  }, [router]);

  const updateRoom = useCallback(() => {
    const roomid = room.roomid;
    const pass = room.user == room.user1 ? room.pass1 : room.pass2;
    axios
      .get(`/api/movieRoom/getRoom?roomid=${roomid}&pass=${pass}`)
      .then((res) => {
        if (res.data?.data) {
          window.localStorage.setItem("room", JSON.stringify(res.data.data));
          setRoom(res.data.data);
        }
      })
      .finally(() => {
        if (loading) setloading(false);
      });
  }, [room, loading]);

  useEffect(() => {
    const intervalId = setInterval(updateRoom, 5000);
    return () => clearInterval(intervalId);
  }, [updateRoom]);

  const onAddMovie = useCallback(
    (e: any) => {
      e.preventDefault();
      const movie = { addedBy: room.user, name, url };
      setloading(true);
      axios
        .post("/api/movieRoom/addMovie", { movie, roomid: room.roomid })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert("Error adding movie, please try again");
        })
        .finally(() => {
          updateRoom();
        });
    },
    [room, name, url, updateRoom]
  );

  const movies = room.movies ?? [];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">
        Room of {room.user1} and {room.user2}!
      </h1>
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
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          {movies.length ? (
            <ul className="w-full sm:w-1/2 p-2">
              {movies.map(
                (movie: { name: string; addedBy: string; url: string }) => (
                  <li key={movie.name}>
                    <Link href={movie.url}>
                      <div className="w-full bg-slate-500 p-2 flex justify-center items-center rounded-lg hover:bg-slate-600 mb-3">
                        <h1>
                          {movie.name} <sub>({movie.addedBy})</sub>{" "}
                        </h1>
                      </div>
                    </Link>
                  </li>
                )
              )}
            </ul>
          ) : (
            <h2>Movies either of you add will show up here!</h2>
          )}

          <hr className="border border-slate-900 w-full sm:w-1/2 mb-4 mt-4" />

          <form
            className="flex flex-col gap-4 w-full p-2 sm:w-1/2"
            onSubmit={onAddMovie}
          >
            <button
              onClick={() => setIsFormOpen((a) => !a)}
              type="button"
              className="hover:bg-zinc-800 py-2 px-4 flex items-center"
            >
              <h3 className="text-center text-2xl flex-1">ADD A MOVIE</h3>
              <span
                className={`h-full flex items-center justify-center text-xl transition-all duration-300 ${
                  isFormOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden grid gap-2 ${
                isFormOpen ? "max-h-96" : "max-h-0"
              }`}
              style={{ top: "100%", left: 0 }}
            >
              <input
                className="bg-zinc-500 border border-zinc-500 active:border-zinc-300 p-2 outline-none"
                placeholder="Add a movie name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-required
              />
              <input
                className="bg-zinc-500 border border-zinc-500 active:border-zinc-300 p-2 outline-none"
                placeholder="Add the link to download the movie"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                aria-required
              />
              <div className="flex justify-center">
                <button
                  className="bg-zinc-500 w-64 p-3 mb-1 hover:bg-zinc-700 hover:text-white outline-none"
                  type="submit"
                >
                  Add to List!
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Page;
