"use client"
import { useSearchParams } from "next/navigation"
import {BeatLoader} from "react-spinners"
import { CheckEmailVerification } from "@/actions"
import { useEffect} from "react"

export default function page(){
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    useEffect(() => {
        if(!token) return 
        CheckEmailVerification(token)
    }, [])
    return (
        <section className="min-h-screen">
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
                <p className="text-xl text-black font-palanquin"> wait a second, we are verfiying your email. </p>
                <BeatLoader className="mt-6 text-emerald-500" />
            </div>
        </section>
    )
}
