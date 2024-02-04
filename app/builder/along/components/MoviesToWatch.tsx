"use client";
import axios from "axios";
import { MongoClient, ServerApiVersion } from "mongodb";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Triangle } from "react-loader-spinner";

export const MoviesToWatch = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [passcode, setPasscode] = useState("");
  useEffect(() => {
    setLoading(true);
    axios.get("/api/movies").then((res) => {
      setMovies(res.data ?? []);
    }).finally(() => setLoading(false));
  }, []);

  const onAddMovie = (e: any) => {
    console.log('CALLED!!');
    e.preventDefault();
    if (
      (passcode === "potty" || passcode === "asdf") &&
      name.length > 0 &&
      url.length > 0
    ) {
      setLoading(true);
      axios.post("/api/movies", {
        movies: [
          ...movies,
          { name, addedBy: passcode === "asdf" ? "amey" : "potty", url },
        ],
      }).then(() => {
        alert('Movie Added successfully!');
        axios.get("/api/movies").then((res) => {
          setMovies(res.data ?? []);
        }).finally(() => setLoading(false));
      }).catch(() => setLoading(false));
    } else alert('INVALID VALUES');
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Movies to watch!</h1>
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

          <hr className="border border-slate-900 w-full sm:w-1/2 mb-4 mt-4"/>

          <form
            className="flex flex-col gap-4 w-full p-2 sm:w-1/2"
            onSubmit={onAddMovie}
          >
            <h3 className="text-center text-2xl">ADD A MOVIE</h3>
            <input
              className="bg-zinc-500 border border-zinc-500 active:border-zinc-300 p-2 outline-none"
              placeholder="Add a movie name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="bg-zinc-500 border border-zinc-500 active:border-zinc-300 p-2 outline-none"
              placeholder="Add the link to download the movie"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              className="bg-zinc-500 border border-zinc-500 active:border-zinc-300 p-2 outline-none"
              placeholder="your passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
            <div className="flex justify-center">
              <button className="bg-zinc-500 w-64 p-3 hover:bg-zinc-700 hover:text-white" type="submit">
                ADD!
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
