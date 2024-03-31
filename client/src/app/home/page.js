"use client";

import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "@/utils/getuser";
import LoaderLayout from "@/components/cssloader";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SetProfile } from "@/redux/slices/UserProfile";
import Image from "next/image";
import { VscThreeBars } from "react-icons/vsc";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const Pathname = usePathname();
  const [Loader, SetLoader] = useState(true);
  const UserProfile = useSelector((state) => state.PROFILE);

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
            <div className="flex flex-row items-center mt-3">
              <div className="ml-5">
                <Image
                  src="/mazeon_logo.png"
                  priority
                  alt=""
                  width={50}
                  height={50}
                />
              </div>

              <p className="text-2xl font-mono text-logthemstext ml-3 lg:ml-7">
                Mazeon
              </p>

              <VscThreeBars className="text-3xl text-logthemstext lg:hidden ml-auto mr-3 " />
              <div className="hidden lg:block mr-4 ml-auto">
                <div className="rounded-full">
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;


