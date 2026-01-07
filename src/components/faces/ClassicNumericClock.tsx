import React from "react";
import type { ClockFaceProps } from "../../types";

const ClassicNumericClock: React.FC<ClockFaceProps> = ({ date }) => {
  const seconds = date.getSeconds() + date.getMilliseconds() / 1000;
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;

  return (
    <div className="relative w-full h-full bg-[#fcfcfc] dark:bg-zinc-900 rounded-full border-4 border-gray-800 dark:border-grey-600 shadow-inner p-0">
      {/* Tick Marks */}
      {[...Array(60)].map((_, i) => {
        const isHour = i % 5 === 0;
        return (
          <div
            key={i}
            className={`absolute left-1/2 top-1/2 bg-black dark:bg-gray-200 ${
              isHour ? "w-[2%] h-[3%]" : "w-[0.5%] h-[3%]"
            }`}
            style={{
              transform: `translate(-50%, -50%) rotate(${
                i * 6
              }deg) translateY(1550%)`,
            }}
          />
        );
      })}

      {/* Numbers 1-12 */}
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 text-[6.7cqw] font-bold text-gray-800 dark:text-gray-300"
          style={{
            transform: `translate(-50%, -50%) rotate(${
              (i + 1) * 30
            }deg) translateY(-390%) rotate(-${(i + 1) * 30}deg)`,
          }}
        >
          {i + 1}
        </span>
      ))}

      {/* Hour Hand */}
      <div
        className="absolute left-1/2 top-1/2 w-[2.5%] h-[28%] bg-gray-900 dark:bg-gray-400 rounded-t-lg z-10"
        style={{
          transform: `translate(-50%, -85%) rotate(${hours * 30}deg) `,
          transformOrigin: "50% 85%",
        }}
      />

      {/* Minute Hand */}
      <div
        className="absolute left-1/2 top-1/2 w-[1.5%] h-[40%] bg-gray-800 dark:bg-gray-500 rounded-t-lg z-20"
        style={{
          transform: `translate(-50%, -85%) rotate(${minutes * 6}deg)`,
          transformOrigin: "50% 85%",
        }}
      />

      {/* Second Hand */}
      <div
        className="absolute left-1/2 top-1/2 w-[3px] h-[45%] bg-orange-600 z-30"
        style={{
          transform: `translate(-50%, -85%) rotate(${seconds * 6}deg)`,
          transformOrigin: "50% 85%",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 w-[3%] h-[3%] bg-orange-600 rounded-full z-40 border-2 border-white origin-center"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
};

export default ClassicNumericClock;
