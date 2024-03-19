"use client"
import { useDispatch , useSelector } from "react-redux";
import { SwitchDesc } from "../data/formswitch";
import { toggle } from "@/redux/slices/formdata";


export const SwitchButton = () => {

    const dispatch = useDispatch();
    const Authmode = useSelector((state) => state.TOGGLE)

    const SWITCH_FORM = () => {
        if(Authmode === "signin"){
          dispatch(toggle("signin"))
        } else {
          dispatch(toggle("signup"))
        }
      };

    return (
        <button
        type="button"
        onClick={() => SWITCH_FORM(Authmode , dispatch , toggle)}
        className=" text-base text-logthemstext lg:text-logthemstext lg:bg-body lg:p-2 lg:m-3 lg:rounded-lg lg:hover:bg-hovers"
      >
          {Authmode === "signin" ? (
        <>
              {SwitchDesc.signin.button}
        </>) : (
          <>
              {SwitchDesc.signup.button}
          </>
        )}
      </button>
    );
}