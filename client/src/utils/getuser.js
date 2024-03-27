"use client"

export const getUser = async ( Pathname) => {
    let data = {
        path : '/',
        user : {}
    }
    const AuthToken = localStorage.getItem("AuthToken");
    if(AuthToken){

            const response = await fetch ('http://localhost:8080/auth/user' , {
                method : 'POST',
                headers : {
                    "content-type": "application/json",
                    authorization: AuthToken,
                }
            })

            if(response.ok){
                if(Pathname == '/'){
                    data.path = '/home'
                } else {
                    data.path = `${Pathname}`
                }
                    data.user = await response.json();
            } else {
                localStorage.removeItem("AuthToken")
            }
        
         
    }
    else {
                const response = await fetch(`http://localhost:8080/auth/login/success`,{
                    method : 'GET',
                    headers: {
                        "content-type": "application/json",
                      },
                    credentials : 'include'
                })
                const json = await response.json()
                if(response.ok){
                    localStorage.setItem("AuthToken" , json.AuthToken)
                    data.path = '/home'
                }
    }
    return data
}