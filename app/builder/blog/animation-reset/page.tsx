"use client";

import Link from "next/link";
import { Code, CodeBlock, anOldHope } from "react-code-blocks";
import { ProgressBar } from "../../tap/components/ProgressBar";
import { useState } from "react";

const oldPB = `const ProgressBar = ({ time, resetAt }: { time: number, resetAt : number }) => {
  const [width, setWidth] = useState("100%");  
  const [removeTransition, setRemoveTransition] = useState(false);

  useEffect(() => {
    setWidth("100%");
    setRemoveTransition(true);
    setTimeout(() => {
      setRemoveTransition(false);
      setWidth("0%");
    }, 100);
  }, [resetAt]);

  return (
    <div
      style={{ width: "50%", height: "0.2rem", backgroundColor: "#fff" }}
    >
      <div
        style={{
          backgroundColor: "#000", height: "100%", width, float: "right",
          transition: removeTransition ? '' : \`width \${time}s linear\`,
        }}
      ></div>
    </div>
  );
}`;

const newPB = `const ProgressBar = ({ time, resetAt }: { time: number, resetAt : number }) => {
  const [width, setWidth] = useState("100%");  
  const [removeTransition, setRemoveTransition] = useState(false);

  const channel = new MessageChannel();

  channel.port1.onmessage = function() {
   if(removeTransition){
    setRemoveTransition(false);
   } else setWidth("0%");
  };
 
  requestAnimationFrame(function () {
    channel.port2.postMessage(undefined);
  });

  useLayoutEffect(() => {
    setWidth("100%");
    setRemoveTransition(true);
  }, [resetAt]);


  return (
    <div
      style={{ width: "50%", height: "0.2rem", backgroundColor: "#fff" }}
    >
      <div
        style={{
          backgroundColor: "#000", height: "100%", width, float: "right",
          transition: removeTransition ? '' : \`width \${time}s linear\`,
        }}
      ></div>
    </div>
  );
}`;

export default function Page() {
  const [resetAt, setResetAt] = useState(Date.now());
  return (
    <div className="flex flex-col justify-center items-center min-h-full py-4">
      <h1 className="text-4xl text-center">Resetting animations in React</h1>
      <div className="w-full p-4 sm:w-1/2 mt-2 text-xl font-light bg-slate-900 rounded-md">
        <p className="indent-5">
          I was recently trying to create an fps aim trainer application. For
          the progress bar. For this particular case, I needed a progress bar
          that terminates on a fixed time period, so instead of using JS, I used
          CSS animations.
        </p>
        <p className="mt-4">
          This removes the{" "}
          <strong className="font-bold">
            granularity vs performance issue
          </strong>
          (with JS, you would set an interval and keep updating progress bar
          manually).
        </p>
        <p className="mt-4">
          The progress bar I used needed a reset button, for which I started
          with this solution from stack overflow,{" "}
          <Link
            href="https://stackoverflow.com/questions/70513123/re-triggering-css-animations-with-react"
            className="underline text-blue-500"
          >
            Stack Overflow Solution
          </Link>{" "}
          to get the below progress bar:
        </p>

        <CodeBlock
          showLineNumbers={true}
          text={oldPB}
          theme={anOldHope}
          language="typescript"
          customStyle={{
            overflowX: "scroll",
          }}
        />
        <p>
          The problem with the above solution is the{" "}
          <strong>
            <em>setTimeout</em>
          </strong>
          . That is not good practice, and causes a jitter. In most cases, it
          wouldnt be visible because we can set a timeout small enough, but that
          is not good practice as it wont be consistent across devices.
        </p>
      </div>

      <h1 className="text-4xl text-center mt-10">Analyze!</h1>
      <div className="w-full p-4 sm:w-1/2 mt-2 text-xl font-light bg-slate-900 rounded-md">
        <p>
          We know why above code is bad, now lets run through the above code and
          see what happens in case of a reset
        </p>
        <ol className="list-decimal	ml-7 mt-2 mb-2">
          <li className="mb-2">
            Parent sets new resetAt time (set to Date.now())
          </li>
          <li className="mb-2">
            <strong className="font-mono font-bold">useEffect</strong> runs with
            new <strong className="font-mono font-bold">resetAt</strong>, and
            sets{" "}
            <strong className="font-mono font-bold">removeTransition</strong> to
            true, removing transition effect from the component and width to
            100%
          </li>
          <li className="mb-2">
            <strong className="font-mono font-bold">useEffect</strong> runs
            asynchronously, with the paint step (html compiled at browser), and
            after it runs, a rerender is triggered.{" "}
            <span className="text-red-500 font-bold">
              We assume should take less than 100ms in almost all cases.
            </span>
          </li>
          <li className="mb-2">
            After 100 ms, width gets reset, and then we set the removeTransition
            to false, enabling animations and width to 0%.
          </li>
        </ol>
        <p className="mt-2">
          The above works primarily because the paint step finishes 1 time
          within the <strong>100ms interval</strong>, following which the
          animation is added back. However, we can achieve the same results
          without manually setting a useTimeout.
        </p>
      </div>

      <h1 className="text-4xl text-center mt-10">Solution!</h1>
      <div className="w-full p-4 sm:w-1/2 mt-2 text-xl font-light bg-slate-900 rounded-md">
        <p>
          One solution to the above problem is ensuring that the animation is
          removed and width is reset just before the paint step. And now, after
          the paint step, we will add the animation and reset the width. Go over{" "}
          <Link
            href="https://stackoverflow.com/questions/56727477/react-how-does-react-make-sure-that-useeffect-is-called-after-the-browser-has-h"
            className="underline text-blue-500"
          >
            this stackoverflow post
          </Link>
          , and then look at this code below.
        </p>
        <CodeBlock
          showLineNumbers={true}
          text={newPB}
          theme={anOldHope}
          language="typescript"
          customStyle={{
            overflowX: "scroll",
          }}
        />
        <p>
          <strong className="font-mono font-bold">useLayoutEffect</strong> runs
          synchronously, and it runs before the render step. Following this, we
          have seen in the above link,{" "}
          <strong className="font-mono font-bold">
            channel.port1.onmessage
          </strong>{" "}
          will run after a paint step.
        </p>
        <p>
          This allows us to add the transition animation back to the component
          after its width has been reset. When it gets added, another repaint
          occurs, and at this time, we update the width of the component to 0,
          to trigger the animation.
        </p>
      </div>

      <h1 className="text-4xl text-center mt-10">Progress bar in action</h1>
      <div className="w-full p-4 sm:w-1/2 mt-2 text-xl font-light bg-slate-900 rounded-md">
        <div className="flex justify-center items-center">
          <ProgressBar time={5} resetAt={resetAt} />
          <button
            className="py-4 px-6 border-zinc-400 rounded-lg m-6 border-2 hover:bg-zinc-800 group"
            onClick={() => setResetAt(Date.now())}
          >
            RESET
          </button>
        </div>
        <div>
          <h2>Applications that use this progress bar:</h2>
          <ol className="list-decimal	ml-7 mt-2 mb-2">
            <li>
              <Link
                href="/builder/toast5"
                className="underline text-blue-500"
                target="_blank"
              >
                Toast5 (Snappy Toasts)
              </Link>
            </li>
            <li>
              <Link
                href="/builder/tap"
                className="underline text-blue-500"
                target="_blank"
              >
                Tap (Aimlab / reaction time test)
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
