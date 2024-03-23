"use client"

import { useEffect , useState} from "react";

const Home = () => {

    const [UserData, SetUserdata] = useState({});

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/login/success`,{
                method : 'GET',
                headers: {
                    "content-type": "application/json",
                  },
                credentials : 'include'
            })

            const json = await response.json()
            console.log(json)
        } catch (error) {
            
        }
    }
    
    useEffect(() => {
        getUser()
    },[])

    return (
        <div>
            You are on home page
        </div>
    );
}

export default Home;