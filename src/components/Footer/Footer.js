export default function Footer() {

    return(
        <>
        
<footer className="rounded-lg shadow m-4 dark:bg-gray-800" id="footer">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">MovieMaven</a>. Made with  ☕ And ❤️ By The MovieMaven team
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <p href="#" className="mr-4 hover:underline md:mr-6 ">About</p>
        </li>
        <li>
            <p href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</p>
        </li>
        <li>
            <p href="#" className="mr-4 hover:underline md:mr-6">Licensing</p>
        </li>
        <li>
            <p href="#" className="hover:underline">Contact</p>
        </li>
    </ul>
    </div>
</footer>

        </>
    )
}