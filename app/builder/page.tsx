"use client";
import React, { useState, useCallback } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [scrollUp, setScrollUp] = useState(false);
  const scrollUpProps = useSpring({
    transform: `translateX(${scrollUp ? "-100%" : "0%"})`,
    config: { stiffness: 300, damping: 50, duration: 200 },
    onRest: () => {
      if (scrollUp) {
        router.push("/builder/versus");
      }
    },
  });

  return (
    <animated.div
      style={scrollUpProps}
      className="flex items-center justify-center flex-col min-h-screen"
    >
      <h1 className="text-5xl text-center">
        Apps and Articles might help you!
      </h1>
      <p className="text-zinc-500 text-center">
        Note : most of my past work as been with clients / companies and can not
        be disclosed. Please ping me for the same. These projects are apps I
        make for fun or articles I make for fun!
      </p>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 mt-2 sm:px-12"
        style={{ minWidth: "50%" }}
      >
        <button
          className="py-4 px-6 border-zinc-400 rounded-lg m-6 border-2 hover:bg-zinc-800 group"
          onClick={() => setScrollUp(true)}
        >
          <h1 className="text-4xl mb-2">Versus</h1>
          <p className="text-zinc-500 group-hover:text-white">
            make stocks from different countries fight!
          </p>
        </button>
        <button className="py-4 px-6 border-zinc-400 rounded-lg m-6 border-2 hover:bg-zinc-800 group">
          <h1 className="text-4xl mb-2">My Engineering Policy</h1>
          <p className="text-zinc-500 group-hover:text-white">
            A small idea about what I feel is important, and how software that
            dont use them tend to be hated :P
          </p>
          <p className="text-zinc-500 group-hover:text-white">
            NOTE: Taken down temporarily
          </p>
        </button>
      </div>
    </animated.div>
  );
};

export default Page;
