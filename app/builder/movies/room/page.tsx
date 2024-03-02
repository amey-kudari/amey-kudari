"use client";

// libs
import { useCallback, useEffect, useState } from "react";

// components
import Link from "next/link";
import { Triangle } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaCalendarCheck, FaCalendarMinus } from "react-icons/fa";

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

  const [selectedMovie, setSelectedMovie] = useState("");

  useEffect(() => {
    const intervalId = setInterval(updateRoom, 5000);
    return () => clearInterval(intervalId);
  }, [updateRoom]);

  const onAddMovie = useCallback(
    (e: any) => {
      e.preventDefault();
      const movie = { addedBy: room.user, name, url };
      const movieExists = !!room.movies?.find?.(
        (movie: { name: string }) => movie?.name === "asdfd"
      );
      if (movieExists) {
        alert("Movie already exists :(");
      } else {
      }
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

  const onDelete = useCallback(
    (movieName: string) => {
      const deleteMovie = window.confirm(
        "Are you sure you want to delete this movie? this action can not be undone"
      );
      if (!deleteMovie) return;

      setloading(true);
      axios
        .post("/api/movieRoom/deleteMovie", {
          name: movieName,
          roomid: room.roomid,
        })
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
    [room, updateRoom]
  );

  const onToggleComplete = useCallback(
    (movie: any) => {
      const user = room.user;
      if (user === room.user1) movie.w1 = movie.w1 ? 0 : 1;
      else movie.w2 = movie.w2 ? 0 : 1;

      setloading(true);
      axios
        .post("/api/movieRoom/updateWatchdMovie", {
          movie,
          roomid: room.roomid,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert("Error updating movie, please try again");
        })
        .finally(() => {
          updateRoom();
        });
    },
    [room, updateRoom]
  );

  const movies = room.movies ?? [];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">
        Room of {room.user1.toUpperCase()} and {room.user2.toUpperCase()}!
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
                (movie: {
                  name: string;
                  addedBy: string;
                  url: string;
                  w1?: number;
                  w2?: number;
                }) => (
                  <li key={movie.name}>
                    {/* <Link href={movie.url}> */}
                    <button
                      className={`w-full p-2 rounded-lg mb-3 ${
                        movie.name === selectedMovie
                          ? "bg-slate-600"
                          : "bg-slate-500 hover:bg-slate-700"
                      }`}
                      onClick={() => setSelectedMovie(movie.name)}
                    >
                      {selectedMovie === movie.name ? (
                        <div className="grid">
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
                                <td>{room.user1}</td>
                                <td className="pl-2">
                                  {movie.w1 ? (
                                    <FaCalendarCheck className="text-green-500" />
                                  ) : (
                                    <FaCalendarMinus className="text-red-500" />
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>{room.user2}</td>
                                <td className="pl-2">
                                  {movie.w2 ? (
                                    <FaCalendarCheck className="text-green-500" />
                                  ) : (
                                    <FaCalendarMinus className="text-red-500" />
                                  )}
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div className="flex">
                            <div className="flex-1"></div>
                            <button
                              className="hover:text-green-500"
                              onClick={() => onToggleComplete(movie)}
                            >
                              {(room.user === room.user1 && movie.w1) ||
                              movie.w2 ? (
                                <FaCalendarMinus
                                  size={20}
                                  className="text-red-500"
                                  title="Mark as not watched"
                                />
                              ) : (
                                <FaCalendarCheck
                                  size={20}
                                  className="text-green-500"
                                  title="Mark as not watched"
                                />
                              )}
                            </button>
                            <button
                              className="hover:text-red-500 ml-1"
                              onClick={() => onDelete(movie.name)}
                            >
                              <MdDelete size={25}/>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <h1 className="flex justify-center items-center">
                          {movie.name} <sub>({movie.addedBy})</sub>{" "}
                        </h1>
                      )}
                    </button>
                    {/* </Link> */}
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
