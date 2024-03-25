import { redirect } from "next/navigation";


export const getUser =  (SetLoader) => {
    const AuthToken = localStorage.getItem("AuthToken");

    if(AuthToken){

    }
    if(!AuthToken){
            let success = 1;
            const init = async () => {
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
                    return
                } 
                success = 0;
            }
            init();
            
            if(success == 1){
                redirect('/')
            }
     
    }
   
    SetLoader(false)
}