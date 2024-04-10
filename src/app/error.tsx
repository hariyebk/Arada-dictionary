"use client"

import { DATABASE_CONNECTION_ERROR_MESSAGE } from "@/constants"

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function error({error}: ErrorProps){
    const isDatabaseError = DATABASE_CONNECTION_ERROR_MESSAGE.find((message) =>  error.message.startsWith(message))
    return (
        <section className="mt-48 min-h-screen">
            <div className="flex flex-1 items-center justify-center bg-background">
                <p className="text-xl text-black font-palanquin"> {isDatabaseError ? "Database connection lost. The server needs to be restarted" : "Something went wrong"} 😔 </p>
            </div>
        </section>
    )
}
