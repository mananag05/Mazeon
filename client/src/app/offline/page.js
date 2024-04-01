"use client";

import { getUser } from "@/utils/getuser";
import { useEffect, useState } from "react";
import { usePathname ,useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { SetProfile } from "@/redux/slices/UserProfile";
import LoaderLayout from "@/components/cssloader";
import MainTopNav from "@/components/MainTopNav";

const offline = () => {
  const [Loader, SetLoader] = useState(true);
  const Pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    const init = async () => {
      const data = await getUser(Pathname);
      dispatch(SetProfile(data.user));
      router.push(`${data.path}`);
      if (data.path == Pathname) {
        SetLoader(false);
      }
    };
    init();
  }, []);

  return <div>
    {Loader ? (<LoaderLayout />):(
    <MainTopNav />
    
    )}</div>;
};

export default offline;
