"use client"
import { useSpring, animated } from "@react-spring/web";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Page() {
  const [classicBestScore, setClassicBestScore] = useState(-1);
  const [adventureProgress, setAdventureProgress] = useState(0);

  const router = useRouter();
  const [redirectUrl, setRedirectUrl] = useState("");
  const redirectUrlProps = useSpring({
    transform: `translateX(${redirectUrl ? "-100%" : "0%"})`,
    config: { stiffness: 300, damping: 50, duration: 200 },
    onRest: () => {
      if (redirectUrl.length) {
        router.push(redirectUrl);
      }
    },
  });

  useEffect(() => {
    const savedScore = window.localStorage.getItem("blocksudoku_bestscore");
    const adprog = window.localStorage.getItem("blocksudoku_adprog");
    if (savedScore) {
      setClassicBestScore(Number(savedScore));
      setAdventureProgress(Number(adprog));
    }
  }, []);

  return <animated.div
    style={redirectUrlProps}
    className="w-full h-full flex flex-col items-center justify-center gap-3"
  >
    <h1 className="text-4xl text-center">Block Sudoku! <small>(Superior to blockblast)</small></h1>
    <button
      className="py-4 px-6 border-zinc-400 rounded-lg border-2 hover:bg-zinc-800 group w-72 max-w-[80%]"
      onClick={() => setRedirectUrl("/builder/blocksudoku/classic")}
    >
      <h1 className="text-3xl mb-2">Classic</h1>
      <p className="text-zinc-500 group-hover:text-white">
        {classicBestScore ? `Your current best score : ${classicBestScore}` : "New!"}
      </p>
    </button>
    <button
      className="py-4 px-6 border-zinc-400 rounded-lg border-2 hover:bg-zinc-800 group w-72 max-w-[80%]"
      onClick={() => setRedirectUrl("/builder/blocksudoku/adventure")}
    >
      <h1 className="text-3xl mb-2">Adventure</h1>
      <p className="text-zinc-500 group-hover:text-white">
        {adventureProgress ? `Your progress : ${adventureProgress} / 100` : "New!"}
      </p>
    </button>
  </animated.div>
}