"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoaderLayout from "@/components/cssloader";
import { BaseUrl } from "@/components/data/baseurl";
import { useRouter } from "next/navigation";
import Image from "next/image";

const VERIFY = () => {
  const router = useRouter();
  const [Loader, SetLoader] = useState(true);
  const [verified, SetVerified] = useState(false);

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
      SetLoader(false);
    }
  };

  useEffect(() => {
    VerifyUser();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      {Loader ? (
        <LoaderLayout />
      ) : (
        <>
          {verified ? (
            <div className="h-screen w-[97%] flex-col flex justify-center items-center bg-logtheme">
              
                <h1 className="text-3xl font-bold mb-8">Account Verified</h1>
                <button className=" bg-logthemstext text-white font-bold py-2 px-4 rounded">
                  Click Me
                </button>
           
            </div>
          ) : (
            <div className="min-h-screen flex flex-col justify-center items-center">
              <h1 className="text-3xl font-bold mb-8">Some Error Occured</h1>
              <button className="bg-logthemstext font-bold py-2 px-4 rounded">
                Click Me
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VERIFY;
