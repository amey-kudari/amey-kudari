"use client";
import { memo, useLayoutEffect, useState } from "react";
// const raf = require('raf');
import raf from "raf";
raf.polyfill();

const ProgressBar = ({ time, resetAt }: { time: number; resetAt: number }) => {
  const [width, setWidth] = useState("100%");

  const [removeTransition, setRemoveTransition] = useState(false);

  const channel = new MessageChannel();

  channel.port1.onmessage = function () {
    console.log("after repaint", { removeTransition, width });
    if (removeTransition) {
      setRemoveTransition(false);
    } else setWidth("0%");
  };

  requestAnimationFrame?.(function () {
    console.log("before repaint", { removeTransition, width });
    channel.port2.postMessage(undefined);
  });

  useLayoutEffect(() => {
    // useEffect(() => {
    setWidth("100%");
    setRemoveTransition(true);
    // setTimeout(() => {
    //   setRemoveTransition(false);
    //   setWidth("0%");
    // }, 100);
  }, [resetAt]);

  return (
    <div style={{ width: "50%", height: "0.2rem", backgroundColor: "#fff" }}>
      <div
        style={{
          backgroundColor: "#000",
          height: "100%",
          width,
          float: "right",
          transition: removeTransition ? "" : `width ${time}s linear`,
        }}
      ></div>
    </div>
  );
};

const ProgressBarMemoized = memo(ProgressBar);

export { ProgressBarMemoized as ProgressBar };
