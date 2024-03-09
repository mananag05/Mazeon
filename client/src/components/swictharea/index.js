"use client";

import Image from "next/image";
import logo from "../../../public/mazeon_logo.png";
import { useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { FaLinkedin, FaGithub } from "react-icons/fa";

import "./index.scss";
import Link from "next/link";



  const SwitchArea = () => {


  const [Authmode, setAuthmode] = useState("signin")
  const SWITCH_FORM = () => {
    if(Authmode === "signin"){
      setAuthmode("signup")
    } else {
      setAuthmode("signin")
    }
  };


  const SwitchDesc = {
    signup: {
      desc: "To keep Connected With Us Please Login With Your Personal Info",
      button: "Sign In",
    },
    signin: {
       desc: "To keep Connected With Us Please Sign In With Your Personal Info",
        button: "Sign up",
    }
  };

  return (
    <div className="hidden lg:bg-logtheme lg:basis-2/5 lg:flex lg:flex-col lg:border-r-2 lg:border-logthemstext rounded-l-lg">
      <div className="hidden lg:flex lg:flex-row lg:basis-1/12 lg:m-3">
        <div className="flex items-center justify-center">
          <Image priority src={logo} alt="" width={50} height={50} />
        </div>
        <div className="flex items-center justify-center ml-5">
          <span className="text-2xl font-mono text-logthemstext">Mazeon</span>
        </div>
      </div>
      <div className="lg:basis-9/12 flex flex-col items-center justify-center">
        <span className="font-mono text-3xl text-logthemstext mb-3">
          Welcome Back !
        </span>
        <p className="text-center w-3/5 m-3 text-lighttext/65">
          {Authmode === "signin" ? (
          <>
                {SwitchDesc.signin.desc}
          </>) : (
            <>
                {SwitchDesc.signup.desc}
            </>
          )}
        </p>
        <button
          onClick={() => SWITCH_FORM()}
          className="text-logthemstext bg-body p-2 m-3 rounded-lg hover:bg-hovers"
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
      </div>
      <div className="lg:basis-2/12 flex flex-row">
        <span className="text-3xl text-body hover:text-hovers cursor-pointer ml-6 mt-auto mb-6">
          <a
            href="https://github.com/mananag05"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span className="text-3xl text-body hover:text-hovers ml-6 cursor-pointer mt-auto mb-6">
        <a
            href="http://linkedin.com/in/mananfullstack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </span>
        <span className="text-3xl text-body hover:text-hovers cursor-pointer mt-auto ml-auto mr-6 mb-6">
          <BsChevronDoubleDown />
        </span>
      </div>
    </div>
  );
};

export default SwitchArea;

