"use client"

import { HiMagnifyingGlass } from "react-icons/hi2";
import { CheckIfAuthorized } from "@/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AUTH_STATUS, QUERY_PARAMS } from "@/constants";
import { useEffect, useState } from "react";

export default function SearchHeader() {
    const [value, setValue] = useState("")
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
        const param = new URLSearchParams(searchParams)
        if(value){
            param.set(QUERY_PARAMS.search, value)
        }
        else{
            param.delete(QUERY_PARAMS.search)
        }
         // Adding the query to the url
        replace(`${pathname}?${param.toString()}`)
    }

    return (
        <section className='mt-20 flex flex-1 justify-center'>
            <div className="flex items-center ml-32">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    if(!/[^a-zA-Z0-9]/.test(value)){
                        return toast.error("search using amharic letters")
                    }
                    handleSearch()
                }
                } className="flex items-center justify-between bg-inherit border border-gray-400 rounded-md w-[650px] pr-6">
                    <input type="text" placeholder='Search for words' onChange={(e) => setValue(e.target.value)} defaultValue={value} className='w-full h-full mr-10 px-4 py-4 bg-inherit focus-visible:outline-none font-palanquin' />
                    <button type="button" onClick={() => handleSearch()}>
                        <HiMagnifyingGlass className="w-7 h-7" />
                    </button>
                </form>
                <button typeof="submit" onClick={handleAuthorization} className="mt-2 ml-20 px-5 py-4 rounded-md bg-primary text-white text-base font-bold font-palanquin"> Define a word </button>
            </div>
        </section>
    )
}
