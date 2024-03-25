"use client";

import { getUser } from "@/utils/getuser";
import { useEffect, useState } from "react";

const offline = () => {
  const [Loader, SetLoader] = useState(true);

  useEffect(() => {
    getUser(SetLoader);
  }, []);

  return <div>
    {Loader ? (<>Loading...</> ): (<>You Are On Offline Page</>)}</div>;
};

export default offline;
