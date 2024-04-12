"use client"

import { PAGE_NUMBERS, PAGE_SIZE, QUERY_PARAMS } from "@/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface PaginationProps {
    totalResults: number
}

export default function Pagination({totalResults}: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {replace} = useRouter()
    const currentPage = Number(searchParams.get('page')) || 1;
    const pageNumbers = Math.ceil(totalResults / PAGE_SIZE)

    const createPageURL = (pageNumber: Number) => {
        const param = new URLSearchParams(searchParams);
        param.set(QUERY_PARAMS.page, pageNumber.toString());
        replace(`${pathname}?${param.toString()}`)
    };

    return (
        <section className="w-full  flex items-center justify-center md:ml-5">
            <div className="mt-16 flex items-center justify-center gap-6">
                {pageNumbers === 1 ? null : Array.from({length: pageNumbers}, (_, index) => index + 1).map((pageNum) => {
                    return (
                    <div key={pageNum}>
                        <button onClick={() => createPageURL(pageNum)} className={`${currentPage === pageNum ? "bg-primary text-white" : "hover:bg-primary bg-white hover:text-white"} pagination`}>
                            <span> {pageNum} </span>
                        </button>
                    </div>
                    )
                })}
            </div>
        </section>
    )
}
