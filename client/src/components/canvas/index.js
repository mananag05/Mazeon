import React, { useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { generateMaze } from "../../../functions/mazeGenerator";
import { HiArrowSmUp } from "react-icons/hi";
import { HiArrowSmLeft } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { HiArrowSmDown } from "react-icons/hi";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

const PlayGround = ({ className }) => {
  const UserProfile = useSelector((state) => state.PROFILE);
  const maze = useMemo(() => generateMaze(30, 50), []);
  const [players] = useState([
    {
      name: "manan",
      user: UserProfile.email,
      position: { x: 0, y: 0 },
    },
    {
      name: "random",
      user: "random",
      position: { x: 0, y: 0 },
    },
  ]);

  const createCell = (cell, rowIndex, colIndex) => {
    const [left, bottom, right, top] = cell;
    const borderStyles = {
      borderLeft: left === 0 ? "1px solid black" : "none",
      borderBottom: bottom === 0 ? "1px solid black" : "none",
      borderRight: right === 0 ? "1px solid black" : "none",
      borderTop: top === 0 ? "1px solid black" : "none",
    };

    const playersInCell = players.filter(
      (player) =>
        player.position.x === colIndex && player.position.y === rowIndex
    );

    return (
      <div
        key={uuid()}
        className="relative flex items-center justify-center overflow-hidden lg:h-4 lg:w-4 md:h-3 md:w-3 w-[6px] h-[6px]"
        style={borderStyles}
      >
        {playersInCell.map((player, index) => (
          <div
            key={player.user}
            className={` bg-logthemstext rounded-full w-[60%] h-[60%] absolute`}
            style={{ zIndex: index === 0 ? 1 : 0 }}
          />
        ))}
        {rowIndex === maze.length - 1 && colIndex === maze[0].length - 1 && (
          <img
            src="/cherry.png"
            alt="End Cell"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  };

  const handlePlayerMove = (key, userToMove) => {
    console.log(key.code, userToMove);
  };

  useEffect(() => {
    const onKeyDown = (e) => handlePlayerMove(e, UserProfile.email);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [UserProfile.email]);

  return (
    <div
      className={twMerge(`flex flex-col items-center mt-10`, className)}
    >
      <div className="flex flex-row">
        {maze.map((row, i) => (
          <div key={i} className="flex flex-col">
            {row.map((cell, j) => {
              return createCell(cell, i, j);
            })}
          </div>
        ))}
      </div>
      <div className="md:hidden flex flex-col items-center mt-auto gap-5 mb-20">
        <HiArrowSmUp
          className="hover:cursor-pointer"
          color="#ce9c53"
          size={30}
        />
        <div className="flex gap-20">
          <HiArrowSmLeft
            className="hover:cursor-pointer"
            color="#ce9c53"
            size={30}
          />
          <HiArrowSmRight
            className="hover:cursor-pointer"
            color="#ce9c53"
            size={30}
          />
        </div>
        <HiArrowSmDown
          className="hover:cursor-pointer"
          color="#ce9c53"
          size={30}
        />
      </div>
    </div>
  );
};

export default PlayGround;
