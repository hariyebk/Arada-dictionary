"use client"

import { cities } from "@/constants";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

export default function Filters() {

    const [hide, setHide] = useState(false)
    const [clicked, setClicked] = useState(false)

    function handleHide(){
        setClicked(true)
        hide ? setHide(false) : setHide(true)
    }

    return (
        <section className="ml-3 rounded-md px-10 pt-10">
            <h3 className="text-lg text-main font-palanquin"> Find Words by cities </h3>
            <hr className="my-3 border border-t-gray-600 opacity-45 w-[160px]" />
            <div className="mt-7">
                {cities.map((city, i) => {
                    if(i >= 5 && !hide && !clicked){
                        setHide(true)
                    }
                    return (
                        <div key={city} className={`${hide && i >= 5 && "hidden"} mt-2 flex items-center gap-2`}>
                            <Checkbox />
                            <p className="text-sm"> {city} </p>
                        </div>
                    )
                })}
                <button onClick={handleHide} className="mt-3 ml-5 text-sm text-main font-palanquin"> {hide ? "expand ..." : "see less ..."} </button>

            </div>
        </section>
    )
}
