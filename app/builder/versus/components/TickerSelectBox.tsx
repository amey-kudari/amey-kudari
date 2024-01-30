"use client";
import Select from "react-select";
import { USA } from "../constants/usa";
import { INDIA } from "../constants/india";
import { useEffect } from "react";
// import "./page-ticker.css";

export const TickerSelectBox = ({
  value,
  country,
  onSelect,
}: {
  value: string;
  country: string;
  onSelect: (a: any) => void;
}) => {
  const customStyles = {
    option: (
      base: any,
      { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }
    ) => ({
      ...base,
      color: "white",
      backgroundColor: isFocused || isSelected ? "#222" : "black",
      // padding: 5,
      cursor: "pointer",
    }),
    control: (provided: any, { isFocused }: { isFocused: boolean }) => ({
      ...provided,
      backgroundColor: "#222",
      color: "white",
      border: "1px solid gray",
      borderColor: isFocused ? "darkblue" : undefined,
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#222",
    }),
    menuList: (provided: any) => ({
      ...provided,
      backgroundColor: "black",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    singleValue: (provided: any) => ({ ...provided, color: "white" }),
  };

  useEffect(() => {
    onSelect("");
  }, [country, onSelect]);
  return (
    <Select
      placeholder={
        country === "USA" ? "Choose a US Ticker" : "Choose an Indian Ticker"
      }
      className="w-64 bg-black"
      value={{ value }}
      onChange={(a) => onSelect(a?.value ?? "")}
      getOptionLabel={(a: { value: string }) => a.value}
      getOptionValue={(a: { value: string }) => a.value}
      options={country === "USA" ? USA : INDIA}
      styles={customStyles}
    />
  );
};
