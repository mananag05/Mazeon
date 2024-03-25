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

    return (
        <div>
            {Loader ? (<>
                <LoaderLayout />
            </>) : (<>
                You are on home page
            </>)}
        </div>
    );
}

export default Home;