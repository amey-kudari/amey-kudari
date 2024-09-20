"use client";
import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useRouter } from "next/navigation";

const Page = () => {
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

  return (
    <animated.div
      style={redirectUrlProps}
      className="flex items-center justify-center flex-col min-h-screen"
    >
      <h1 className="text-5xl text-center">Apps and Articles!</h1>
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
          onClick={() =>
            window.open("https://itest-prep.vercel.app/", "_blank")
          }
        >
          <h1 className="text-4xl mb-2">ITest-Prep</h1>
          <p className="text-zinc-500 group-hover:text-white">
            AI powered Test based learning tool
          </p>
          <p className="text-zinc-500 group-hover:text-white">
            Incomplete, work in progress. Code is not currently public.
          </p>
        </button>

        <button
          className="py-4 px-6 border-zinc-400 rounded-lg m-6 border-2 hover:bg-zinc-800 group"
          onClick={() => setRedirectUrl("/builder/tap")}
        >
          <h1 className="text-4xl mb-2">Tap</h1>
          <p className="text-zinc-500 group-hover:text-white">
            Tells you your reaction time.
          </p>
          <p className="text-zinc-500 group-hover:text-white">
            How quickly can you click after seeing something on screen? Helps
            with fps and flash sales!
          </p>
        </button>

        <button
          className="py-4 px-6 border-zinc-400 rounded-lg m-6 border-2 hover:bg-zinc-800 group"
          onClick={() => setRedirectUrl("/builder/toast5")}
        >
          <h1 className="text-4xl mb-2">Toast5</h1>
          <p className="text-zinc-500 group-hover:text-white">
            Extremely easy to use, while prioritizing good ux, and not
            compromising on functionality I felt were required.
          </p>
          <p className="text-zinc-500 group-hover:text-white">
            Note: Published npm package that can be used by any application.
          </p>
        </button>

        <button
          className="py-4 px-6 border-zinc-400 rounded-lg m-6 border-2 hover:bg-zinc-800 group"
          onClick={() => setRedirectUrl("/builder/versus")}
        >
          <h1 className="text-4xl mb-2">Versus</h1>
          <p className="text-zinc-500 group-hover:text-white">
            make stocks from different countries fight!
          </p>
          <p className="text-zinc-500 group-hover:text-white">
            Compares any two stocks, adjusting for currency discrepancies
          </p>
        </button>
        <button
          className="py-4 px-6 border-zinc-400 rounded-lg m-6 border-2 hover:bg-zinc-800 group"
          onClick={() => setRedirectUrl("/builder/movies")}
        >
          <h1 className="text-4xl mb-2">Movie Room!</h1>
          <p className="text-zinc-500">
            Movieroom lets you list, review or judge, and track who has watched
            how much of every movie / series you list! You can also archive them
            for later!
          </p>
          <p className="text-zinc-500 group-hover:text-white">
            Note: under development, ETA: end of feb, 2024. Highly unstable till
            then and very limited features. Created rooms will remain
          </p>
        </button>

        <button
          className="py-4 px-6 border-zinc-400 rounded-lg m-6 border-2 hover:bg-zinc-800 group"
          onClick={() => setRedirectUrl("/builder/blog")}
        >
          <h1 className="text-4xl mb-2">BLOG</h1>
          <p className="text-zinc-500">
            Articles about frontend topics I have learnt in my career.
          </p>
          {/* <p className="text-zinc-500 group-hover:text-white"> */}
          {/* NOTE: Taken down temporarily */}
          {/* </p> */}
        </button>

        <button
          className="py-4 px-6 border-zinc-400 rounded-lg m-6 border-2 hover:bg-zinc-800 group"
          onClick={() =>
            setRedirectUrl("https://amey-kudari.github.io/css/a2/")
          }
        >
          <h1 className="text-4xl mb-2">Sprinklr Care Console UI</h1>
          <p className="text-zinc-500 group-hover:text-white">
            A partially configured care console ui of sprinklr I built during my
            internship!
          </p>
          <p className="text-zinc-500 group-hover:text-white">
            (Uploaded here with permission)
          </p>
        </button>

        <button
          className="py-4 px-6 border-zinc-400 rounded-lg m-6 border-2 hover:bg-zinc-800 group"
          onClick={() =>
            setRedirectUrl("https://amey-kudari.github.io/css/js-a2-react/")
          }
        >
          <h1 className="text-4xl mb-2">Typeracer!</h1>
          <p className="text-zinc-500 group-hover:text-white">
            Typing test! Just type and watch the progress bar, or lauch a round
            and set your best score!
          </p>
          <p className="text-zinc-500 group-hover:text-white">
            Built during my internship at Sprinklr!
          </p>
          <p className="text-zinc-500 group-hover:text-white">
            Note: All code to sprinklr projects are public, on my github
          </p>
        </button>

        {/* <button
          className="py-4 px-6 border-zinc-400 rounded-lg m-6 border-2 hover:bg-zinc-800 group"
          onClick={() => setRedirectUrl("/builder/sponsors")}
        >
          <h1 className="text-4xl mb-2">Sponsoring companies</h1>
          <p className="text-zinc-500 group-hover:text-white">
            A basic list of scraped companies arranged in order of number of
            sponsorships in 2024! The target year.
          </p>
          <p className="text-zinc-500 group-hover:text-white">
            List last updated : 18-Mar-24
          </p>
        </button> */}
      </div>
    </animated.div>
  );
};

export default Page;
