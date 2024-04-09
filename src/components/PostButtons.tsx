"use client"

import { LikeDislike } from "@/actions";
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
    post: Post
}
export default function PostButtons({post}: PostButtonsProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState("")
    const session = useSession()
    const router = useRouter()

    function handleclick(type: string){
        if(!session.data){
            return router.push("/signin")
        }   
        setIsLoading(true)
        setType(type)
        LikeDislike({type, postId: post.id}).then((data) => {
            if(data.error){
                return toast.error(data.error)
            }
        }).finally(() => {
            setIsLoading(false)
        })
    }
    
    return (
        <div className="w-full mt-10 flex items-center justify-between">
            <div className="flex items-center">
                <button onClick={() => handleclick(LIKE_DISLIKE.like)} disabled={isLoading} className={`${ session.data?.user ? post.like.includes(session.data.user.id) ? "bg-primary text-white" : "hover:bg-primary hover:text-white" : "hover:bg-primary hover:text-white"} w-20 flex items-center gap-2 border border-r-0 border-gray-800 disabled:cursor-not-allowed px-5 py-2 rounded-l-full hover:border-0.5 hover:border-r-0 focus-visible:outline-none`}>
                    {isLoading && type === LIKE_DISLIKE.like ? (
                        <div>
                            <ClipLoader
                                color="#ffffff"
                                loading={true}
                                size={14}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                                className="flex items-center justify-center ml-3"
                            />
                        </div>
                    ) :
                    <div className="flex items-center gap-2">
                        <AiOutlineLike className="w-5 h-5" />
                        <span> {post.like.length} </span>
                    </div>
                    }
                </button>
                <button onClick={() => handleclick(LIKE_DISLIKE.dislike)} disabled={isLoading} className={`${session.data?.user ? post.dislike.includes(session.data.user.id) ? "bg-primary text-white" : "hover:bg-primary hover:text-white" : "hover:bg-primary hover:text-white"} w-20 flex items-center gap-2 border border-l-0.5 border-gray-800 px-5 py-2 rounded-r-full disabled:cursor-not-allowed hover:border-0.5 focus-visible:outline-none`}>
                    {isLoading && type === LIKE_DISLIKE.dislike ? (
                        <div>
                            <ClipLoader
                                color="#ffffff"
                                loading={true}
                                size={14}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                                className="flex items-center justify-center ml-3"
                            />
                        </div>
                    ): <div className="flex items-center gap-2">
                        <AiOutlineDislike className="w-5 h-5" />
                        <span> {post.dislike.length} </span>
                    </div>
                    }
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
