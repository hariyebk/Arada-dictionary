"use client"

import Image from "next/image"
import { useState } from "react"
import Logo from "/public/logo.png"
import Link from "next/link"
import SidebarMenu from "./SidebarMenu"
import { IoMenu } from "react-icons/io5"


export default function NavLeft() {

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <section>
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
            {openMenu && <SidebarMenu setOpenMenu={setOpenMenu} />}
        </section>
    )
}
