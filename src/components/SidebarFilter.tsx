"use client"

import Filters from "./Filters";
import { IoIosCloseCircle } from "react-icons/io";

interface SidebarFiltersProbs {
    setOpenMiniFilter: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SidebarFilter({setOpenMiniFilter}: SidebarFiltersProbs) {
    return (
        <section className="bg-background fixed inset-y-0 right-0 max-sm:py-8 py-16 w-[300px] max-sm:w-[250px] min-h-screen flex flex-col items-center overflow-y-scroll z-10">
            <button onClick={() => setOpenMiniFilter(false)} className="w-full flex justify-end max-sm:mr-10 mr-24">
                <IoIosCloseCircle className="w-8 h-8 text-primary" />
            </button>
            <div className="pr-8 pl-3 mt-6">
                <Filters showFilter={true} setOpenMiniFilter={setOpenMiniFilter} />
            </div>
        </section>
    )
}
