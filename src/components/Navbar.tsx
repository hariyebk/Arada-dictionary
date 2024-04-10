"use client"

import Image from "next/image";
import Link from "next/link";
import Logo from "/public/logo.png"
import { IoMenu } from "react-icons/io5";
import { BsGithub } from "react-icons/bs";
import avatar from "/public/avatar.png"
import { useSession } from "next-auth/react";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";


export default function Navbar() {
    const [openMenu, setOpenMenu] = useState(false)
    const session = useSession()

    return (
        <nav className="mb-20 lg:px-20 max-lg:py-7 border-[1px] bg-transparent border-b-gray-600 border-opacity-35" >
            <ul className="flex items-center justify-between max-md:mr-10 max-md:ml-6 max-lg:mx-10">
                <div className="flex items-center gap-2">
                    <div className="max-lg:hidden">
                        <Image src={Logo} priority={true} alt="logo" className="object-contain" />
                    </div>
                    <button onClick={() => setOpenMenu(true)} className="md:hidden mr-3">
                        <IoMenu className="w-8 h-8 text-primary" />
                    </button>
                    <Link href="/">
                        <h2 className="text-xl max-md:text-lg text-black font-palanquin"> Arada Dictionary </h2>
                    </Link>
                </div>
                <div className="flex items-center gap-10 text-lg text-black font-palanquin">
                    <div className="max-md:hidden flex items-center gap-9 mr-5">
                        <Link href="/about"> About us </Link>
                        <Link href="/rules"> Rules </Link>
                        <Link href="https://github.com/hariyebk/Arada-dictionary">
                            <BsGithub className="w-7 h-7 text-main mb-1" />
                        </Link>
                    </div>
                    {session.data?.user ? <div>
                        <Image src={session.data.user.image ? session.data.user.image : avatar} alt="user-avatar"  width={35} height={35} className="mb-1 rounded-full object-contain" />
                    </div> : 
                    <Link href="/signin" className="bg-primary px-4 py-2 rounded-md text-white text-base font-bold font-palanquin"> Sign in </Link>
                    }
                    {openMenu && <SidebarMenu setOpenMenu={setOpenMenu} />}
                </div>
            </ul>
        </nav>
    )
}
