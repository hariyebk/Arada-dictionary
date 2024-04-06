import Image from "next/image";
import Link from "next/link";
import Logo from "/public/logo.png"
import { BsGithub } from "react-icons/bs";
import { auth } from "../../auth";
import avatar from "/public/avatar.png"


export default async function Navbar() {

    const session = await auth()

    return (
        <nav className="w-full mb-20 px-28 border-[1px] bg-transparent border-b-gray-600 border-opacity-35" >
            <ul className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image src={Logo} priority={true} alt="logo" className="object-contain" />
                    <Link href="/">
                        <h2 className="text-xl text-black font-palanquin"> Arada Dictionary </h2>
                    </Link>
                </div>
                <div className="flex items-center gap-10 text-lg text-black font-palanquin">
                    <Link href="/about"> About us </Link>
                    <Link href="/rules"> Rules </Link>
                    <Link href="https://github.com/hariyebk/Arada-dictionary">
                        <BsGithub className="w-7 h-7 text-main mb-1" />
                    </Link>
                    {session?.user ? <div>
                        <Image src={session.user.image ? session.user.image : avatar} alt="user-avatar" className="w-10 h-10 pb-1 rounded-full object-contain" />
                    </div> : 
                    <Link href="/signin" className="bg-primary px-4 py-2 rounded-md text-white text-base font-bold font-palanquin"> Sign in </Link>
                    }
                </div>
            </ul>
        </nav>
    )
}
