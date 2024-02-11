"use client";
import { useState } from "react";
import { CreateRoom } from "./CreateRoom";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <h1 className="text-5xl mb-2 mx-2">Binge</h1>
      <p className="mx-2 text-center mb-4">
        Watch, Remember, Archive!
      </p>
      <CreateRoom />
      <Link
        className="text-cyan-500 hover:underline"
        href="/builder/movies"
      >
        Join an existing room
      </Link>
    </div>
  );
};

export default Page;
