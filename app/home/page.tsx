"use client";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import { useRouter } from "next/navigation";
import InHomePage from "../in/page";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const contactRef = useRef<HTMLDivElement>(null);
  // const [page, setPage] = useState("/builder");
  const scrollToBottom = (): void => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [scrollUp, setScrollUp] = useState({
    scrollUp: false,
    page: "",
  });
  const scrollUpProps = useSpring({
    transform: `translateX(${scrollUp.scrollUp ? "-100%" : "0%"})`,
    config: { stiffness: 300, damping: 50, duration: 200 },
    onRest: () => {
      if (scrollUp.scrollUp) {
        router.push(scrollUp.page);
      }
    },
  });

  const onViewExamples = useCallback((page = "/builder") => {
    setScrollUp({
      scrollUp: true,
      page,
    });
  }, []);

  // return <InHomePage />

  return (
    <animated.div style={scrollUpProps}>
      <div className="min-h-screen w-full gap-4 radial-dark flex flex-col items-center justify-center px-5">
        <div>

        <h1 className="text-6xl font-semibold text-red-400 sm:text-7xl hover:text-red-400 mb-2">
          I build websites
        </h1>
        <h1 className="text-6xl font-semibold text-blue-300 sm:text-7xl mb-2">
          You Envision them
        </h1>
        <h1 className="text-6xl font-semibold text-green-300 sm:text-7xl">
          I will build them
        </h1>

        <div className="flex justify-start items-start w-full mt-4 flex-wrap">
          <Link href="https://itest-prep.vercel.app/" target="_blank">
            <button
              className="flex items-center gap-4 py-2 px-4 border border-zinc-400 rounded-md hover:bg-zinc-800 mr-2 mt-1"
              // onClick={() => onViewExamples()}
            >
              iTest-Prep <FaArrowRight />
          </button>
          </Link>
          <button
            className="flex items-center gap-4 py-2 px-4 border border-zinc-400 rounded-md hover:bg-zinc-800 mr-2 mt-1"
            onClick={() => onViewExamples()}
            >
            Projects <FaArrowRight />
          </button>
          <button
            className="flex items-center gap-4 py-2 px-4 border border-zinc-400 rounded-md hover:bg-zinc-800 mt-1"
            onClick={() => onViewExamples("/builder/blog")}
            >
            Blog <FaArrowRight />
          </button>
        </div>
      </div>


        {/* <div className="min-h-screen flex justify-center items-center flex-col gap-2 px-2 py-4">
          <Image
            src="/amey-dp.jpg"
            width={300}
            height={300}
            alt="Amey Kudari Display Picture"
            className="rounded-full opacity-50 hover:opacity-75"
          />
          <div className="mt-8">
            <h1 className="text-6xl font-semibold text-red-400 sm:text-7xl hover:text-red-400">
              Build
            </h1>
            <h1 className="text-6xl font-semibold text-blue-200 sm:text-7xl">
              Enhance
            </h1>
            <h1 className="text-6xl font-semibold text-green-200 sm:text-7xl">
              Automate
            </h1>
          </div>
          <h2>anything!</h2>
        </div>
        <div className="min-h-screen flex justify-center items-center flex-col gap-2 p-4">
          <ul>
            <li className="text-lg">
              <span className="text-3xl font-semibold text-red-400">Build</span> websites, mobile applications, desktop applicaitons.
            </li>
            <li className="text-lg mt-4">
              <span className="text-3xl font-semibold text-blue-200">
                Enhance
              </span>{" "}
              your stock monitoring, or any website you read things from, or
              anything you do on your computer that you feel is repetative. I
              probably can reduce all that to a magic button click! <b>Or</b>,
              have a stock market algorithm you want automated? hit me up!
            </li>
            <li className="text-lg mt-4">
              <span className="text-3xl font-semibold text-green-200">
                Predict
              </span>{" "}
              With or without AI / ML! Have any event or situation that has been
              happening from a while? We can build alerts for it so you dont
              have keep watching!
            </li>
          </ul>
          <div className="flex justify-start items-start w-full mt-4">
            <button
              className="flex items-center gap-4 py-2 px-4 border border-zinc-400 rounded-md hover:bg-zinc-800 mr-2"
              onClick={() => onViewExamples()}
            >
              Projects <FaArrowRight />
            </button>
            <button
              className="flex items-center gap-4 py-2 px-4 border border-zinc-400 rounded-md hover:bg-zinc-800"
              onClick={() => onViewExamples("/builder/blog")}
            >
              Blog <FaArrowRight />
            </button>
          </div>
        </div> */}
      </div>
      <div className="min-h-screen flex justify-center flex-col items-center p-1">
        <h1 className="text-6xl text-slate-100"> Timeline! </h1>
        <button
          className="text-sm mb-2 text-cyan-500 hover:underline"
          onClick={scrollToBottom}
        >
          Headings only, Ping for details!
        </button>
        <table className="mt-8">
          <tbody>
            {/* <tr>
              <td className="border-r-2	border-white pr-4 text-right relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ right: "-0.55rem", top: "3rem" }}
                />
                <h1 className="text-xl text-slate-300">2024 Jan</h1>
                <h1 className="text-lg font-semibold">Started MSCS at ASU</h1>
                <p className="text-slate-100">
                  Masters in Computer Science at <br />
                  Arizona State University
                </p>
              </td>
              <td />
            </tr> */}
            <tr>
              <td className="border-r-2	border-white pr-4 text-right relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ right: "-0.55rem", top: "3rem" }}
                />
                <h1 className="text-xl text-slate-300">2024 Jan - 2024 Dec</h1>
                <h1 className="text-lg font-semibold">MSCS at ASU</h1>
                <p className="text-slate-100">
                  Arizona State University, Tempe AZ - USA
                </p>
              </td>
              <td />
            </tr>

            <tr>
              <td />
              <td className="border-l-2	border-white pl-4 relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ left: "-0.55rem", top: "3rem" }}
                />
                {/* <h1 className="text-xl text-slate-300">2022 Jun - </h1> */}
                <h1 className="text-xl text-slate-300">2022 Jun - 2024 Jan</h1>
                <h1 className="text-lg font-semibold">Sprinklr</h1>
                <p className="text-slate-100">Frontend Software Developer</p>
              </td>
            </tr>
            <tr>
              <td className="border-r-2	border-white pr-4 text-right relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ right: "-0.55rem", top: "3rem" }}
                />
                <h1 className="text-xl text-slate-300">2021 Sept - 2022 May</h1>
                <h1 className="text-lg font-semibold">Bicycle IO</h1>
                <p className="text-slate-100">Software developer</p>
              </td>
              <td />
            </tr>
            <tr>
              <td />
              <td className="border-l-2	border-white pl-4 relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ left: "-0.55rem", top: "3rem" }}
                />
                <h1 className="text-xl text-slate-300">2021 Jun - July</h1>
                <h1 className="text-lg font-semibold">Sprinklr (Internship)</h1>
                <p className="text-slate-100">Frontend Developer Intern</p>
              </td>
            </tr>
            <tr>
              <td className="border-r-2	border-white pr-4 text-right relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ right: "-0.55rem", top: "3rem" }}
                />
                <h1 className="text-xl text-slate-300">2020 Apr - 2021 Apr</h1>
                <h1 className="text-lg font-semibold">
                  IHub - Data Foundation (Internship)
                </h1>
                <p className="text-slate-100">Full Stack Developer Intern</p>
              </td>
              <td />
            </tr>
            <tr>
              <td />
              <td className="border-l-2	border-white pl-4 relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ left: "-0.55rem", top: "3rem" }}
                />
                <h1 className="text-xl text-slate-300">2020</h1>
                <h1 className="text-lg font-semibold"> Competitive Coding </h1>
                <ul className="text-slate-300 list-disc	pl-4">
                  <li className="my-0.5">
                    ACM ICPC Team rank{" "}
                    <a
                      href="https://codedrills.io/contests/icpc-amritapuri-2020-preliminary-round/scoreboard"
                      className="text-cyan-500 hover:underline"
                    >
                      #57
                    </a>
                  </li>
                  <li>
                    Facebook hackercup round 2! <br />
                    <a
                      href="https://www.facebook.com/codingcompetitions/hacker-cup/2021/certificate/660166701375862"
                      className="text-cyan-500 hover:underline"
                    >
                      rank: #1402
                    </a>{" "}
                    (got the t shirt!)
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className="border-r-2	border-white pr-4 text-right relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ right: "-0.55rem", top: "3rem" }}
                />
                <h1 className="text-xl text-slate-300">2019 Dec</h1>
                <h1 className="text-lg font-semibold">Started Freelancing!</h1>
                <p className="text-slate-100">
                  Worked on Webapps, python scripting, <br />
                  ML and ios, andriod, desktop applications
                  <br />
                  <b>
                    Maintained a 5/5 star rating with <br />
                    100% projects delivered on time!{" "}
                  </b>
                  <br />
                  <a
                    href="https://www.truelancer.com/freelancer/ameykudari"
                    className="text-cyan-500 hover:underline"
                  >
                    Reviews and Commends
                  </a>
                </p>
              </td>
              <td />
            </tr>
            <tr>
              <td />
              <td className="border-l-2	border-white pl-4 relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ left: "-0.55rem", top: "3rem" }}
                />
                <h1 className="text-xl text-slate-300">2019 Dec</h1>
                <h1 className="text-lg font-semibold"> Oppia (Open source)</h1>
                <p className="text-slate-100">
                  Contributed to a few open source organizations <br /> but
                  stuck to oppia as I liked the vision! <br />
                  <a
                    href="https://github.com/oppia/oppia/commits?author=amey-kudari"
                    className="text-cyan-500 hover:underline"
                  >
                    contributions
                  </a>
                </p>
              </td>
            </tr>
            <tr>
              <td className="border-r-2	border-white pr-4 text-right relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ right: "-0.55rem", top: "3rem" }}
                />
                <h1 className="text-xl text-slate-300">2018 July - 2022 May</h1>
                <h1 className="text-lg font-semibold">Btech - CSE at IIIT-H</h1>
                <p className="text-slate-300">
                  International Institute of Information Technology - Hyd <br />
                  <a
                    href="https://www.iiit.ac.in/"
                    className="text-cyan-500 hover:underline"
                  >
                    College website
                  </a>
                </p>
              </td>
              <td />
            </tr>
            <tr>
              <td />
              <td className="border-l-2	border-white pl-4 relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ left: "-0.55rem", top: "3rem" }}
                />
                <h1 className="text-xl text-slate-300">2018 Apr</h1>
                <h1 className="text-lg font-semibold">JEE Mains</h1>
                <p className="text-slate-300">
                  Rank : 913 / 1,148,000
                  <br />
                  <a
                    href="http://jeemain.iitjeetoppers.com/2018/CentreResult2018.aspx?C=3&CC=55&T=Bengaluru#"
                    className="text-cyan-500 hover:underline"
                  >
                    commends
                  </a>
                </p>
              </td>
            </tr>
            <tr>
              <td className="border-r-2	border-white pr-4 text-right relative py-6">
                <div
                  className="bg-white w-4 h-4 absolute rotate-45"
                  style={{ right: "-0.55rem", top: "3rem" }}
                />
                <h1 className="text-xl text-slate-300">2017 Nov</h1>
                <h1 className="text-lg font-semibold">KVPY (SX)</h1>
                <p className="text-slate-300">
                  AIR (All India rank) : 193
                  <br />
                  <a
                    href="https://www.scribd.com/document/368264164/Kvpy-Result-2017-Sx-Gn-Obc"
                    className="text-cyan-500 hover:underline"
                  >
                    commends
                  </a>
                </p>
              </td>
              <td />
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className="min-h-screen flex items-center flex-col justify-center"
        ref={contactRef}
      >
        <h1 className="text-7xl mb-1 text-center">Contact me!</h1>
        <p className="text-center">
          <b>Note: </b>Above work experiences have been kept headline only for
          privacy reasons. <br />
          Please ping me for any details of any of them above!
        </p>
        <ul className="mt-8">
          <li className="flex items-center gap-3">
            <a href="https://www.linkedin.com/in/amey-kudari-4400361b2/">
              <Image
                src="/linkedin.png"
                width={30}
                height={30}
                alt="Linked logo"
              />
            </a>
            <a
              className="text-cyan-500 hover:underline"
              href="https://www.linkedin.com/in/amey-kudari-4400361b2/"
            >
              Ping on Linked!
            </a>
          </li>
          <li className="flex items-center gap-3 mt-3">
            <a href="mailto:kudari.amey@gmail.com">
              <Image src="/gmail.png" width={30} height={30} alt="Gmail logo" />
            </a>
            <a
              className="text-cyan-500 hover:underline"
              href="mailto:kudari.amey@gmail.com"
            >
              Send me an email!
            </a>
          </li>
        </ul>
      </div>
    </animated.div>
  );
}
