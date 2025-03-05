"use client"
import { useSpring, animated } from "@react-spring/web";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Page() {
  const [adventureProgress, setAdventureProgress] = useState(-1);

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
    const adprog = window.localStorage.getItem("blocksudoku_adprog");
    if (adprog) {
      setAdventureProgress(Number(adprog));
    }
  }, []);

  return <animated.div
    style={redirectUrlProps}
    className="w-full h-full flex justify-center gap-3 flex-wrap p-4"
  >
    <h1 className="text-4xl text-center w-full">Block sudoku adventure!</h1>
    <hr />
    <h2 className="text-3xl text-center w-full">Level 1</h2>
    {new Array(20).fill(1).map((v, i) => <button
      className={`py-4 px-6 ${adventureProgress < v + i ? "border-zinc-400 hover:bg-zinc-800" : "border-green-400 hover:bg-green-800 bg-green-600"} rounded-lg border-2  group w-[15%] min-w-45 flex items-center justify-center`}
      onClick={() => setRedirectUrl(`/builder/blocksudoku/adventure/${v + i}`)}
      key={v + i}>#{v + i}</button>)}
    <hr />
    <h2 className="text-3xl text-center w-full mb-2 mt-6">Level 2</h2>
    {new Array(20).fill(1).map((v, i) => <button className="py-4 px-6 border-zinc-400 rounded-lg border-2 hover:bg-zinc-800 group w-[15%] min-w-45 flex items-center justify-center"
      onClick={() => setRedirectUrl(`/builder/blocksudoku/adventure/${v + i + 20}`)}
      key={v + i}>#{v + i}</button>)}
    <hr />
    <h2 className="text-3xl text-center w-full mb-2 mt-6">Level 3</h2>

    {new Array(20).fill(1).map((v, i) => <button className="py-4 px-6 border-zinc-400 rounded-lg border-2 hover:bg-zinc-800 group w-[15%] min-w-45 flex items-center justify-center"
      onClick={() => setRedirectUrl(`/builder/blocksudoku/adventure/${v + i + 40}`)}
      key={v + i}>#{v + i}</button>)}
    <hr />
    <h2 className="text-3xl text-center w-full mb-2 mt-6">Level 4</h2>

    {new Array(20).fill(1).map((v, i) => <button className="py-4 px-6 border-zinc-400 rounded-lg border-2 hover:bg-zinc-800 group w-[15%] min-w-45 flex items-center justify-center"
      onClick={() => setRedirectUrl(`/builder/blocksudoku/adventure/${v + i + 60}`)}
      key={v + i}>#{v + i}</button>)}
    <hr />
    <h2 className="text-3xl text-center w-full mb-2 mt-6">Level 5</h2>

    {new Array(20).fill(1).map((v, i) => <button className="py-4 px-6 border-zinc-400 rounded-lg border-2 hover:bg-zinc-800 group w-[15%] min-w-45 flex items-center justify-center"
      onClick={() => setRedirectUrl(`/builder/blocksudoku/adventure/${v + i + 80}`)}
      key={v + i}>#{v + i}</button>)}
    <hr />
    <h2 className="text-3xl text-center w-full py-6">More coming soon!</h2>

  </animated.div>
}