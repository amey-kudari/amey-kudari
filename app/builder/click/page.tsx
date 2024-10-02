"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [buttons, setButtons] = useState(() =>
    Object.fromEntries(new Array(9).fill(false).map((v, i) => [i, v]))
  );
  const [game, setGame] = useState<"none" | "done" | "running">("none");
  const [timer, setTimer] = useState(20);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 9));

  // 20 second games
  const stateGame = () => {
    setGame("running");
    setTimer(20);
    setScore(0);
  };

  useEffect(() => {
    if (timer > 0) {
      const timeoutId = setTimeout(() => {
        setTimer((tmp) => Math.max(0, tmp - 1));
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else if (game === "running") {
      setGame("done");
    }
  }, [timer, game]);

  const newRandom = () => {
    let nr = Math.floor(Math.random() * 9);
    while(nr === target){
      nr = Math.floor(Math.random() * 9);
    }
    return nr;
  }
  const click = () => {
    setScore((prev) => prev + 1);
    setTarget(Math.floor(Math.random() * 9));
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="mb-4 text-3xl">Click the greens!</h1>
      <div className="mb-2">
        {game === "none" || game === "done" ? (
          <button
            className="border border-slate-500 p-2 hover:bg-gray-800"
            onClick={stateGame}
          >
            {game === "done" ? "RETRY" : "START"}
          </button>
        ) : null}
        {game === "running" ? <h2>{timer}</h2> : null}
      </div>
      {game === "running" ? (
        <div className="w-1/4 h-[2px] bg-gray-800 mb-4">
          <div
            className={`h-full bg-white transition-all duration-1000 ease-linear`}
            style={{ width: (100 - 5 * timer) / 0.95 + "%" }}
          ></div>
        </div>
      ) : null}

      <div className="grid grid-cols-3 gap-4">
        {Object.keys(buttons).map((key) => (
          <button
            key={key}
            onClick={() => {
              if (Number(key) === target && game === "running") {
                click();
              } else {
                setScore(prev => Math.max(prev - 2, 0));
              }
            }}
            className={`w-24 h-24 ${
              game === "running" && Number(key) === target
                ? "bg-green-600"
                : "bg-red-600"
            } cursor-crosshair`}
          ></button>
        ))}
      </div>
      {game !== "none" ? (
        <h2 className="mt-2 text-3xl">SCORE : {score}</h2>
      ) : null}
    </div>
  );
}
