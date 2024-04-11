import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import avatar from "/public/avatar.png"
import NavLeft from "./NavLeft";
import { auth } from "../../auth";


export default async function Navbar() {
    
    const session = await auth()

    return (
        <nav className="mb-20 lg:px-20 max-lg:py-7 border-[1px] bg-transparent border-b-gray-600 border-opacity-35" >
            <ul className="flex items-center justify-between max-md:mr-10 max-md:ml-6 max-lg:mx-10">
                <NavLeft />
                <div className="flex items-center gap-10 text-lg text-black font-palanquin">
                    <div className="max-md:hidden flex items-center gap-9 mr-5">
                        <Link href="/about"> About us </Link>
                        <Link href="/rules"> Rules </Link>
                        <Link href="https://github.com/hariyebk/Arada-dictionary">
                            <BsGithub className="w-7 h-7 text-main mb-1" />
                        </Link>
                    </div>
                    {session?.user ? <div>
                        <Image src={session.user.image ? session.user.image : avatar} alt="user-avatar"  width={35} height={35} className="mb-1 rounded-full object-contain" />
                    </div> : 
                    <Link href="/signin" className="bg-primary px-4 py-2 rounded-md text-white text-base font-bold font-palanquin"> Sign in </Link>
                    }
                </div>
            </ul>
        </nav>
    )
}
