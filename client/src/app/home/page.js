"use client"

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useState } from "react";

const Home = () => {

    const [Loader, SetLoader] = useState(true)


    const getUser =  () => {
        const AuthToken = localStorage.getItem("AuthToken")
      
        if(!AuthToken){
            redirect('/')
        }
        // try {
        //     const response = await fetch(`http://localhost:8080/auth/login/success`,{
        //         method : 'GET',
        //         headers: {
        //             "content-type": "application/json",
        //           },
        //         credentials : 'include'
        //     })
        //     if(response.ok){
        //         const json = await response.json()
        //         localStorage.setItem("AuthToken" , json.AuthToken)
        //         console.log(json)
        //     }
        // } catch (error) {
            
        // }
        SetLoader(false)
    }
    
    useEffect(() => {
        getUser()
    },[])

    return (
        <div>
            {Loader ? (<>
                Loading...
            </>) : (<>
                You are on home page
            </>)}
        </div>
    );
}

export default Home;