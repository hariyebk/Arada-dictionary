"use client"

import { HiMagnifyingGlass } from "react-icons/hi2";
import { CheckIfAuthorized, revalidateTheHomePage} from "@/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AUTH_STATUS, QUERY_PARAMS } from "@/constants";
import { BsFunnelFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import SidebarFilter from "./SidebarFilter";

export default function SearchHeader() {
    const [value, setValue] = useState("")
    const [openMiniFilter, setOpenMiniFilter] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {replace, push} = useRouter()
    const queryString = searchParams.get(QUERY_PARAMS.search)

    useEffect(() => {
        if(queryString && !value){
            replace(`${pathname}`)
        }
    }, [value])

    function handleAuthorization(){
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
    function handleSearch(){
        if(!/[^a-zA-Z0-9]/.test(value)){
            return toast.error("search using amharic letters")
        }
        const param = new URLSearchParams(searchParams)
        if(value){
            param.set(QUERY_PARAMS.search, value)
            revalidateTheHomePage().then((message) => {
                if(message?.error){
                    return toast.error(message.error)
                }
            })
        }
        else{
            param.delete(QUERY_PARAMS.search)
        }
         // Adding the query to the url
        replace(`${pathname}?${param.toString()}`)
    }

    return (
        <section className='mt-10 flex flex-wrap justify-center'>
            <div className="flex items-center max-sm:gap-8 gap-10 md:ml-12 xl:ml-64">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if(!/[^a-zA-Z0-9]/.test(value)){
                        return toast.error("search using amharic letters")
                    }
                    handleSearch()
                }
                } className="flex items-center justify-between bg-inherit border border-gray-400 rounded-md lg:w-[570px] max-sm:w-[250px] md:w-[480px] pr-6">
                    <input type="text" placeholder='Search for words' onChange={(e) => setValue(e.target.value)} defaultValue={value} className='w-full h-full mr-10 px-4 py-4 bg-inherit max-md:text-base focus-visible:outline-none font-palanquin' />
                    <button type="button" onClick={() => handleSearch()}>
                        <HiMagnifyingGlass className="w-7 h-7 max-md:w-5 max-md:h-5" />
                    </button>
                </form>
                <button onClick={() => setOpenMiniFilter(true)}>
                    <BsFunnelFill className="text-primary w-8 h-9 max-sm:w-6 max-sm:h-6 xl:hidden" />
                </button>
                <button typeof="submit" onClick={handleAuthorization} className="mt-2 max-xl:hidden ml-20 px-5 py-4 rounded-md bg-primary text-white text-base font-bold font-palanquin"> Define a word </button>
                {openMiniFilter && <SidebarFilter setOpenMiniFilter={setOpenMiniFilter} />}
            </div>
        </section>
    )
}
