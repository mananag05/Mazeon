"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoaderLayout from "@/components/cssloader";
import { BaseUrl } from "@/components/data/baseurl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toggle } from "@/redux/slices/formdata";

const VERIFY = () => {
  const router = useRouter();
  const [Loader, SetLoader] = useState(true);
  const [verified, SetVerified] = useState(false);
  const dispatch = useDispatch();

  const params = useSearchParams();

  const VerifyUser = async () => {
    const response = await fetch(`${BaseUrl}/auth/verify`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        mail: params.get("mail"),
        token: params.get("token"),
      }),
    });
    if (response.ok) {
      console.log(await response.json());
      SetVerified(true);
    }
    SetLoader(false);
  };

  useEffect(() => {
    VerifyUser();
  }, []);


  const REDIRECT = () => {
        router.push("/")
  }


  return (
    <div className="h-screen flex justify-center items-center">
      {Loader ? (
        <LoaderLayout />
      ) : (
        <>
          {verified ? (
            <div className="h-[97%] w-[98%] flex-col flex bg-logtheme">
              <div className="flex flex-row items-center ">
              <Image
                className="m-10"
                src="/mazeon_logo.png"
                priority
                alt=""
                width={70}
                height={70}
              />
              <span className="text-2xl font-mono text-logthemstext">
                  Mazeon
                </span>
              </div>
              <div className="mt-20 flex items-center justify-center flex-col">
                <h1 className="text-center text-2xl font-mono text-green font-bold mb-8">Account Verified Successfully</h1>
                <button onClick={() => REDIRECT()} className=" bg-logthemstext hover:bg-lighttext text-white font-bold py-2 px-4 rounded">
                  Login
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[97%] w-[98%] flex-col flex bg-logtheme">
               <div className="flex flex-row items-center ">
              <Image
                className="m-10"
                src="/mazeon_logo.png"
                priority
                alt=""
                width={70}
                height={70}
              />
              
                <span className="text-2xl font-mono text-logthemstext">
                  Mazeon
                </span>
              </div>
              <div className="mt-20 flex items-center justify-center flex-col">
              <h1 className="font-mono text-center text-red text-2xl font-bold mb-8">Iternal Server Error</h1>
              <button onClick={() => REDIRECT()} className=" bg-logthemstext hover:bg-lighttext text-white font-bold py-2 px-4 rounded">
                  Go To Home
              </button>
              </div>
              
              </div>
              
          )}
        </>
      )}
    </div>
  );
};

export default VERIFY;
