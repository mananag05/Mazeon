"use client"

import { SwitchDesc } from "../data/formswitch";
import { useSelector } from "react-redux";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { useState , useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { SwitchButton } from "../switchbutton";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { toggle } from "@/redux/slices/formdata";
import { useRouter } from "next/navigation";
import Smallloader from "../smallloader";


const AuthForm = () => {
  const FormType = useSelector((state) => state.TOGGLE);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loader , SetLoader] = useState(false)


  const [FormData, SetFormData] = useState({
    Username: "",
    Password: "",
    Email: "",
  });

  useEffect(() => {
    // Update FormData whenever FormType changes

    SetFormData({
      Username: "",
      Password: "",
      Email: "",
    });
  }, [FormType]);
  

  const HandleGoogleLogin = () => {
    window.open(`http://localhost:8080/auth/google/callback` ,"_self")
  }

  const HandleFormSubmit = async (event) => {
    SetLoader(true)
    event.preventDefault();
    try {
      if(FormType === 'signin'){
        const response = await fetch(`http://localhost:8080/auth/signup`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(FormData),
        }); 
        
        const json = await response.json();
        if(response.ok){
          dispatch(toggle("signin"))
          toast.success(`${json.msg}`,{
            theme : "dark"
          })

        } else {
          toast.error(`${json.msg}`, {
            theme : "dark"
          })
        }
      } else {
        try {
        
          const response = await fetch("http://localhost:8080/auth/login",{
            method : "POST",
            headers : {
              "content-type": "application/json",
            },
            body: JSON.stringify(FormData),
          })

          const json = await response.json();

          if(response.ok){
            localStorage.setItem("AuthToken" , json.AuthToken);
            router.push("/home")

          } else {
            toast.error(`${json.msg}`)
          }

        } catch (error) {
          
        }

      }
  
    } catch (error) {
      
    }
    
    
    SetFormData({
      Username: "",
      Password: "",
      Email: "",
    });
    SetLoader(false)
    
  };

  return (
    <div className={`lg:bg-logtheme lg:basis-3/5 flex
     flex-col items-center justify-center rounded-r-lg`}>
      <div className="flex justify-center items-center mt-10 mb-5">
        <span className="text-logthemstext text-2xl">
          {FormType === "signin" ? (
            <>{SwitchDesc.signup.message}</>
          ) : (
            <>{SwitchDesc.signin.message}</>
          )}
        </span>
      </div>
      {loader ? (
          <Smallloader />
      ) : (
          <>
            <form onSubmit={(e) => HandleFormSubmit(e)} className="w-80">
        {FormType === "signin" ? (
          <>
            <div className="flex flex-row items-center justify-center mt-6 bg-logtheme rounded-md lg:bg-body">
              <div className="text-3xl text-lighttext cursor-bopointer pr-3 pl-2">
                <MdOutlineEmail className="mt-1 mb-1" />
              </div>
              <div className="text-lighttext mr-2">|</div>
              <div className="flex-auto">
                <input
                  className="outline-none border-none bg-logtheme w-11/12 text-white lg:bg-body"
                  placeholder="Email"
                  type="email"
                  value={FormData.Email}
                  onChange={(e) =>
                    SetFormData({ ...FormData, Email: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-center mt-6 bg-logtheme rounded-md lg:bg-body">
              <div className="text-3xl text-lighttext cursor-bopointer pr-3 pl-2">
                <FaRegUser className="mt-1 mb-1" />
              </div>
              <div className="text-lighttext mr-2">|</div>
              <div className="flex-auto">
                <input
                  className="outline-none border-none bg-logtheme w-11/12 lg:bg-body text-white"
                  placeholder="Username"
                  required
                  value={FormData.Username}
                  onChange={(e) =>
                    SetFormData({ ...FormData, Username: e.target.value })
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row items-center justify-center mt-6 lg:bg-body bg-logtheme rounded-md">
              <div className="text-3xl text-lighttext cursor-bopointer pr-3 pl-2">
                <FaRegUser className="mt-1 mb-1" />
              </div>
              <div className="text-lighttext mr-2">|</div>
              <div className="flex-auto">
                <input
                  className="outline-none border-none lg:bg-body bg-logtheme w-11/12 text-white"
                  placeholder="Email"
                  required
                  value={FormData.Email}
                  onChange={(e) =>
                    SetFormData({ ...FormData, Email: e.target.value })
                  }
                />
              </div>
            </div>
          </>
        )}
        <div className="flex flex-row items-center justify-center mt-6 bg-logtheme lg:bg-body rounded-md">
          <div className="text-3xl text-lighttext cursor-bopointer pr-3 pl-2">
            <MdLockOutline className="mt-1 mb-1" />
          </div>
          <div className="text-lighttext mr-2">|</div>
          <div className="flex-auto">
            <input
              className="outline-none border-none bg-logtheme lg:bg-body w-11/12 text-white"
              placeholder="Password"
              required
              type="password"
              value={FormData.Password}
              onChange={(e) =>
                SetFormData({ ...FormData, Password: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex mt-6">
          <div onClick={HandleGoogleLogin} className="flex ml-1 justify-center items-center w-4/6 bg-white rounded-lg hover:bg-white/90 hover:cursor-pointer">
            <div className="text-2xl ml-2 mr-2">
              <FcGoogle />
            </div>
            <div className="text-1xl">Login with Google</div>
          </div>

          <button className="ml-auto mr-1 border-2 p-1.5 border-lighttext rounded-lg text-logthemstext hover:bg-logtheme ">
            Submit
          </button>
        </div>
        <div className="mt-5 text-white text-base flex  lg:hidden items-center justify-center">
          <span className="mr-4">
          {FormType === "signin" ? (
            <>{SwitchDesc.signup.switchmsg}</>
          ) : (
            <>{SwitchDesc.signin.switchmsg}</>
          )}
          </span>
          <SwitchButton />
        </div>
            </form>
          </>
      )}
      
    </div>
  );
};

export default AuthForm;
