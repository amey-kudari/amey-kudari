"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTimer } from "./hooks/useTimer";
import { ProgressBar } from "./components/ProgressBar";
import { Triangle } from "react-loader-spinner";

function FPSGame() {
  const gameTimeout = useRef<number>();

  const [backgroundLoading, setBGLoading] = useState(true);
  const [green, setGreen] = useState({ isGreen: false, greenAt: 0 });
  const [isLocked, setIsLocked] = useState(false);
  const [reactionTime, setReactionTime] = useState(10000000);
  const [crosshair, setCrosshair] = useState(() => ({
    x: 0,
    y: 0,
  }));

  const [timer, resetTimer] = useTimer(0);
  const [progressResetAt, setProgressResetAt] = useState(Date.now());

  const handleMouseMove = useCallback(
    (e: any) => {
      if (!isLocked) return;

      setCrosshair((previous) => ({
        x: Math.min(
          Math.max(
            previous.x - 100 * (e.movementX / (window?.screen?.width ?? 2000)),
            -100
          ),
          100
        ),
        y: Math.min(
          Math.max(
            previous.y - 100 * (e.movementY / (window?.screen?.height ?? 1100)),
            -100
          ),
          100
        ),
      }));
    },
    [isLocked]
  );

  const handleClick = useCallback(
    (e: any) => {
      if(backgroundLoading) return;
      if (!isLocked) {
        document.body.requestPointerLock();
        // resetTimer(10);
        setGreen({
          isGreen: false,
          greenAt: 0,
        });
        setReactionTime(10000000);

        setProgressResetAt(Date.now());
      } else {
        if (
          crosshair.x * crosshair.x + crosshair.y + crosshair.y <=
            12.5 * 12.5 * 2 &&
          green.isGreen &&
          reactionTime === 10000000
        ) {
          setReactionTime(Date.now() - green.greenAt);
        }
      }
    },
    [crosshair, isLocked, resetTimer, backgroundLoading]
    // [crosshair, isLocked, resetTimer]
  );

  const handlePointerLockChange = useCallback(() => {
    const locked = document.pointerLockElement === document.body;
    setIsLocked(locked);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
    };
  }, [handleMouseMove, handlePointerLockChange]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  useEffect(() => {
    gameTimeout.current = setTimeout(() => {
      setGreen({
        isGreen: true,
        greenAt: Date.now(),
      });
    }, 2000 + Math.random() * 7500) as unknown as number;
    return () => clearTimeout(gameTimeout.current);
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: "#333",
        overflow: "hidden",
        cursor: "none", // Hide the default cursor
      }}
    >
      <div
        className="absolute"
        style={{
          width: "300%",
          height: "300%",
          top: `${-100 + crosshair.y}%`,
          left: `${-100 + crosshair.x}%`,
        }}
      >
        <Image
          src="/dark-4k.jpg"
          alt="background could not load"
          fill
          onLoadingComplete={() => {
            setBGLoading(false);
          }}
        />
      </div>
      {isLocked ? (
        <>
          {reactionTime === 10000000 ? (
            <div
              className="absolute"
              style={{
                zIndex: 1,
                width: "25px",
                height: "25px",
                backgroundColor: green.isGreen ? "green" : "red",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                top: `${50 + crosshair.y}%`,
                left: `${50 + crosshair.x}%`,
              }}
            />
          ) : (
            <h1
              className="absolute"
              style={{
                zIndex: 1,
                width: "100%",
                textAlign: "center",
                top: "50%",
              }}
            >
              Your Reaction Time is: {reactionTime}ms
            </h1>
          )}
        </>
      ) : null}
      {isLocked ? (
        <div
          className="flex flex-col items-center justify-center absolute w-full"
          style={{ zIndex: 1000 }}
        >
          <h1>Tap bubble when green. (turns green before below bar ends)</h1>
          {/* <span>{String(timer)}</span> */}
          <ProgressBar time={11} resetAt={progressResetAt} />
        </div>
      ) : null}
      <div
        className="flex items-center justify-center flex-col"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontSize: "24px",
          zIndex: 1000,
          // pointerEvents: "none", // Prevent crosshair from capturing clicks
        }}
      >
        {isLocked ? (
          <span
            className="flex items-center justify-center absolute"
            style={{ width: "20px", height: "20px", zIndex: 1000 }}
          >
            +
          </span>
        ) : (
          <>
            {backgroundLoading ? (
              <div>
                <Triangle height="80" width="80" color="#eee" />
                <h1>Loading...</h1>
              </div>
            ) : (
              <h1>Click anywhere on the screen to begin</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default FPSGame;
