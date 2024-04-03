"use client"

import React from "react";
import { Stage, Layer, Rect } from "react-konva";

const PlayGround = () => {
  return (
    <div>
      <Stage width={500} height={200}>
        <Layer>
          <Rect x={20} y={20} width={50} height={50} fill="red" draggable />
        </Layer>
      </Stage>
    </div>
  );
};

export default PlayGround;
