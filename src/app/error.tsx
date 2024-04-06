"use client"

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function error({error}: ErrorProps) {
    return (
        <section className="flex flex-1 items-center justify-center bg-background">
            <p className="text-lg text-black font-palanquin"> {error.message} </p>
        </section>
    )
}
