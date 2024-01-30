import { useState } from "react";

export const CountrySelect = ({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (a: string) => void;
}) => {
  return (
    <div>
      <button
        className={`px-4 py-2 mb-2 mr-2 border border-slate-500 hover:bg-zinc-800 ${
          value === "USA" ? "bg-zinc-700" : ""
        }`}
        onClick={() => onSelect("USA")}
      >
        USA
      </button>
      <button
        className={`px-4 py-2 mb-2 mr-2 border border-slate-500 hover:bg-zinc-800 ${
          value === "INDIA" ? "bg-zinc-700" : ""
        }`}
        onClick={() => onSelect("INDIA")}
      >
        INDIA
      </button>
    </div>
  );
};
