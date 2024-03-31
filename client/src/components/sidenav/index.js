

const SideNav = () => {
    return (
        <div className="flex fixed z-10 flex-col right-0 lg:hidden w-52 h-screen bg-logtheme border-l-2 border-x-logthemstext">
            <span className="p-2 text-center bg-body m-3 rounded-md mt-5 hover:cursor-pointer text-logthemstext">
                Add Friend
            </span>
            <span  className="p-2 text-center bg-red m-3 rounded-md hover:cursor-pointer font-mono ">
                Logout
            </span>
        </div>
    )
}

export default SideNav