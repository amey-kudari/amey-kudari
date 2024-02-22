"use client";
import Link from "next/link";
import { EnterRoomForm } from "./components/EnterRoomForm";

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <h1 className="text-5xl mb-2 mx-2">Movie Room!</h1>
      <p className="mx-2 text-center mb-4">
        Designed for people who want to see movies together, and archive and
        remember them!
      </p>

      <EnterRoomForm />

      <Link
        className="text-cyan-500 hover:underline"
        href="/builder/movies/create"
      >
        Dont have a room? Create a new one!
      </Link>
      <Link className="text-cyan-500 hover:underline" href="mainto">
        Forgot room id / password?
      </Link>
    </div>
  );
};

export default Page;
