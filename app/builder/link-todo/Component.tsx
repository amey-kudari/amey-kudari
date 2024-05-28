"use client";
import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";

export const Component = () => {
  const [jsonData, setJsonData] = useState("[]");
  const ltodo = window.localStorage.getItem("ltodo");
  const [todo, setTodo] = useState<string[]>(() => (ltodo ? JSON.parse(ltodo) : []));
  const onLoad = useCallback(() => {
    try {
      setTodo(JSON.parse(jsonData));
      window.localStorage.setItem("ltodo", jsonData);
    } catch (error) {
      console.log("ERROR ", error);
    }
  }, [jsonData]);

  return (
    <div className="flex items-center justify-center flex-col pt-2 mx-2">
      <h1>TODO LIST</h1>
      <textarea
        className="text-black w-1/2"
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
      />
      <button
        className="mt-2 flex items-center gap-4 py-2 px-4 border border-zinc-400 rounded-md hover:bg-zinc-800"
        onClick={onLoad}
      >
        Load!{" "}
      </button>
      {todo.length > 0 ? (
        <h1 className="my-2">{todo.length} more to go!</h1>
      ) : null}
      <ul>
        {todo.map((todoi) => (
          <li
            key={todoi}
            className="py-2 w-full bg-slate-500 hover:bg-slate-700 mt-2 cursor-pointer rounded-md relative flex items-center px-1.5"
          >
            <Link target="_blank" href={todoi} className="flex-1 pl-6">
              {todoi}
            </Link>
            <button
              className="px-4 py-1.5 rounded-md bg-slate-700 hover:bg-slate-800"
              onClick={(e) => {
                e.preventDefault();
                setTodo((prevTodo : string[]) => {
                  const newTodo = prevTodo.filter(
                    (prevtodoi) => prevtodoi !== todoi
                  );
                  window.localStorage.setItem("ltodo", JSON.stringify(newTodo));
                  return newTodo;
                });
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// export const ComponenetWithoutToast);
