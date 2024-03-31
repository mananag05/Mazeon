"use client";

import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "@/utils/getuser";
import LoaderLayout from "@/components/cssloader";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SetProfile } from "@/redux/slices/UserProfile";
import Image from "next/image";
import SideNav from "@/components/sidenav";


const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Pathname = usePathname();
  const [Loader, SetLoader] = useState(true);
  const UserProfile = useSelector((state) => state.PROFILE);
  const [MenuIsActive, setMenuisActive] = useState(false);

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

  const Logout = () => {
    localStorage.removeItem("AuthToken");
    window.open("http://localhost:8080/logout", "_self");
  };

  return (
    <div>
      {Loader ? (
        <>
          <LoaderLayout />
        </>
      ) : (
        <>
          <div>
              <div className="fornavbar w-[100%] flex flex-row items-center">
                <Image className=" ml-3 mt-3" src="/mazeon_logo.png" priority alt="" width={50} height={50} />
                <p className="text-2xl font-mono text-logthemstext ml-7 mt-3">
                  Mazeon
                </p>
                <div className="hidden lg:block mr-4 ml-auto">
                  <div className="rounded-full m-3">
                    <Image
                      className="rounded-full"
                      src={
                        UserProfile.image === ""
                          ? "https://powerusers.microsoft.com/t5/image/serverpage/image-id/98171iCC9A58CAF1C9B5B9/image-size/large/is-moderation-mode/true?v=v2&px=999"
                          : `${UserProfile.image}`
                      }
                      priority
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                <div className={`ml-auto lg:hidden w-52 ${ MenuIsActive ? 'bg-logtheme fixed right-0 top-0' : ""}`}>
                  <div className={`z-10 w-10 h-10 flex ml-auto mr-5 justify-center flex-col items-center cursor-pointer lg:hidden `} onClick={() => setMenuisActive(!MenuIsActive)}>
                    <div className={`w-6 h-0.5 bg-lighttext rounded-full mt-2 transform transition-all duration-300 ${ MenuIsActive ? "rotate-160" : "rotate-0"}`}></div>
                    <div className={`w-6 h-0.5 bg-lighttext rounded-full mt-2 transform transition-all duration-300 ${ MenuIsActive ? "-rotate-160" : "rotate-0"}`}></div>
                  </div>
                  {MenuIsActive ? (<SideNav />) : (<></>)}
                </div>
              </div>
              <div className="flex flex-col ">
                      <span>
                        Play Offline
                      </span>
                      <span>
                        Play Online
                      </span>
              </div>
          </div>
        </>
      )}
      
    </div>
  );
};

export default Home;


// <button onClick={Logout} className="text-white bg-logthemstext p-2 m-5">
// Logout
// </button>
