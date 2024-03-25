"use client"

import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "@/utils/getuser";
import LoaderLayout from "@/components/cssloader";
import { usePathname , useRouter } from "next/navigation";

const Home = () => {
    const router = useRouter();
    const Pathname = usePathname()
    const [Loader, SetLoader] = useState(true)

    useEffect(() => {
        const init = async () => {
          const redirectTo = await getUser(Pathname);
          router.push(`${redirectTo}`);
          if (redirectTo == Pathname){
            SetLoader(false);
          }
        };
        init();
      }, []);

      const Logout = () => {
            localStorage.removeItem("AuthToken")
            window.open("http://localhost:8080/logout" , "_self")
      }

    return (
        <div>
            {Loader ? (<>
                <LoaderLayout />
            </>) : (<>
            <div>
            You are on home page
            </div>
                
                <button onClick={Logout} className="text-white bg-logthemstext p-2 m-5">
                    Logout
                </button>
            </>)}
        </div>
    );
}

export default Home;