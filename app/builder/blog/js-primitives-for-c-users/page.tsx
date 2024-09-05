"use client";

import Link from "next/link";
import { Code, CodeBlock, anOldHope } from "react-code-blocks";
import { ProgressBar } from "../../tap/components/ProgressBar";
import { useState, useEffect, memo, useRef } from "react";
import { withToast5, useToast5, TOAST_VARIANTS } from "toast5";
import { CiPlay1 } from "react-icons/ci";

const oldPB = `const stringStartsWithCapitalLetter = (st) => {
    const firstCharCode = st.charCodeAt(0);
    return (firstCharCode >= 'A'.charCodeAt(0) && firstCharCode <= 'Z'.charCodeAt(0))
}
// note, above funciton is not O(n), but O(1), run this code to check)
const st = new Array(1000000).fill('A').join("");
const start = Date.now();
for(let i=0;i<10000000;i++){ stringStartsWithCapitalLetter(st); }
const timeTaken = Date.now() - start;

addToast({ message: \`Time taken \${timeTaken}ms\ at \${new Date().toLocaleTimeString()}\` });

// if the string was being copied, it would take a lot longer!`;

const newPB = `let wheat = "Wheat";
const doubleString = (st) => { st+=st; }

const start = Date.now();
for(let row=0;row<8;row++){
    for(let col=0;col<8;col++){
        doubleString(wheat);
    }
}
const timeTaken = Date.now() - start;

// Dont worry, your browser won't explode.
addToast({ message: 
  \`Time taken \${timeTaken}ms\, at \${new Date().toLocaleTimeString()}\` });
`;

const errorCode = `let wheat = "Wheat";
try{
    for(let row=0;row<8;row++){
        for(let col=0;col<8;col++){
            wheat+=wheat;
        }
    }
} catch(err){
    addToast({message: String(err), variant: TOAST_VARIANTS.ERROR });
}`;

const rerenderCode = `import { useState, useEffect } from "react";

const Component = () => {
    const [str, setStr] = useState(() => "String");
    const [srr, setSrr] = useState(() => "String".split(""));

    useEffect(() => {
        addToast({message: \`Rerendered at \${new Date().toLocaleTimeString()}\`});
    }, [str, srr]);
  
    return (
        <div>
            <div>
                <h4>String value: {JSON.stringify(str)}</h4>
                <h4>Char Array value: {JSON.stringify(srr)}</h4>
            </div>
            <button className={buttonClass} onClick={() => setStr("String")}>
                Change String
            </button>
            <button className={buttonClass} onClick={() => setSrr("String".split(""))}>
                Change Char Array
            </button>
            <p>
              Changing Char array rerenders the component, but changing the string does not.
            </p>
          </div>
      );
}
`;

const buttonStyle = "border border-slate-500 mt-1 p-2 mr-4";
const Component = memo(() => {
  const [str, setStr] = useState(() => "String");
  const [srr, setSrr] = useState(() => "String".split(""));
  const { addToast } = useToast5();

  useEffect(() => {
    addToast({ message: `Rerendered at ${new Date().toLocaleTimeString()}` });
  }, [str, srr]);

  return (
    <div>
      <div>
        <h4>String value: {JSON.stringify(str)}</h4>
        <h4>Char Array value: {JSON.stringify(srr)}</h4>
      </div>
      <button className={buttonStyle} onClick={() => setStr("String")}>
        Change String
      </button>
      <button
        className={buttonStyle}
        onClick={() => setSrr("String".split(""))}
      >
        Change Char Array
      </button>
      <p>
        Changing Char array rerenders the component, but changing the string
        does not.
      </p>
    </div>
  );
});

