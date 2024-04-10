"use client"

import Filters from "./Filters";
import { IoIosCloseCircle } from "react-icons/io";

interface SidebarFiltersProbs {
    setOpenMiniFilter: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SidebarFilter({setOpenMiniFilter}: SidebarFiltersProbs) {
    return (
        <section className="bg-background absolute inset-y-0 right-0 py-16 w-[300px] h-full flex flex-col items-center">
            <button onClick={() => setOpenMiniFilter(false)} className="w-full flex justify-end mr-24">
                <IoIosCloseCircle className="w-8 h-8 text-primary" />
            </button>
            <div className="pr-8 pl-3 mt-10">
                <Filters showFilter={true} setOpenMiniFilter={setOpenMiniFilter} />
            </div>
        </section>
    )
}
