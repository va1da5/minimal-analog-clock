import React from "react";
import type { ClockFaceProps } from "../../types";

const SwissRailwayClock: React.FC<ClockFaceProps> = ({ date }) => {
  const seconds = date.getSeconds() + date.getMilliseconds() / 1000;
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;

  return (
    <div className="relative w-full h-full bg-white rounded-full border-[1.5rem] border-[#dcdcdc] shadow-2xl p-0">
      {/* Tick Marks */}
      {[...Array(60)].map((_, i) => {
        const isHour = i % 5 === 0;
        return (
          isHour && (
            <div
              key={i}
              className={`absolute left-1/2 top-1/2 bg-black w-[3.5%] h-[12%]`}
              style={{
                transform: `translate(-50%, -50%) rotate(${
                  i * 6
                }deg) translateY(345%)`,
              }}
            />
          )
        );
      })}

      {[...Array(60)].map((_, i) => {
        const isHour = i % 5 === 0;
        return isHour ? null : (
          <div
            key={i}
            className={`absolute left-1/2 top-1/2 bg-black w-[1.5%] h-[4%]`}
            style={{
              transform: `translate(-50%, -50%) rotate(${
                i * 6
              }deg) translateY(1135%)`,
            }}
          />
        );
      })}

      {/* Hour Hand */}
      <div
        className="absolute left-1/2 top-1/2 w-[4%] h-[40%] bg-black rounded-sm z-10"
        style={{
          transform: `translate(-50%, -75%) rotate(${hours * 30}deg)`,
          transformOrigin: "50% 75%",
        }}
      />

      {/* Minute Hand */}
      <div
        className="absolute left-1/2 top-1/2 w-[3%] h-[54%] bg-black rounded-sm z-20"
        style={{
          transform: `translate(-50%, -82%) rotate(${minutes * 6}deg)`,
          transformOrigin: "50% 82%",
        }}
      />

      {/* Second Hand (Red with circle) */}
      <div
        className="absolute left-1/2 top-1/2 w-[1.5%] h-[42%] bg-[#d32f2f] z-30"
        style={{
          transform: `translate(-50%, -70%) rotate(${seconds * 6}deg)`,
          transformOrigin: "50% 70%",
        }}
      >
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[600%] aspect-square bg-[#d32f2f] rounded-full" />
      </div>

      {/* Center Cap */}
      <div className="absolute left-1/2 top-1/2 w-[4%] h-[4%] -translate-x-1/2 -translate-y-1/2 bg-[#d32f2f] rounded-full z-40" />
    </div>
  );
};

export default SwissRailwayClock;
