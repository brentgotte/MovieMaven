export default function Footer() {

    return(
        <>
        
<footer class="rounded-lg shadow m-4 dark:bg-gray-800" id="footer">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">MovieMaven</a>. Made with  ☕ And ❤️ By The MovieMaven team
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <p href="#" class="mr-4 hover:underline md:mr-6 ">About</p>
        </li>
        <li>
            <p href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</p>
        </li>
        <li>
            <p href="#" class="mr-4 hover:underline md:mr-6">Licensing</p>
        </li>
        <li>
            <p href="#" class="hover:underline">Contact</p>
        </li>
    </ul>
    </div>
</footer>

        </>
    )
}