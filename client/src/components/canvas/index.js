import React, { useState } from "react";

const PlayGround = () => {
  const [rowGrid, setrowGrid] = useState(12);
  const [rowCols , setRowCols] = useState(15);
  const [girdMappin , setrowGridMappin] = useState([
    
  ])
  



  return (
    <div className="flex flex-col items-center mt-10">
      {Array.from({ length: rowGrid }, (_, index) => (
        <div
          key={index}
          className={`flex flex-row bg-logthemstext`}
          style={{ width: `${rowCols}rem`, height: '1rem' }}
        >
          {Array.from({ length : rowCols} , (_,index) => (
                <div className="bg-red" style={{ width : `1rem` , hight: '1rem'}}>

                </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayGround;
