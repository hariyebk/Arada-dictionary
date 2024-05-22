import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='flex flex-1 items-center justify-center max-sm:mt-14 sm:mt-20 md:mt-28'>
            <div className='flex flex-col justify-start'>
                <p className='max-sm:text-base sm:text-lg md:text-2xl text-black font-palanquin flex flex-wrap leading-6'> Could not find the requested resource 😔 </p>
                <Link href="/" className='mt-5 max-sm:text-sm sm:text-base text-blue-600 font-semibold'>Return Home</Link>
            </div>
        </div>
    )
}