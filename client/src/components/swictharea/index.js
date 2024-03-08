"use client"


import Image from "next/image";
import logo from '../../../public/mazeon_logo.png'
import { useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import './index.scss'

const SwitchArea = () => {

  const SWITCH_FORM = () => {
    console.log("switched")
  }

  const SwitchDesc = {
    signup : {
      desc : "To keep Connected With Us Please Login With Your Personal Info",
      button : "Sign In"
    },
    signin : ""
  }

  return (
    <div className="hidden lg:bg-logtheme lg:basis-2/5 lg:flex lg:flex-col lg:border-r-2 lg:border-logthemstext rounded-l-lg">
       <div className="hidden lg:flex lg:flex-row lg:basis-1/12 lg:m-3">
          <div className="flex items-center justify-center">
            <Image priority  src={logo} alt='' width={50} height={50}/>
          </div>
          <div className="flex items-center justify-center ml-5">
            <span className="text-2xl font-mono text-logthemstext">
              Mazeon
            </span>
          </div>
        </div>
        <div className="lg:basis-9/12 flex flex-col items-center justify-center">
            <span className="font-mono text-3xl text-logthemstext mb-3">Welcome Back !</span>
            <p className="text-center w-3/5 m-3 text-lighttext/65">
              {SwitchDesc.signup.desc}
            </p>
            <button onClick={() => SWITCH_FORM()} className="text-logthemstext bg-body p-2 m-3 rounded-lg hover:bg-hovers">
              {SwitchDesc.signup.button}
            </button>
        </div>
        <div className="lg:basis-2/12 flex flex-row">
        <span className="text-3xl text-body hover:text-hovers cursor-pointer mt-auto mb-6">
            <FaLinkedin/>     
          </span>
          <span className="text-3xl text-body hover:text-hovers cursor-pointer mt-auto mb-6">
            <BsChevronDoubleDown/>        
          </span>
        </div>
    </div>
  );
};

export default SwitchArea;
