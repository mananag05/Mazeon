"use client";

import { getUser } from "@/utils/getuser";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { SetProfile } from "@/redux/slices/UserProfile";
import LoaderLayout from "@/components/cssloader";
import MainTopNav from "@/components/MainTopNav";
import PlayGround from "@/components/canvas";
import Footer from "@/components/footer";

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

  return (
    <div className="">
      {Loader ? (
        <LoaderLayout />
      ) : (
        <div className="h-[100vh] w-full flex flex-col">
          <MainTopNav hideAccount={true} />
          <PlayGround className='flex-1' />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default offline;
