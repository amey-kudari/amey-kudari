"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <h1 className="text-4xl mb-4">Blogs</h1>
      <p>This page will be revamped when there are more blogs, but atm </p>
      <div className="mt-4 text-xl flex flex-col items-center gap-2">
      <Link
        href="/builder/blog/animation-reset"
        className="underline text-blue-500"
      >
        1. Reset Animations in react
      </Link>
      <Link
        href="/builder/blog/animation-reset"
        className="underline text-blue-500"
      >
        2. Issue with Primitive Variables in Javascript, if you learnt C first.
      </Link>
      </div>
      {/* <Link
        href="/builder/blog/"
        className="underline text-blue-500"
      >
        3. Javascript tutorials, P1
      </Link> */}
    </div>
  );
}
