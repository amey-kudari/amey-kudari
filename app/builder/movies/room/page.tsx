"use client";

// libs
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";

// components
import { Triangle } from "react-loader-spinner";
import { ListItem } from "./components/ListItem";
import Image from "next/image";
import { FaPaintBrush, FaPoop } from "react-icons/fa";

// hooks
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [filter, setFilter] = useState("all");
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

  const [loading, setloading] = useState(true);
  useEffect(() => {
    const roomString = window.localStorage.getItem("room");
    if (!roomString) {
      router.push("/builder/movies");
    } else setRoom(JSON.parse(roomString));
  }, [router]);

  const updateRoom = useCallback(
    (cb?: () => void) => {
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
        .catch((err) => {})
        .finally(() => {
          if (loading) setloading(false);
          if (cb) cb();
        });
    },
    [room, loading]
  );

  const [selectedMovie, setSelectedMovie] = useState("");

  useEffect(() => {
    updateRoom();
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

  const movies = useMemo(() => room.movies ?? [], [room]);

  const filteredMovies = useMemo(
    () =>
      movies.filter((movie: { w1: number; w2: number }) => {
        const w = room.user === room.user1 ? movie.w1 : movie.w2;
        if (filter === "new" && w > 0) return false;
        if (filter === "watching" && (w === 0 || w === 100)) return false;
        return true;
      }),
    [filter, room, movies]
  );

  const [showPoop, setShowPoop] = useState(false);
  const [paint, setPaint] = useState(false);
  const [poopPos, setPoopPos] = useState({
    x: 0,
    y: 0,
  });

  const timeoutRef = useRef<number>(0);

  const [showPoop1, setShowPoop1] = useState(false);
  const [poopPos1, setPoopPos1] = useState({
    x: 0,
    y: 0,
  });
  const [poopPos2, setPoopPos2] = useState({
    x: 0,
    y: 0,
  });

  const intervalRef = useRef<number>(0);
  useEffect(() => {
    if (!showPoop1) clearInterval(intervalRef.current);
    else {
      intervalRef.current = setInterval(() => {
        setPoopPos1({
          x: window.innerWidth * Math.random(),
          y: window.innerHeight * Math.random(),
        });
        setPoopPos2({
          x: window.innerWidth * Math.random(),
          y: window.innerHeight * Math.random(),
        });
      }, 2000) as unknown as number;
    }
    return () => clearInterval(intervalRef.current);
  }, [showPoop1]);

  const [looseMotionCount, setLooseMotionCount] = useState([100]);
  const laxative = useRef<number>(0);
  useEffect(() => {
    if (showPoop1) {
      laxative.current = setInterval(() => {
        setLooseMotionCount((current) => {
          if (current.length > 1) {
            return current.slice(0, -1);
          }
          return current;
        });
      }, 2500) as unknown as number;
      return () => clearInterval(laxative.current);
    }
  }, [showPoop1]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${
        movies.length === 0 ? "justify-center" : "pt-12"
      } ${movies.length < 8 ? "pt-48" : ""}`}
      onClick={(e) => {
        if (showPoop) {
          if (room.user1 === "potty" || room.user2 === "potty") {
            setShowPoop1(true);
          }
          setShowPoop(true);
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(
            () => setShowPoop(false),
            2000
          ) as unknown as number;
          setPoopPos({
            x: e.clientX,
            y: e.clientY,
          });
        }
      }}
      style={
        paint
          ? {
              backgroundImage: 'url("/pastels.png")',
              backgroundRepeat: "repeat-y",
              backgroundSize: "100% auto",
            }
          : {}
      }
    >
      {showPoop ? (
        <Image
          src="/rainbow_poop_nobg.png"
          alt="rainbow poop for potty"
          width={100}
          height={100}
          className="fixed transition-all duration-1000"
          style={{
            top: poopPos.y - 50 + "px",
            left: poopPos.x - 50 + "px",
            opacity: showPoop ? 1 : 0,
          }}
          onClick={() => {
            setLooseMotionCount((current) => [
              ...current,
              Math.floor(Math.random() * 200),
            ]);
          }}
          onTouchStart={() => {
            setLooseMotionCount((current) => [
              ...current,
              Math.floor(Math.random() * 200),
            ]);
          }}
        />
      ) : null}

      {showPoop1 ? (
        <>
          <Image
            src="/rainbow_poop_nobg.png"
            alt="rainbow poop for potty"
            width={100}
            height={100}
            className="fixed transition-all duration-1000"
            style={{
              top: poopPos1.y - 50 + "px",
              left: poopPos1.x - 50 + "px",
              opacity: showPoop1 ? 1 : 0,
            }}
            onClick={() => {
              setLooseMotionCount((current) => [
                ...current,
                Math.floor(Math.random() * 200),
              ]);
            }}
            onTouchStart={() => {
              setLooseMotionCount((current) => [
                ...current,
                Math.floor(Math.random() * 200),
              ]);
            }}
          />
          <Image
            src="/rainbow_poop_nobg.png"
            alt="rainbow poop for potty"
            width={100}
            height={100}
            className="fixed transition-all duration-1000"
            style={{
              top: poopPos2.y - 50 + "px",
              left: poopPos2.y - 50 + "px",
              opacity: showPoop1 ? 1 : 0,
            }}
          />

          {looseMotionCount.map((size, id) => (
            <Image
              key={id * 1000 + size}
              src="/rainbow_poop_nobg.png"
              alt="rainbow poop for potty"
              width={100}
              height={100}
              className="fixed transition-all duration-1000"
              style={{
                top: window.innerHeight * Math.random() - 50 + "px",
                left: window.innerWidth * Math.random() - 50 + "px",
                opacity: showPoop1 ? 1 : 0,
              }}
            />
          ))}
        </>
      ) : null}
      <button
        className={`fixed top-3 right-3 bg-slate-700 p-3 rounded-full bg-opacity-50 hover:bg-opacity-100 ${
          paint ? "text-pink-500" : ""
        }`}
        onClick={() => setPaint((a) => !a)}
      >
        <FaPaintBrush size={25} />
      </button>
      <button
        className={`fixed top-3 left-3 bg-slate-700 p-3 rounded-full bg-opacity-0 opacity-0 hover:bg-opacity-100 hover:opacity-100 ${
          showPoop ? "text-pink-500" : ""
        }`}
        onClick={() => setShowPoop((a) => !a)}
      >
        <FaPoop size={25} />
      </button>
      <h1 className={`text-3xl mb-4 ${paint ? "text-black" : ""}`}>
        Room of {room.user1.toUpperCase()} and {room.user2.toUpperCase()}!
      </h1>
      <div className="flex w-full sm:w-1/2 p-2 mb-2">
        <div className="flex-1"></div>
        <button
          className={`px-6 py-2 border-black border rounded-l-full pl-8 ${
            filter === "all"
              ? "bg-slate-600 font-semibold	"
              : "bg-slate-500 hover:bg-slate-700"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`px-6 py-2 border-black border border-l-0 border-r-0 ${
            filter === "watching"
              ? "bg-slate-600 font-semibold	"
              : "bg-slate-500 hover:bg-slate-700"
          }`}
          onClick={() => setFilter("watching")}
        >
          Watching
        </button>
        <button
          className={`px-6 py-2 border-black border rounded-r-full pr-8 ${
            filter === "new"
              ? "bg-slate-600 font-semibold	"
              : "bg-slate-500 hover:bg-slate-700"
          }`}
          onClick={() => setFilter("new")}
        >
          New
        </button>
      </div>
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
        <div className="w-full flex flex-col items-center">
          {filteredMovies.length ? (
            <ul className="w-full sm:w-1/2 p-2">
              {filteredMovies.map(
                (movie: {
                  name: string;
                  addedBy: string;
                  url: string;
                  w1?: number;
                  w2?: number;
                }) => (
                  <ListItem
                    room={room}
                    movie={movie}
                    onDelete={onDelete}
                    selectedMovie={selectedMovie}
                    setSelectedMovie={setSelectedMovie}
                    key={movie.name}
                    updateRoom={updateRoom}
                  />
                )
              )}
            </ul>
          ) : (
            <h2>
              {movies.length
                ? "All movies are filtered out, please select a different filter"
                : "Movies either of you add will show up here!"}
            </h2>
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
              <h3
                className={`flex-1 text-center text-2xl ${
                  paint ? "text-black hover:text-white" : ""
                }`}
              >
                ADD A MOVIE
              </h3>
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
