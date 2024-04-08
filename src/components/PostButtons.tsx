"use client"

import { LikePost } from "@/actions";
import { LIKE_DISLIKE } from "@/constants";
import { Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoFlagOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

interface PostButtonsProps {
    likeCount: number,
    dislikeCount: number,
    post: Post

}
export default function PostButtons({likeCount, dislikeCount, post}: PostButtonsProps) {
    console.log(likeCount)
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()
    const router = useRouter()

    function handleclick(type: string){
        if(!session.data){
            return router.push("/signin")
        }   
        if(type === LIKE_DISLIKE.like){
            console.log(session.data?.user?.id)
            setIsLoading(true)
            LikePost(post.id).then((message) => {
                if(message.error){
                    console.log(message.error)
                    return toast.error(message.error)
                }
            }).finally(() => {
                setIsLoading(false)
            })
        }
        else{
            // TODO: Add the current user's id to list list
        }
    }
    
    return (
        <div className="w-full mt-10 flex items-center justify-between">
            <div className="flex items-center">
                <button onClick={() => handleclick(LIKE_DISLIKE.like)} className={`${likeCount !== 0 ? "bg-primary text-white" : "hover:bg-primary hover:text-white"} flex items-center gap-2 border border-r-0 border-gray-800 px-5 py-2 rounded-l-full hover:border-0.5 hover:border-r-0`}>
                    {isLoading ? (
                        <div>
                            <ClipLoader
                                color="#000000"
                                loading={true}
                                size={14}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />

                        </div>
                    ) :
                    <div className="flex items-center gap-2">
                        <AiOutlineLike className="w-5 h-5" />
                        <span> {likeCount} </span>
                    </div>}
                </button>
                <button onClick={() => handleclick(LIKE_DISLIKE.dislike)} className="flex items-center gap-2 border border-l-0.5 border-gray-800 px-5 py-2 rounded-r-full hover:bg-primary hover:text-white hover:border-0.5">
                    <AiOutlineDislike className="w-5 h-5" />
                    <span> {dislikeCount} </span>
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
