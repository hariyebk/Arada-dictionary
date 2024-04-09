import { Post } from "@prisma/client";
import PostButtons from "./PostButtons";
import {AMAHRIC_FONT} from "@/utils/font"
interface CardProps {
    post: Post
}

export default async function Card({post}: CardProps) {

    return (
        <section className="ml-16">
            <div className="bg-secondary mx-auto border rounded-md w-[550px] h-auto p-10">
                <h4 className={`text-2xl text-main font-bold ${AMAHRIC_FONT.className} uppercase`}> {post.word} </h4>
                <p className={`mt-5 text-base text-black ${AMAHRIC_FONT.className} tracking-wide`}> 
                {post.definition}
                </p>
                <div className="pt-5">
                    {post.examples.map((example) => {
                        return (
                            <div key={example}>
                                <p className={`mt-5 text-base text-black ${AMAHRIC_FONT.className} tracking-wide`}> 
                                    {example}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <p className={`mt-7 text-base text-black tracking-wide font-medium ${AMAHRIC_FONT.className}`}>
                    by
                    <span className="text-main font-bold"> @{post.posterUsername}, </span> &nbsp;  
                    {post.created_at.toLocaleDateString('en-US', { month: "long", day: "numeric", year: "numeric"})} 
                </p>
                <PostButtons post={post} />
            </div>
        </section>
    )
}
