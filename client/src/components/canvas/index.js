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
  const maze = useMemo(() => generateMaze(30,40), []);
  const [playersPos , setPlayersPos] = useState([
    {
      name: "manan",
      user: UserProfile.email,
      position: { x: 0, y: 0 },
    },
    // {
    //   name: "random",
    //   user: "random",
    //   position: { x: 0, y: 0 },
    // },
  ]);

  const createCell = (cell, rowIndex, colIndex) => {
    const [left, bottom, right, top] = cell;
    const borderStyles = {
      borderLeft: left === 0 ? "1px solid black" : "none",
      borderBottom: bottom === 0 ? "1px solid black" : "none",
      borderRight: right === 0 ? "1px solid black" : "none",
      borderTop: top === 0 ? "1px solid black" : "none",
    };

    const playersInCell = playersPos.filter(
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
    const playerIndex = playersPos.findIndex((player) => player.user === userToMove);
    const userCell = maze[playersPos[playerIndex].position.y][playersPos[playerIndex].position.x]
    const playerPos = playersPos[playerIndex].position
    if(key.code == 'KeyW') {
      if(userCell[3] == 1){
        setPlayersPos((prev) => {
          const newPlayersPos = [...prev];
          newPlayersPos[playerIndex].position = { x: playerPos.x - 1, y: playerPos.y };
          return newPlayersPos;
        })
      }
    }
    if(key.code == 'KeyS'){
      if(userCell[1] == 1){
        setPlayersPos((prev) => {
          const newPlayersPos = [...prev];
          newPlayersPos[playerIndex].position = { x: playerPos.x + 1, y: playerPos.y };
          return newPlayersPos;
        })
      }
    }
    if(key.code == 'KeyA'){
      if(userCell[0] == 1){
        setPlayersPos((prev) => {
          const newPlayersPos = [...prev];
          newPlayersPos[playerIndex].position = { x: playerPos.x, y: playerPos.y - 1 };
          return newPlayersPos;
        })
      }
    }
    if(key.code == 'KeyD'){
      if(userCell[2] == 1){
        setPlayersPos((prev) => {
          const newPlayersPos = [...prev];
          newPlayersPos[playerIndex].position = { x: playerPos.x, y: playerPos.y + 1 };
          return newPlayersPos;
        })
      }
    }
  };

  useEffect(() => {
    const onKeyDown = (e) => handlePlayerMove(e, UserProfile.email);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [UserProfile.email]);

  console.log(playersPos[0].position)

  return (
    <div className={twMerge(`flex flex-col items-center mt-10`, className)}>
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
          onClick={() => handlePlayerMove({ code: "KeyW" }, UserProfile.email)}
          className="hover:cursor-pointer"
          color="#ce9c53"
          size={30}
        />
        <div className="flex gap-20">
          <HiArrowSmLeft
            onClick={() => handlePlayerMove({ code: "KeyA" }, UserProfile.email)}
            className="hover:cursor-pointer"
            color="#ce9c53"
            size={30}
          />
          <HiArrowSmRight
            onClick={() => handlePlayerMove({ code: "KeyD" }, UserProfile.email)}
            className="hover:cursor-pointer"
            color="#ce9c53"
            size={30}
          />
        </div>
        <HiArrowSmDown
          onClick={() => handlePlayerMove({ code: "KeyS" }, UserProfile.email)}
          className="hover:cursor-pointer"
          color="#ce9c53"
          size={30}
        />
      </div>
    </div>
  );
};

export default PlayGround;
