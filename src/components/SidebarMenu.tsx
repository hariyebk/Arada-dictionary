"use client"

import { CheckIfAuthorized } from "@/actions";
import { AUTH_STATUS, MobileNav, PROTECTED_ROUTE } from "@/constants";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoIosCloseCircle } from "react-icons/io";

interface SidebarMenuProps {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SidebarMenu({setOpenMenu}: SidebarMenuProps) {

    const {push} = useRouter()

    function handleNavigation(href: string){
        setOpenMenu(false)
        if(href === PROTECTED_ROUTE){
            CheckIfAuthorized().then((result) => {
                if(result.error){
                    return toast.error(result.error)
                }
                if(result.status === AUTH_STATUS.unAuthenticated){
                    push("/signin")
                }
                else{
                    push("/define")
                }
            })
        }
        push(href)
    }

    return (
        <section className="md:hidden bg-background fixed inset-y-0 left-0 py-16 w-[200px] max-sm:w-[180px] min-h-screen flex flex-col items-center ">
            <button onClick={() => setOpenMenu(false)} className="w-full flex justify-start ml-10">
                <IoIosCloseCircle className="w-8 h-8 text-primary" />
            </button>
            <div className="mt-10 mr-3 flex flex-col items-start gap-5">
                {MobileNav.map((route) => {
                    return (
                        <button key={route.href} onClick={() => handleNavigation(route.href)} className="text-lg text-black font-palanquin"> {route.label} </button>
                    )
                })}
            </div>
        </section>
    )
}
