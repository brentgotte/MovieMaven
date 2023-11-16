import Cookie from "js-cookie";
import Link from "next/link";
export const LogoutButton = () => {

    const Logout = () => {
        Cookie.remove('email');
        Cookie.remove('username');
        window.location.reload();
        
      }

    return(
        <>  
                <Link href="/">
                    <div className="">
                    <button onClick={Logout} className="ml-2 w-32 bg-red-600 text-gray-900 hover:text-white border hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 border-b-4 border-red-900">Log out</button>
                    </div>
                    </Link>
        </>
    )
}
export default LogoutButton;