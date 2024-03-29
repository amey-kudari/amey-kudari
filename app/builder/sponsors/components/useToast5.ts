"use client"
import { useContext } from "react"
import { ToastContext } from "./withToast5"

export default function useToast5(){
  const { addToast, deleteToast } = useContext(ToastContext);
  return { addToast, deleteToast };
}