function Page() {
  const [resetAt, setResetAt] = useState(Date.now());
  const { addToast } = useToast5();

  return (
    <div className="flex flex-col justify-center items-center min-h-full py-4">
      <h1 className="text-4xl text-center">
        Primitive Variables in Javascript
      </h1>
      <div className="w-full p-4 sm:w-1/2 mt-2 text-xl font-light bg-slate-900 rounded-md">
        <p className="indent-5">
          Like most people who learnt CS from an engineering college, Javascript
          was not my first language. However, it is the language I like the
          most! The{" "}
          <strong className="text-red-500">
            first language I had learnt was C
          </strong>
          . While learning C gave a huge advantage in understanding Javascript,
          it also has differences that cause problems.
        </p>
        <p className="indent-5 mt-4">
          The biggest one was how C gives low level access to memory, allowing
          to access memory directly. We have variables and arrays, and strings
          in C are pretty much arrays. That isnt the case with Javascript.
          Javascript is more{" "}
          <strong className="text-red-500">Modern and Safe</strong>, and does
          not give you low level access to memory. This can make it confusing to
          understand strings for people who are coming from C. For example, we
          can{" "}
          <strong className="text-red-500">pass strings by reference</strong> to
          functions to avoid copying the string or to allow modifying the string
          while writing programs in C.
        </p>
        <p className="indent-5 mt-4 mb-2">
          In Javascript, unlike C,{" "}
          <strong className="text-red-500">
            strings are treated as primitives
          </strong>{" "}
          (among number, bigint, boolean, null, undefined, symbol). You are
          allowed to assume all of the primitives are passed by value, and many
          aritcles online state the same (
          <Link
            target="_blank"
            className="underline text-blue-500"
            href="https://www.linkedin.com/pulse/javascript-pass-value-reference-simplified-jay-tillu-l4ydf/"
          >
            First google link on topic
          </Link>{" "}
          ). However, it would be very inefficient if we are copying entire
          strings while passing it as an argument to a function. If we make that
          assumption, the below function would be O(n), and not O(1)
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
        <button
          className="border border-slate-500 mt-1 p-2 hover:bg-slate-800 cursor-pointer mb-2 flex items-center gap-2"
          onClick={() => {
            const stringStartsWithCapitalLetter = (st: any) => {
              const firstCharCode = st.charCodeAt(0);
              return (
                firstCharCode >= "A".charCodeAt(0) &&
                firstCharCode <= "Z".charCodeAt(0)
              );
            };
            // note, above funciton is not O(n), but O(1), run this code to check)
            const st = new Array(1000000).fill("A").join("");
            const start = Date.now();
            for (let i = 0; i < 10000000; i++) {
              stringStartsWithCapitalLetter(st);
            }
            const timeTaken = Date.now() - start;
            addToast({
              message: `Time taken ${timeTaken}ms at ${new Date().toLocaleTimeString()}`,
            });
          }}
        >
          <CiPlay1 /> Run the above code
        </button>

        <p className="mt-4">
          Clearly, it is not passed by value. So what can it be? it must be
          passed by reference right? Yes, but you can not make that assumption.
          For example, run the code below. If you havent already, look up this{" "}
          <Link
            target="_blank"
            href="https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem"
            className="underline text-blue-500"
          >
            Wheat on a chessboard
          </Link>
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
        <button
          className="border border-slate-500 mt-1 p-2 hover:bg-slate-800 cursor-pointer mb-2 flex items-center gap-2"
          onClick={() => {
            let wheat = "Wheat";
            const doubleString = (st: string) => {
              st += st;
            };

            const start = Date.now();
            for (let row = 0; row < 8; row++) {
              for (let col = 0; col < 8; col++) {
                doubleString(wheat);
              }
            }
            const timeTaken = Date.now() - start;
            addToast({
              message: `Time taken ${timeTaken}ms, at ${new Date().toLocaleTimeString()}`,
            });
          }}
        >
          <CiPlay1 /> Run the above code
        </button>

        <p className="mt-4">The below code however, will give you an</p>
        <CodeBlock
          showLineNumbers={true}
          text={errorCode}
          theme={anOldHope}
          language="typescript"
          customStyle={{
            overflowX: "scroll",
          }}
        />
        <button
          className="border border-slate-500 mt-1 p-2 hover:bg-slate-800 cursor-pointer mb-2 flex items-center gap-2"
          onClick={() => {
            let wheat = "Wheat";
            try {
              for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                  wheat += wheat;
                }
              }
            } catch (err) {
              addToast({ message: String(err), variant: TOAST_VARIANTS.ERROR });
            }
          }}
        >
          <CiPlay1 /> Run the above code
        </button>
        <p>
          That is not very consistent with what we have learnt with C language.
          Or the Computer programming course in our bachelors.
        </p>
      </div>

      <h1 className="text-4xl text-center mt-10">
        So, how are strings actually passed?
      </h1>
      <div className="w-full p-4 sm:w-1/2 mt-2 text-xl font-light bg-slate-900 rounded-md">
        <p className="indent-4 mb-4">
          The first codeblock should confirm, that the string is indeed passed
          by value, or javascript figured out a 4th dimention of turing
          machines. The former turns out to be correct here,{" "}
          <strong className="text-red-500">
            strings are passed by reference, but not quite.
          </strong>{" "}
          Still not convinced? Try running these two links,
          <a
            target="_blank"
            className="underline text-blue-500 mx-2"
            href="https://leetcode.com/playground/EnKV2Bj7"
          >
            C++ Playground
          </a>
          <a
            target="_blank"
            className="underline text-blue-500 mx-2"
            href="https://leetcode.com/playground/F2r9gxPH"
          >
            Javscript Playground
          </a>
          .
        </p>
        <p className="indent-4">
          For almost all practical purposes, we can make an assumption, that
          strings are passed by value. However, the strings passed as parameters
          are treated as immutable. You can modify the string parameter within
          the function (not recommended, bad practice), and only in such a case,
          a copy of the string is created. This is implicit, similar to how the{" "}
          <strong>this</strong> keyword is implicitly created and returned in{" "}
          <Link
            target="_blank"
            href="https://www.w3schools.com/js/js_object_constructors.asp"
            className="underline text-blue-500"
          >
            Constructor
          </Link>{" "}
          functions.
        </p>
        <p className="indent-4 mt-4 mb-2">
          Another caveat related the javascript strings (extends to bigint, and
          other primitives mentioned above), is that they can be compared. You
          can compare two strings or bigints or other primitives using the ===
          or == opertors. Why is this important? to help you understand why the
          react component below behaves the way it does. (This may seem obvious
          to people who started with javascript, but this article is focussed on
          people who learnt C as their first language). Look at this other
          example below,
        </p>
        <CodeBlock
          showLineNumbers={true}
          text={rerenderCode}
          theme={anOldHope}
          language="jsx"
          customStyle={{
            overflowX: "scroll",
          }}
        />
        <p>Our component is rendered below</p>
        <div className="bg-white text-black p-4">
          <Component />
        </div>
        <p className="mt-2"></p>
      </div>

      <h1 className="text-4xl text-center mt-10">Key Notes!</h1>
      <div className="w-full p-4 sm:w-1/2 mt-2 text-xl font-light bg-slate-900 rounded-md">
        <ol className="list-decimal ml-6">
          <li className="mb-2">
            Why is this different from C? Because javascript serves a different
            purpose. To anyone who started with javascript, C would be a pain to
            learn!
          </li>
          <li className="mb-2">
            Does that mean learning C makes it harder to learn Javascript? Nope.
            It helps you understand how javascript works. Once you learn what is
            happening, you can be 100% sure on how your code will execute, and
            the syntax helps you code a lot faster!
          </li>
          <li className="mb-2">
            Are there other concepts in javascript that are abstract, and
            relatively different from lower level language like C? Yes. But I do
            not have blog articles for all.
          </li>
          <li className="mb-2">
            How do we learn what is different then? You can either refer to the{" "}
            <Link
              target="_blank"
              className="underline text-blue-500"
              href="https://ecma-international.org/publications-and-standards/standards/ecma-262/"
            >
              ECMA docs
            </Link>{" "}
            and changelogs, or you can learn javascript as a new language again,
            completely from{" "}
            <Link
              target="_blank"
              className="underline text-blue-500"
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            >
              MDN
            </Link>
            . (I learnt directly from the docs, and I would recommend the same.)
          </li>
        </ol>
      </div>

      <h1 className="text-4xl text-center mt-10">Cheers! 🍻</h1>
    </div>
  );
}

export default withToast5(Page);
