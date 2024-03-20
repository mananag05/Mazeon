"use client"
import { useState , useEffect } from "react";
import { Server_Base_Url } from "@/utils/constserverurl";

const offline = () => {

    const [UserData, SetUserdata] = useState({});

    const getUser = async () => {
        try {
            console.log(Server_Base_Url)
            const response = await fetch(`http://localhost:8080/login/success`,{
                method : 'GET',
                headers: {
                    "content-type": "application/json",
                  },
                credentials : 'include'
            })

            console.log(response)
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
        getUser()
    },[])

    return (
        <div>
            <h1> I am PLaying offline</h1>
        </div>
    );
}

export default offline;