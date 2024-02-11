"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [room, setRoom] = useState({user1: '', user2: ''});
  useEffect(() => {
    setRoom(JSON.parse(localStorage.getItem("room") ?? "{}"));
  }, []);

  return (
    <h1>
      Room of {room.user1} and {room.user2}! App is still under development, do
      come back later!
    </h1>
  );
};

export default Page;
