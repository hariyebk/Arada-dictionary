import Link from "next/link";
import { BsGithub } from "react-icons/bs";


export default function Navbar() {
    return (
        <nav className="w-full mb-20 py-10 px-28 border-[1px] bg-transparent border-b-gray-600 border-opacity-35" >
            <ul className="flex items-center justify-between">
                <div className="">
                    <Link href="/">
                        <h2 className="text-xl text-black font-palanquin"> Arada Dictionary </h2>
                    </Link>
                </div>
                <div className="flex items-center gap-10 text-lg text-black font-palanquin">
                    <Link href="/about"> About us </Link>
                    <Link href="/rules"> Rules </Link>
                    <Link href="/rules"> Advertize </Link>
                    <Link href="https://github.com/hariyebk/Arada-dictionary">
                        <BsGithub className="w-7 h-7 text-main mb-1" />
                    </Link>
                </div>
            </ul>
        </nav>
    )
}
