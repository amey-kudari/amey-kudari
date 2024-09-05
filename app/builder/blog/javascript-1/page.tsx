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
      <h1 className="text-4xl text-center">Javascript Basics</h1>
      
      <div className="w-full p-4 sm:w-1/2 mt-2 text-l font-light bg-slate-900 rounded-md">
        <ol className="list-decimal list-outside ml-6">
          <li className=" mb-2">
            Javascript was initially created to{" "}
            <strong className="text-red-500">Make Pages Alive</strong>, with programs being called{" "}
            <strong className="text-red-500">scripts</strong>. It was initially called &ldquo;LiveScript&rdquo;, but
            back then because java was huge, this was called Javascript to
            position itself as a <strong className="text-red-500">&lsquo;younger brother&rsquo;</strong> of Java. But
            later became evolved and now is being completely independant, being
            called <strong className="text-red-500">EAMScript</strong>.
          </li>
          <li className="mb-2">
            Javascript now executes on servers as well on a special program
            called <strong className="text-red-500">javascript engine</strong>. Browsers have embedded machines called
            JavaScript virtual machine. Eg: v8 in Chrome, Edge and Opera and
            SpiderMonkey in Firefox.
          </li>
          <li className="mb-2">
            Javascript can modify dom, react to user actions, AJAX, manage cookies and local / session Storage.
          </li>
          <li className="mb-2">
            Javascript <strong className="text-red-500">CAN&lsquo;T</strong>:
            <ol className="ml-6 list-decimal">
              <li>Read or write file system / execute programs. It can only read through special operations like input tag.</li>
              <li>Switch on camera / microphone without explicit user permission.</li>
              <li><strong className="text-red-500">Same Origin Policy</strong> ensures that tabs of different domains can not read each other. Same domain tabs can in some cases when opened by javascript itself</li>
              <li>Cross origin server communication is cripled (server different from the server who gave the webpage), but it can be enabled through extensions or when using javascript outside a browser</li>
            </ol> 
          </li>
          <li className="mb-2">Javascript is <strong className="text-red-500">unique</strong> cuz: Full integration with HTML/CSS; Simple to use; Supported by almost all browsers, enabled by default</li>
        </ol>
        </div>
        <h1 className="text-4xl text-center mt-10">Docs & Script Loading</h1>
        <div className="w-full p-4 sm:w-1/2 text-l font-light bg-slate-900 rounded-md mt-2">

        <ol className="ml-6 list-decimal">
        <li>Most indepth, when you need to refer to be exact <Link href="https://tc39.es/ecma262/" className="text-blue-500 underline">EAM_SCRIPT_262 (Check for updated versions)</Link></li>
        <li>Most cases, google &lsquo;MDN followed by search query&rsquo;</li>
        <li>Check for compatiblity of each new feature, because javascript is a developing language</li>
        </ol>


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
          <strong className="text-red-500">
            <strong className="text-red-500">setTimeout</strong>
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
          within the <strong className="text-red-500">100ms interval</strong>, following which the
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

      <h1 className="text-4xl text-center mt-10">Cheers! 🍻</h1>
    </div>
  );
}
