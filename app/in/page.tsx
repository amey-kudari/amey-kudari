"use client";
import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Landing() {
  const router = useRouter();

  const [springProps, api] = useSpring(() => ({
    opacity: 1,
    y: 0,
  }));

  const bind = useDrag(
    ({ down, offset: [, offsetY], velocity, movement: [_, my] }) => {
      api.start({ y: down && velocity[1] <= 0.6 ? my : 0, immediate: down });
      if (velocity[1] > 1 && !down) {
        api({ y: -window.innerHeight, opacity: 0 });
        setTimeout(() => router.push("/in/home"), 150 * (window.innerHeight + my) / window.innerHeight);
      }
    }
  );

  const handleEnterClick = () => {
    api({ y: -window.innerHeight, opacity: 0 });
    setTimeout(() => router.push("/in/home"), 150);
  };

  return (
    <animated.main
      {...bind()}
      style={springProps}
      className="flex min-h-screen flex-col items-center justify-center w-full select-none touch-none	"
    >
      <div className="flex gap-0.5">
        <div className="p-1 sm:p-1.5 flex flex-col items-end">
          <hr className={`border-white ${styles.customBorder} w-12 sm:w-24`} />
          <hr
            className={`border-white ${styles.customBorder} w-8 sm:w-16 mt-1 sm:mt-2`}
          />
          <hr
            className={`border-white ${styles.customBorder} w-4 sm:w-8 mt-1 sm:mt-2`}
          />
        </div>
        <h1 className="text-1xl sm:text-3xl whitespace-nowrap">AMEY KUDARI</h1>
        <div className="p-1 sm:p-1.5">
          <hr className={`border-white ${styles.customBorder} w-12 sm:w-24`} />
          <hr
            className={`border-white ${styles.customBorder} w-8 sm:w-16 mt-1 sm:mt-2`}
          />
          <hr
            className={`border-white ${styles.customBorder} w-4 sm:w-8 mt-1 sm:mt-2`}
          />
        </div>
      </div>
      <hr className={`w-32 sm:w-64 border-white ${styles.customBorder} mt-0`} />
      <hr
        className={`w-24 sm:w-48 border-white ${styles.customBorder} mt-1 sm:mt-1.5`}
      />

      <button
        id="target-btn"
        className={`text-1xl sm:text-3xl mt-4 ${styles.styledButton} w-64 h-24 mt-48 select-none`}
        onClick={handleEnterClick}
      >
        Swipe!
        <span className={styles.styledButtonSpan} />
      </button>
    </animated.main>
  );
}
