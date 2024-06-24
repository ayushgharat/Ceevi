const NoUserComponent = ({loginUser}) => {
    return ( <div className="h-[400px] w-[300px] rounded-3xl p-8 bg-white flex flex-col place-content-between">
        <div className="flex flex-row justify-between">
          <span className="font-extension-title text-2xl">CeeVi</span>
        </div>
        <div className="flex flex-col pb-12">
          <span className="text-3xl font-semibold font-extension-title">
            No User Detected
            {/* <span className="text-lg">{user.email}</span> */}
          </span>
          <span className="mt-2 text-xl font-medium font-extension-text">
            Log in to get started
          </span>
        </div>
  
        <button
          className=" bg-gradient-to-r from-vivid_violet to-electric_indigo text-white text-[16px] font-semibold font-extension-title rounded-[29px] w-full py-2 shadow-[0_4px_0_rgba(0,0,0,0.25)] place-self-end"
          onClick={loginUser}>
          Login
        </button>
      </div> );
}
 
export default NoUserComponent;