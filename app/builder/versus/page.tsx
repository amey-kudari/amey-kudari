"use client";
import axios from "axios";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    axios
      .get("/api/ticker?stock=TATASTEEL.NS")
      .then((res) => {
        console.log("AMEY", { d: res.data });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center">PAGE</div>
  );
};
export default Page;
