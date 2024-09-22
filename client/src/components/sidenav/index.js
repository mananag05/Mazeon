import { useSelector, useDispatch } from "react-redux";
import { toggle } from "@/redux/slices/sidenav";
import { useState , useEffect } from "react";

const SideNav = ({ Logout }) => {

    const MenuIsActive = useSelector((state) => state.SIDENAV);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
          setIsLoaded(true);
        }, 50); 
      }, [setIsLoaded]);


      const closeBar = () => {
        console.log("bar closed")
        setTimeout(() => {
        dispatch(toggle())
          }, 300); 
      }


  return (
    <>
      <div onClick={() => {setIsLoaded(false);  closeBar()}} className="h-screen w-[100%] bg-opacity z-2 fixed top-0 left-0">
      <div onClick={(event) => {event.stopPropagation();}} 
          className={`${isLoaded ? 'right-0' : '-right-52'} transition-all ease-in-out duration-300 flex top-0 fixed z-10 flex-col lg:hidden w-52 h-screen bg-logtheme border-l-2 border-x-logthemstext font-mono`}>
          <div className={` z-10 w-10 h-10 flex ${isLoaded ? 'ml-5' : 'ml-auto mr-5'} justify-center flex-col items-center cursor-pointer lg:hidden`} 
            onClick={(event) => { setIsLoaded(false); closeBar();}}>
            <div className={`w-6 h-0.5 bg-lighttext rounded-full mt-2  transition-all  duration-500 ${isLoaded ? '-rotate-160' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-lighttext rounded-full mt-2  transition-all  duration-500 ${isLoaded ? 'rotate-160' : ''}`}></div>
          </div>
        <span onClick={() => console.log("friend add")} className="transition-all p-2 text-center bg-body m-3 rounded-md mt-5 hover:cursor-pointer text-logthemstext border-2 border-logthemstext hover:bg-hovers">
          Add Friends
        </span>
        <span
          onClick={Logout}
          className="transition-all p-2 text-center bg-red m-3 rounded-md hover:cursor-pointer hover:bg-bred border-2"
        >
          Logout
        </span>
      </div>
      </div>
    </>
  );
};

export default SideNav;
