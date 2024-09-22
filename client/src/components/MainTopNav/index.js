import SideNav from "../sidenav";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { toggle } from "@/redux/slices/sidenav";

const MainTopNav = ({ hideAccount }) => {
  const dispatch = useDispatch();
  const UserProfile = useSelector((state) => state.PROFILE);
  const MenuIsActive = useSelector((state) => state.SIDENAV);

  const Logout = () => {
    localStorage.removeItem("AuthToken");
    window.open("http://localhost:8080/logout", "_self");
  };

  return (
    <div className="fornavbar w-[100%] flex flex-row items-center">
      <Image
        className={`ml-3 mt-3`}
        src="/mazeon_logo.png"
        priority
        alt=""
        width={50}
        height={50}
      />
      <p className={`text-2xl font-mono text-logthemstext ml-7 mt-3`}>Mazeon</p>
      <div className={`hidden lg:block mr-4 ml-auto`}>
        <div className="rounded-full m-3 flex items-center gap-10 text-logthemstext font-semibold font-mono ">
          {!hideAccount && (
            <>
              <div className="hover:cursor-pointer">Add friends +</div>
              <Image
                className="rounded-full hover:cursor-pointer"
                src={
                  UserProfile.image === undefined || UserProfile.image === ""
                    ? "/blank-user.jpg"
                    : UserProfile.image
                }
                priority
                alt=""
                width={40}
                height={40}
              />
            </>
          )}
        </div>
      </div>
      {!hideAccount && (
        <div className={`ml-auto lg:hidden`}>
          <div
            className={` z-10 w-10 h-10 flex mr-5 justify-center flex-col items-center cursor-pointer lg:hidden `}
            onClick={() => dispatch(toggle())}
          >
            <div
              className={`w-6 h-0.5 bg-lighttext rounded-full mt-2 transform transition-all duration-300 `}
            ></div>
            <div
              className={`w-6 h-0.5 bg-lighttext rounded-full mt-2 transform transition-all duration-300 `}
            ></div>
          </div>
          {MenuIsActive ? <SideNav Logout={Logout} /> : <></>}
        </div>
      )}
    </div>
  );
};

export default MainTopNav;
