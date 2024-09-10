"use client";

import Link from "next/link";
import Image from "next/image";
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

const newPB = `// Copy paste in browser console! :)
const typeAnswer = () => {
  const qText = document.querySelector(
    "[style*='padding-top: 90px']"
  ).textContent;

  const sanitizedQText = qText
    .replaceAll('×','*')
    .replaceAll('÷', '/');
  const res = eval(sanitizedQText);
  document.querySelector('input').value = res + " ";
}
id = setInterval(typeAnswer, 100)
setTimeout(() => clearInterval(id), 1000 * 60 * 5);`;

export default function Page() {
  const [resetAt, setResetAt] = useState(Date.now());

  return (
    <div className="flex flex-col justify-center items-center min-h-full py-4">
      <h1 className="text-4xl text-center">Can you actually hack with HTML?</h1>
      <div className="w-full p-4 sm:w-1/2 mt-2 text-xl font-light bg-slate-900 rounded-md">
        <small className="text-red-400 leading-3">
          NOTE: This article is for purely educational purposes. Check the
          legality of whatever you are trying to do. My intention with this
          article is to contribute to the webdev community and help make the web
          safer, better and more fun!
        </small>
        <p className="indent-5">
          Hack NASA with HTML memes is a thing of 2020, but can you actually
          hack with HTML? Depends on how you define hack. The most popular
          definition I found was{" "}
          <strong className="text-red-500">gaining unauthorized access</strong>.
          Unauthorized however has a vague meaning,
        </p>
        <p className="mt-4">
          Do I have unrestricted access to my files on my computer? Yes. <br />
          Do I have access to something a website has given me? Depends. I can
          not download a movie from a paid subscription due to copyright issues,
          I can not use the console with some banking websites due to rules.
          But! most cool websites do not have rules! That is what makes hacking
          legal here!
        </p>
        <p className="mt-4 indent-5">
          So what do I mean by hacking with HTML? The webpage you get is HTML!
          (Maybe + javascript, but sourced from the HTML page, and hack with
          HTML rhymes a lot better :P). Legally, we can hack a webpage (gain
          access that is legal, but the website owner did not anticipate).
        </p>
        <p className="mt-4">
          What do I mean? Let us say you have a website which allows users to
          play a game. For eg, my {"friend's"} website,{" "}
          <Link
            target="_blank"
            href="https://www.matiks.in/"
            className="underline text-blue-500"
          >
            matiks.in
          </Link>
          {". "}
          Here, the daily challenge requires you to solve 20 math questions and
          your score depends on the time you took. For every question, you need
          to enter the answer on their input box. It is your computer, HTML, and
          input, and they evaluate what you send. Now you can either type out
          the answer, or you can compute it! to get the below progress bar:
        </p>
        <div className="flex items-center justify-center">
          <figure>
            <Image
              src="/matix.png"
              width={400}
              height={400}
              alt="Matiks website math challenge"
              className=""
            />
            <figcaption className="text-center font-normal text-sm">
              Matiks website math challenge.
            </figcaption>
          </figure>
        </div>
      </div>

      <h1 className="text-4xl text-center mt-10">
        So how do we hack with HTML?
      </h1>
      <div className="w-full p-4 sm:w-1/2 mt-2 text-xl font-light bg-slate-900 rounded-md">
        <p>
          Lets focus on the website, matiks for now. How do we hack this? Ill
          give you a step by step procedure on how to do it. Every other website
          with similar issue will also be similar to hack!
        </p>
        <ol className="list-decimal	ml-7 mt-2 mb-2">
          <li className="mb-2">
            Open the console, type{" "}
            <code className="text-slate-500">{'"debugger;"'}</code>, and press
            enter. (refer:{" "}
            <Link
              target="_blank"
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger"
              className="underline text-blue-500"
            >
              MDN - debugger
            </Link>
            ). This pauses any timer on the frontend (frontend only).
          </li>
          <li className="mb-2">
            In our case, we need to find the div with the math question, how do
            we do that? we inspect the div using browser inspector, and try to
            find some indentifier unique tag. In our case,{" "}
            <code className="text-slate-500">
              {'style="padding-top: 90px"'}
            </code>
            . <br />
            <figure>
              {/* <div className="w-full"> */}
              <Image
                src="/matix-qblock.png"
                alt="Matiks website math challenge"
                className=""
                width={1000}
                height={1000}
                style={{ width: "100%", height: "auto" }} // optional
              />
              {/* </div> */}
              <figcaption className="text-center font-normal text-sm">
                Matiks website math challenge.
              </figcaption>
            </figure>
          </li>
          <li className="mb-2">
            Get the text element within this tag and write a script to solve it.
            In our case, we use <code className="text-slate-500">eval</code>{" "}
            function because we know for sure it is just a math question.
          </li>
          <li className="mb-2">
            After 100 ms, width gets reset, and then we set the removeTransition
            to false, enabling animations and width to 0%.
          </li>
          <li className="mb-2">
            Repeat step 2 for the input box and set its value to your answer.{" "}
            <code className="text-slate-500">
              {'document.querySelector("input").value = res + " "'}
            </code>
            . Notice the space added along with res, this is so that I can
            manually decide when I want to click on backspace. It helps me
            ensure it doesnt look machine like.
            <CodeBlock
              showLineNumbers={true}
              text={newPB}
              theme={anOldHope}
              language="typescript"
              customStyle={{
                overflowX: "scroll",
              }}
            />
          </li>
        </ol>
        <p className="mt-2">
          What happens next? you get on top of the leaderboard!
        </p>
        <figure className="w-full flex flex-col justify-center mt-1 items-center">
          <Image
            src="/matiks_leaderboard.jpg"
            alt="Leaderboard"
            width={1000}
            height={1000}
            style={{ width: "50%", height: "auto" }}
          />
          <figcaption className="text-center font-normal text-sm">
            Matiks leaderboard
          </figcaption>
        </figure>
      </div>

      <h1 className="text-4xl text-center mt-10">What is my objective?</h1>
      <div className="w-full p-4 sm:w-1/2 mt-2 text-xl font-light bg-slate-900 rounded-md">
        <p className="indent-5">
          We started the article talking about hacking with HTML, but was this
          hacking? Not exactly, because there is 0 unauthorized access. But,
          this is a grey area because the website developers did not expect me
          to gain this level of access.
        </p>
        <p className="mt-2">
          My <strong className="text-red-500">goal</strong> is not to break the
          website, it is to figure out how to{" "}
          <strong className="text-red-500">
            ensure that the website can not be broken
          </strong>
          . So how do we do that? There are 2 solutions,
        </p>
        <ol className="list-decimal	ml-7 mt-2 mb-2">
          <li className="mb-2">
            Play the{" "}
            <strong className="text-red-500">cat and mouse game</strong>. Make
            it harder to select the question block, or make a custom input
            element that only accepts keypress etc. I can further hack it by
            figuring out how to modify that input element because it is HTML on
            my laptop, it is my turf!
          </li>
          <li className="mb-2">
            Do what krunker.io or typeracer did, and{" "}
            <strong className="text-red-500">actively detect</strong> cheating.
          </li>
        </ol>
        <p>
          Are either of these correct? No. But doing step 1 correctly can make
          step 2 a lot easier! So when you are making a website, you most
          probably will check for actual security threats but also check for
          HTML hackers!
        </p>
        <p className="mt-4">
          <strong className="text-red-500">PS:</strong> Do check out the
          website! I used to love {'"King of Math"'} on android, but it got
          discontinued. This website in my opinion is even better! Beautiful UI
          and fun contests.
        </p>
      </div>
      <h1 className="text-4xl text-center mt-10 mb-5">Cheers! 🍻</h1>
    </div>
  );
}
