"use client"
import { useCallback, useEffect, useRef, useState } from "react"

export const useTimer = (init : number) : [number, (a:number | undefined) => void] => {
  const timerRef = useRef<number>();
  const [timer, setTimer] = useState(init);
  
  const resetTimer = useCallback((customInit : number | undefined = undefined) => {
    console.log("RESET TIMER CALLED");
    setTimer(customInit ?? init);
  }, [init]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setTimer(prev => Math.max(prev - 1, 0));
    }, 1000) as unknown as number;

    return () => {
      clearTimeout(timerRef.current);
    }
  }, [timer]);

  return [timer, resetTimer];
}