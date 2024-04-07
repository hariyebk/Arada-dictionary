"use client"

import { DATABASE_CONNECTION_ERROR_MESSAGE } from "@/constants"

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function error({error}: ErrorProps){
    console.log(error)
    return (
        <section className="min-h-screen">
            <div className="flex flex-1 items-center justify-center bg-background">
                <p className="text-lg text-black font-palanquin"> {DATABASE_CONNECTION_ERROR_MESSAGE.includes(error.message) ? "Database connection has failed. since it's a hobby plan" : "Something went wrong 😣"} </p>
            </div>
        </section>
    )
}