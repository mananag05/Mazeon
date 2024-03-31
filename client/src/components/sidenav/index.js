

const SideNav = () => {
    return (
        <div className="flex fixed z-10 flex-col right-0 lg:hidden w-52 h-screen bg-logtheme">
            <span  className="p-2 text-center bg-red m-3 rounded-md hover:cursor-pointer font-mono mt-5">
                Logout
            </span>
            <span className="p-2 text-center bg-body m-3 rounded-md">
                Add Friend
            </span>
        </div>
    )
}

export default SideNav