import "~style.css"

const HomePage = ({ user, navigateToJobInfo }) => {

  return (
    <div className="flex flex-col items-center justify-center w-[200px] h-fit p-4">
      <span>Welcome, {user.email}</span>
      <button onClick={navigateToJobInfo}>Create a new resume</button>
    </div>
  )
}

export default HomePage
