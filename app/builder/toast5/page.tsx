"use client";
import React, { useRef, useState } from "react";
import styles from "../../page.module.css";
import Link from "next/link";
import { Code, CodeBlock, anOldHope } from "react-code-blocks";
import { withToast5, useToast5, TOAST_VARIANTS } from "toast5";

const wrapperSnippet = `// hoc
import { withToast5 } from "toast5";

function App() {
  return <Child />;
}

// Wrap with hoc
export default withToast5(App);`;

const createToastSnipper = `import { useToast5 } from "toast5";

export const Child = () => {
  const { addToast } = useToast5();

  return (<button
    onClick={() => {
      addToast({
        message : \`Toast created at \$\{
          Date.now()\}\`
      })
    }
  }>
    I make toasts with timestamps!
  </button>);
}`;

const Page = () => {
  const usageDivRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast5();
  const [message, setMessage] = useState(
    "This is a toast message with timestamp added as only unique toasts are allowed"
  );

  return (
    <div className="flex items-center justify-center flex-col pt-2 mx-2">
      <div
        className="flex items-center justify-center flex-col pt-2"
        style={{ minHeight: "100vh" }}
      >
        <h1 className="text-5xl mb-2">Toast5</h1>
        <p>
          The idea behind building this library was my frustration while trying
          to find a library that gave me simple toasts that had a progress bar
          as I found those to give the best ux
        </p>
        <p>
          I did eventually find a package specifically for toasts that was
          clunky, a pain to use and gave me build errors which made it easier to
          write one myself.
        </p>
        <p className="mt-2">
          <b>TLDR : </b> I couldnt find this so I built it!
        </p>
        <button className=""></button>
        {/* <Link href="#usage"> */}
        <button
          id="target-btn"
          className={`text-large sm:text-xl mt-4 ${styles.styledButton} h-24 mt-48 select-none px-4`}
          onClick={() => {
            usageDivRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Check it out!
          <span className={styles.styledButtonSpan} />
        </button>
        {/* </Link> */}
      </div>

      <div
        className="flex items-center justify-center flex-col pt-2"
        style={{ minHeight: "100vh" }}
        id="usage"
        ref={usageDivRef}
      >
        <h2 className="text-3xl mb-2 mt-8">
          As easy at gets (1..2..3!) while and as barebone as possible.
        </h2>
        <h3 className="text-2xl mt-2">
          <span className="text-4xl">1.</span> Install the package through npm
          or yarn using{" "}
          <span className="text-large">
            <Code text="npm i toast5" language="bash" />{" "}
          </span>
        </h3>

        <h3 className="text-2xl mt-2">
          <span className="text-4xl">2.</span> Wrap the root or a parent
          component with our withToast5 hoc
        </h3>
        <CodeBlock
          showLineNumbers={true}
          text={wrapperSnippet}
          theme={anOldHope}
          language="typescript"
          // customStyle={{
          //   overflowX: 'scroll',
          // }}
    
        />
        <h3 className="text-2xl mt-2">
          <span className="text-4xl">3.</span> Import useToast5 hook and create
          or delete toasts as you like!
        </h3>
        <CodeBlock
          showLineNumbers={true}
          text={createToastSnipper}
          theme={anOldHope}
          language="typescript"
          customStyle={{
            // overflowX: 'scroll',
            // maxWidth: '95%',
          }}

        />
        {/* <Link href="https://www.npmjs.com/package/toast5#advanced-usage"> */}
        <button
          className="border border-slate-500 mt-1 p-2 hover:bg-slate-800 cursor-pointer"
          onClick={() => {
            addToast({ message: `Toast has been created at ${Date.now()}` });
          }}
        >
          I make toasts with timestamps!
        </button>
        {/* </Link> */}
      </div>

      <hr className="border-white w-1/2 sm:w-1/2 mt-16" />

      <div className="text-2xl mt-16">
        <h3 className="text-2xl mb-2">Create different types of toasts!</h3>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            marginBottom: "1rem",
            fontSize: "1rem",
            padding: "0.6rem",
            backgroundColor: "#222",
            border: 0,
            color: "white",
            width: "100%",
          }}
        />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            style={{
              border: 0,
              padding: "0.6rem 1.2rem",
              backgroundColor: "red",
              fontSize: "1rem",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={() =>
              addToast({
                message: message + " " + +new Date(),
                variant: TOAST_VARIANTS.ERROR,
              })
            }
          >
            Add ERROR Toast{" "}
          </button>
          <button
            style={{
              border: 0,
              padding: "0.6rem 1.2rem",
              backgroundColor: "blue",
              fontSize: "1rem",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={() =>
              addToast({
                message: message + " " + +new Date(),
                variant: TOAST_VARIANTS.INFO,
              })
            }
          >
            Add INFO Toast{" "}
          </button>
          <button
            style={{
              border: 0,
              padding: "0.6rem 1.2rem",
              backgroundColor: "green",
              fontSize: "1rem",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={() =>
              addToast({
                message: message + " " + +new Date(),
                variant: TOAST_VARIANTS.SUCCESS,
              })
            }
          >
            Add SUCCESS Toast{" "}
          </button>
        </div>
      </div>
      <hr className="border-white w-1/2 sm:w-1/2 mt-16" />
      <div className="text-large mt-16 flex flex-col">
        <h3 className="text-2xl mb-2">Do more! </h3>
        <Link
          href="https://www.npmjs.com/package/toast5"
          className="text-large text-blue-400"
        >
          1. Published npm package with docs
        </Link>
        <Link
          href="https://github.com/amey-kudari/toast5"
          className="text-large text-blue-400"
        >
          2. Link to open source github
        </Link>
        <Link
          href="https://www.npmjs.com/package/toast5#advanced-usage"
          className="text-large text-blue-400"
        >
          3. Link to advanced doc (change styling, positions, duration and
          behaviour)
        </Link>
      </div>
      <div className="mb-32 mt-16">
        <p>Note: This package is open source and free to use. I would love to know that you are using it in your application!</p>
      </div>
    </div>
  );
};

export default withToast5(Page);
