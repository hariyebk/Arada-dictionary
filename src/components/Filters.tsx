"use client"

import { QUERY_PARAMS, cities } from "@/constants";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { revalidateTheHomePage } from "@/actions";

interface FilterPros {
    showFilter?: boolean
    setOpenMiniFilter?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Filters({showFilter, setOpenMiniFilter}: FilterPros) {

    const [hide, setHide] = useState(false)
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()
    const searchString = searchParams.get(QUERY_PARAMS.city)?.replace("_", " ") || ""
    function handleHide(){
        hide ? setHide(false) : setHide(true)
    }

    function handleFilter(query: string){
        if(setOpenMiniFilter){
            setOpenMiniFilter(false)
        }
        const param = new URLSearchParams(searchParams)
        if(query && searchString !== query){
            param.set(QUERY_PARAMS.city, query.replace(/ /g, "_"))
            revalidateTheHomePage().then((message) => {
                if(message?.error){
                    return toast.error(message.error)
                }
            })
        }
        else if(searchString === query){
            param.delete(QUERY_PARAMS.city)
        }
        // Adding the query to the url
        replace(`${pathname}?${param.toString()}`)
    }

    return (
        <section className={`${showFilter ? "" : "max-xl:hidden"} ml-3 rounded-md px-10 pt-5`}>
            <h3 className="text-lg text-main font-palanquin"> Find Words by cities </h3>
            <hr className="my-3 border border-t-gray-600 opacity-45 w-[160px]" />
            <div className="mt-7">
                {cities.map((city, i) => {
                    return (
                        <div key={city} className={`${hide && i >= 5 && "hidden"} mt-2 flex items-center ${showFilter ? "gap-4" : "gap-2"}`}>
                            <Checkbox onClick={() => handleFilter(city)} checked={city === searchString} />
                            <p className="text-sm"> {city} </p>
                        </div>
                    )
                })}
                <button onClick={handleHide} className="mt-3 ml-5 text-sm text-main font-palanquin"> {hide ? "expand ..." : "see less ..."} </button>
            </div>
        </section>
    )
}
