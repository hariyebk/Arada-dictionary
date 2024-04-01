import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoFlagOutline } from "react-icons/io5";

interface CardInterface {
    title: string,
    definition: string,
    example: string,
    created_at: string,
    postedBy: string,
    spokenArea: string,
    like: number,
    dislike: number
}

export default function Card() {
    return (
        <section className="ml-16">
            <div className="bg-secondary mx-auto border rounded-md w-[550px] h-auto py-16 px-14">
                <h4 className="text-2xl text-main font-bold uppercase"> eskrpap </h4>
                <p className="mt-10 text-base text-black font-palanquin font-medium tracking-wide"> 
                When actors engage in a romance for the run of a show.
                Once the run is over so is the romance.
                The term originated in the theater and moved to movies and scripted television and then reality television.
                The term has now moved to the populace to discribe any contrived romance.
                </p>
                <p className="mt-5 text-base text-black font-palanquin font-medium tracking-wide"> Dude 1: I didn't know Anthony and Cicely were datingerm has now moved to the populace to discribe. </p>
                <p className="mt-4 text-base text-black tracking-wide font-medium font-palanquin"> by <span className="text-main font-bold"> Apush hater 123, </span> October 29, 2021 </p>
                <div className="w-full mt-14 flex items-center justify-between">
                <div className="flex items-center">
                    <button className="flex items-center gap-2 border border-r-0 border-gray-800 px-5 py-2 rounded-l-full hover:bg-primary hover:text-white hover:border-0.5 hover:border-r-0">
                        <AiOutlineLike className="w-5 h-5" />
                        <span> 1524 </span>
                    </button>
                    <button className="flex items-center gap-2 border border-l-0.5 border-gray-800 px-5 py-2 rounded-r-full hover:bg-primary hover:text-white hover:border-0.5">
                        <AiOutlineDislike className="w-5 h-5" />
                        <span> 10 </span>
                    </button>
                </div>
                <div>
                    <button className="flex items-center gap-2 rounded-full px-5 py-2 border border-gray-800 hover:bg-primary hover:text-white">
                        <IoFlagOutline className="w-5 h-5" />
                        <span> flag </span>
                    </button> 
                </div>
                </div>
            </div>
        </section>
    )
}
