import { useState, useEffect, useRef } from "react";

export const useSmoothTime = () => {
  const [time, setTime] = useState(new Date());
  const requestRef = useRef<number>(0);

  const animate = () => {
    setTime(new Date());
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return time;
};
