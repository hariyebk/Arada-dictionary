import { Post } from "@prisma/client";
import PostButtons from "./PostButtons";

interface CardProps {
    post: Post
}

export default async function Card({post}: CardProps) {
    return (
        <section className="ml-16 mt-10">
            <div className="bg-secondary mx-auto border rounded-md w-[550px] h-auto p-10">
                <h4 className="text-2xl text-main font-bold uppercase"> {post.word} </h4>
                <p className="mt-5 text-base text-black font-montserrat tracking-wide"> 
                {post.definition}
                </p>
                <div className="pt-5">
                    {post.examples.map((example) => {
                        return (
                            <div key={example}>
                                <p className="mt-5 text-base text-black font-montserrat tracking-wide"> 
                                    {example}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <p className="mt-5 text-base text-black tracking-wide font-medium font-palanquin">
                    by
                    <span className="text-main font-bold"> @{post.posterUsername}, </span> &nbsp;  
                    {post.created_at.toLocaleDateString('en-US', { month: "long", day: "numeric", year: "numeric"})} 
                </p>
                <PostButtons />
            </div>
        </section>
    )
}
