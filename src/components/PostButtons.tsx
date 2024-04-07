import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoFlagOutline } from "react-icons/io5";

interface PostButtonsProps {
    like: number,
    dislike: number
}
export default async function PostButtons({like, dislike}: PostButtonsProps) {
    return (
        <div className="w-full mt-10 flex items-center justify-between">
            <div className="flex items-center">
                <button className="flex items-center gap-2 border border-r-0 border-gray-800 px-5 py-2 rounded-l-full hover:bg-primary hover:text-white hover:border-0.5 hover:border-r-0">
                    <AiOutlineLike className="w-5 h-5" />
                    <span> {like} </span>
                </button>
                <button className="flex items-center gap-2 border border-l-0.5 border-gray-800 px-5 py-2 rounded-r-full hover:bg-primary hover:text-white hover:border-0.5">
                    <AiOutlineDislike className="w-5 h-5" />
                    <span> {dislike} </span>
                </button>
            </div>
            <div>
                <button className="flex items-center gap-2 rounded-full px-5 py-2 border border-gray-800 hover:bg-primary hover:text-white">
                    <IoFlagOutline className="w-5 h-5" />
                    <span> flag </span>
                </button> 
            </div>
        </div>
    )
}
