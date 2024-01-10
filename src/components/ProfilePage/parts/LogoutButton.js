import Cookie from "js-cookie";
import Link from "next/link";
export const LogoutButton = () => {

    const Logout = () => {
        Cookie.remove('email');
        Cookie.remove('username');
        window.location.reload();
        window.location.href = "/";
        
      }

    return(
        <> 
                    <div className=" mt-4">
                    <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={Logout}>Logout</button>
                    </div>
        </>
    )
}
export default LogoutButton;