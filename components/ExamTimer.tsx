"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
  onFinish: () => void;
}

export default function ExamTimer({
  duration,
  onFinish,
}: TimerProps) {

  const [seconds, setSeconds] =
    useState(duration);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setSeconds((prev) => {

          if (prev <= 1) {

            clearInterval(interval);

            onFinish();

            return 0;
          }

          return prev - 1;

        });

      }, 1000);

    return () =>
      clearInterval(interval);

  }, [onFinish]);

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;

  return (

    <div className="bg-red-100 border border-red-300 rounded-lg px-4 py-2">

      <div className="text-red-700 font-bold text-xl">

        {minutes}:
        {remainingSeconds
          .toString()
          .padStart(2, "0")}

      </div>

    </div>

  );
}