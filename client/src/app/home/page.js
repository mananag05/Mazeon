"use client";

import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "@/utils/getuser";
import LoaderLayout from "@/components/cssloader";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SetProfile } from "@/redux/slices/UserProfile";
import MainTopNav from "@/components/MainTopNav";


const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Pathname = usePathname();
  const [Loader, SetLoader] = useState(true);
  

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



  const HandleSolo = () => {
    router.push('/offline')
  }

  const HandleOnline = () => {

  }

  return (
    <div className="select-none">
      {Loader ? (
      
          <LoaderLayout/>
       
      ) : (
    
          <div>
              <MainTopNav />
              <div className={`flex flex-col text-lg text-lighttext font-mono items-center justify-center h-40`}>
                      <span onClick={HandleSolo} className="bg-hovers hover:bg-logtheme w-32 text-center rounded-md hover:cursor-pointer mt-56">
                        Play Solo
                      </span>
                      <span onClick={HandleOnline} className="bg-hovers hover:bg-logtheme w-32 text-center rounded-md hover:cursor-pointer mt-10">
                        Play Online
                      </span>
              </div>
          </div>
       
      )}
      
    </div>
  );
};

export default Home;


