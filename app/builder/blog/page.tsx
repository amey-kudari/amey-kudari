"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <h1>Currently, there is only 1 blog. This page will soon be updated.</h1>
      <Link
        href="/builder/blog/animation-reset"
        className="underline text-blue-500"
      >
        1. Reset Animations in react
      </Link>
    </div>
  );
}
