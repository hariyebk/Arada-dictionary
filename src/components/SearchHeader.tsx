import { HiMagnifyingGlass } from "react-icons/hi2";
import { CheckIfAuthorized } from "@/actions";

export default async function SearchHeader() {
    return (
        <section className='mt-20 flex flex-1 justify-center'>
            <div className="flex items-center ml-32">
                <form className="flex items-center justify-between bg-inherit border border-gray-400 rounded-md w-[650px] pr-6">
                    <input type="text" placeholder='Search for words' className='w-full h-full mr-10 px-4 py-4 bg-inherit focus-visible:outline-none font-palanquin' />
                    <button>
                        <HiMagnifyingGlass className="w-7 h-7" />
                    </button>
                </form>
                <form action={CheckIfAuthorized} className="ml-20">
                    <button typeof="submit" type="submit" className="mt-2 px-5 py-4 rounded-md bg-primary text-teritiary text-base font-bold font-palanquin"> Define a word </button>
                </form>
            </div>
        </section>
    )
}
