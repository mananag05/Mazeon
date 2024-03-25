"use client"

import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "@/utils/getuser";
import LoaderLayout from "@/components/cssloader";

const Home = () => {

    const [Loader, SetLoader] = useState(true)


    useEffect(() => {
        getUser(SetLoader)
    },[])

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