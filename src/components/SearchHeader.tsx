import { HiMagnifyingGlass } from "react-icons/hi2";

export default function SearchHeader() {
    return (
        <section className='mt-20 flex flex-1 justify-center'>
            <form className="flex items-center justify-between bg-inherit border border-gray-400 rounded-md w-[500px] pr-6">
                <input type="text" placeholder='Search for words' className='w-full h-full mr-10 px-4 py-4 bg-inherit focus-visible:outline-none font-palanquin' />
                <button>
                    <HiMagnifyingGlass className="w-7 h-7" />
                </button>
            </form>
        </section>
    )
}
